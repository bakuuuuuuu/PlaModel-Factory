import pool from '../db.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// ES 모듈에서 __filename과 __dirname을 사용하는 방법
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 모든 사용자의 정보를 가져오는 미들웨어
export const getAllUsers = async (req, res, next) => {
    try {
        const [rows] = await pool.query(`SELECT * FROM users`);
        res.status(200).json(rows);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


// 특정 사용자의 정보를 가져오는 미들웨어
export const getUser = async (req, res, next) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query(`SELECT * FROM users WHERE id = ?`, [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(rows[0]);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// 사용자 정보를 업데이트하는 미들웨어
export const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        // 동적으로 업데이트 쿼리 생성
        const fields = Object.keys(updates).map(field => `${field} = ?`).join(', ');
        const values = Object.values(updates);

        const [result] = await pool.query(`UPDATE users SET ${fields} WHERE id = ?`, [...values, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        // 업데이트된 사용자 정보를 다시 조회
        const [rows] = await pool.query(`SELECT * FROM users WHERE id = ?`, [id]);
        res.status(200).json(rows[0]);
    } catch (err) {
        next(err);
    }
};

// 회원 정보 수정(이미지)
export const updateProfileImage = async (req, res, next) => {
    try {
        const { id } = req.params;
        const imgPath = req.file.path.replace(/\\/g, "/");

        if (!id) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const [rows] = await pool.query(`SELECT * FROM users WHERE id = ?`, [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const user = rows[0];

        if (user.img) {
            const oldImage = path.join(__dirname, '../', user.img);
            if (fs.existsSync(oldImage)) {
                try {
                    fs.unlinkSync(oldImage);
                } catch {
                    return res.status(500).json({ message: "이미지 삭제 오류" });
                }
            }
        }

        await pool.query(`UPDATE users SET img = ? WHERE id = ?`, [`/uploads/${req.file.filename}`, id]);
        res.status(200).json({ message: "Profile image updated", user: { img: `uploads/${req.file.filename}` } });
    } catch (e) {
        next(e);
    }
};

// 사용자를 삭제하는 미들웨어
export const deleteUser = async (req, res, next) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query(`DELETE FROM users WHERE id = ?`, [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User has been deleted." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// 계정 찾기 미들웨어
export const getUserByDetails = async (req, res, next) => {
    try {
        const { username, phone, gender } = req.body;

        const [rows] = await pool.query(`SELECT * FROM users WHERE username = ? AND phone = ? AND gender = ?`, [username, phone, gender]);

        if (rows.length === 0) {
            return res.status(404).json({ message: "일치하는 사용자가 없습니다." });
        }

        const user = rows[0];
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '15m' });
        res.status(200).json({ email: user.email, token });
    } catch (err) {
        next(err);
    }
};


// 비밀번호 재설정 미들웨어
export const changePassword = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const token = req.headers.authorization.split(' ')[1];

        // 토큰 검증 및 사용자 ID 추출
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        // 이메일과 ID가 일치하는 사용자를 찾음
        const [rows] = await pool.query(`SELECT * FROM users WHERE id = ? AND email = ?`, [userId, email]);

        if (rows.length === 0) {
            return res.status(404).json({ message: "일치하는 사용자가 없습니다." });
        }

        // 비밀번호 해싱
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        // 사용자 정보 업데이트
        await pool.query(`UPDATE users SET password = ? WHERE id = ?`, [hashedPassword, userId]);

        res.status(200).send("비밀번호가 성공적으로 변경되었습니다.");
    } catch (err) {
        next(err);
    }
};
