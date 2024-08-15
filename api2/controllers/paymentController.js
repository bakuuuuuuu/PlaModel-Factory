import pool from '../db.js';

// 로그인한 사용자의 결제 내역 조회
export const getUserPayments = async (req, res, next) => {
    try {
        const userId = req.user.id;

        // 사용자의 결제 내역을 가져옴
        const [payments] = await pool.query('SELECT * FROM payments WHERE user_id = ?', [userId]);
        if (payments.length === 0) {
            return res.status(404).json({ error: "결제 내역이 없습니다." });
        }

        res.status(200).json(payments);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// 결제 완료
export const completePayment = async (req, res, next) => {
    try {
        const { paymentId } = req.params;
        const userId = req.user.id;

        // 해당 결제가 사용자의 결제인지 확인
        const [paymentRows] = await pool.query('SELECT * FROM payments WHERE id = ? AND user_id = ?', [paymentId, userId]);
        if (paymentRows.length === 0) {
            return res.status(404).json({ error: "결제를 찾을 수 없습니다." });
        }

        // 결제 상태를 "결제 완료"로 업데이트
        await pool.query('UPDATE payments SET status = ? WHERE id = ?', ['결제 완료', paymentId]);

        // 주문 상태를 "주문 완료"로 업데이트
        await pool.query('UPDATE orders SET status = ? WHERE id = ?', ['주문 완료', paymentRows[0].order_id]);

        res.status(200).json({ message: "결제가 완료되었습니다." });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};