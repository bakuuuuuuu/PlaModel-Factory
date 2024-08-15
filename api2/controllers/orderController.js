import pool from '../db.js';

// 주문 생성 및 업데이트 (사용자가 장바구니에서 주문버튼을 눌렀을 때)
export const createOrder = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { methodId } = req.body;

        // 사용자의 장바구니를 가져옴
        const [cartRows] = await pool.query('SELECT * FROM carts WHERE user_id = ?', [userId]);
        if (cartRows.length === 0) {
            return res.status(400).json({ error: "장바구니가 비어있습니다." });
        }
        const cartId = cartRows[0].id;

        // 장바구니의 상품들을 가져옴
        const [cartItems] = await pool.query('SELECT * FROM cart_items WHERE cart_id = ?', [cartId]);
        if (cartItems.length === 0) {
            return res.status(400).json({ error: "장바구니가 비어있습니다." });
        }

        // 주문 총액 계산
        const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

        // 새 주문 생성
        const [orderResult] = await pool.query('INSERT INTO orders (user_id, total_amount, status) VALUES (?, ?, ?)', [userId, totalAmount, '주문 중']);
        const orderId = orderResult.insertId;

        // 주문 항목 생성
        const orderItemsPromises = cartItems.map(item => {
            return pool.query('INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)', [orderId, item.product_id, item.quantity, item.price]);
        });
        await Promise.all(orderItemsPromises);

        // 결제 정보 생성
        const [paymentResult] = await pool.query('INSERT INTO payments (order_id, user_id, amount, method_id, status) VALUES (?, ?, ?, ?, ?)', [orderId, userId, totalAmount, methodId, '결제 중']);
        const paymentId = paymentResult.insertId;

        // 장바구니 비우기
        await pool.query('DELETE FROM cart_items WHERE cart_id = ?', [cartId]);

        res.status(201).json({ orderId, totalAmount, status: '주문 중', paymentId, paymentStatus: '결제 중' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// 로그인한 사용자의 주문 내역 조회
export const getUserOrders = async (req, res, next) => {
    try {
        const userId = req.user.id;

        // 사용자의 주문 내역을 가져옴
        const [orders] = await pool.query('SELECT * FROM orders WHERE user_id = ?', [userId]);
        if (orders.length === 0) {
            return res.status(404).json({ error: "주문 내역이 없습니다." });
        }

        const orderIds = orders.map(order => order.id);
        const [orderItems] = await pool.query('SELECT * FROM order_items WHERE order_id IN (?)', [orderIds]);

        // 주문 내역과 주문 항목을 결합
        const ordersWithItems = orders.map(order => {
            return {
                ...order,
                items: orderItems.filter(item => item.order_id === order.id)
            };
        });

        res.status(200).json(ordersWithItems);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// 전체 주문 내역 조회 (관리자용)
export const getAllOrders = async (req, res, next) => {
    try {
        // 모든 주문 내역을 가져옴
        const [orders] = await pool.query('SELECT * FROM orders');
        if (orders.length === 0) {
            return res.status(404).json({ error: "주문 내역이 없습니다." });
        }

        const orderIds = orders.map(order => order.id);
        const [orderItems] = await pool.query('SELECT * FROM order_items WHERE order_id IN (?)', [orderIds]);

        // 주문 내역과 주문 항목을 결합
        const ordersWithItems = orders.map(order => {
            return {
                ...order,
                items: orderItems.filter(item => item.order_id === order.id)
            };
        });

        res.status(200).json(ordersWithItems);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// 특정 사용자의 주문 내역 삭제 (관리자용)
export const deleteUserOrder = async (req, res, next) => {
    try {
        const { userId, orderId } = req.params;

        // 사용자의 주문 내역을 가져옴
        const [orders] = await pool.query('SELECT * FROM orders WHERE user_id = ? AND id = ?', [userId, orderId]);
        if (orders.length === 0) {
            return res.status(404).json({ error: "사용자의 주문 내역을 찾을 수 없습니다." });
        }

        // 해당 주문 항목 삭제
        await pool.query('DELETE FROM order_items WHERE order_id = ?', [orderId]);

        // 해당 주문 내역 삭제
        await pool.query('DELETE FROM orders WHERE id = ?', [orderId]);

        res.status(200).json({ message: "주문 내역이 삭제되었습니다." });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// 특정 사용자의 주문 내역 수정 (관리자용)
export const updateUserOrder = async (req, res, next) => {
    try {
        const { userId, orderId } = req.params;
        const { status, products, totalAmount } = req.body;

        // 사용자의 주문 내역을 가져옴
        const [orders] = await pool.query('SELECT * FROM orders WHERE user_id = ? AND id = ?', [userId, orderId]);
        if (orders.length === 0) {
            return res.status(404).json({ error: "사용자의 주문 내역을 찾을 수 없습니다." });
        }

        // 주문 상태, 총액 업데이트
        if (status) {
            await pool.query('UPDATE orders SET status = ? WHERE id = ?', [status, orderId]);
        }
        if (totalAmount) {
            await pool.query('UPDATE orders SET total_amount = ? WHERE id = ?', [totalAmount, orderId]);
        }

        // 주문 항목 업데이트
        if (products) {
            await pool.query('DELETE FROM order_items WHERE order_id = ?', [orderId]);
            const orderItemsPromises = products.map(item => {
                return pool.query('INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)', [orderId, item.product_id, item.quantity, item.price]);
            });
            await Promise.all(orderItemsPromises);
        }

        const [updatedOrder] = await pool.query('SELECT * FROM orders WHERE id = ?', [orderId]);
        const [updatedOrderItems] = await pool.query('SELECT * FROM order_items WHERE order_id = ?', [orderId]);

        res.status(200).json({
            ...updatedOrder[0],
            items: updatedOrderItems
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// 주문 취소
export const cancelOrder = async (req, res, next) => {
    try {
        const { orderId } = req.params;
        const userId = req.user.id;

        // 사용자의 주문 내역을 가져옴
        const [orders] = await pool.query('SELECT * FROM orders WHERE id = ? AND user_id = ?', [orderId, userId]);
        if (orders.length === 0) {
            return res.status(404).json({ error: "주문을 찾을 수 없습니다." });
        }

        // 주문 상태를 '주문 취소'로 업데이트
        await pool.query('UPDATE orders SET status = ? WHERE id = ?', ['주문 취소', orderId]);

        res.status(200).json({ message: "주문이 취소되었습니다." });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};