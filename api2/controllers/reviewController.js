import pool from '../db.js';

// 리뷰 등록
export const createReview = async (req, res, next) => {
    const { user_id, title, content, product_id, rating } = req.body;
    try {
        const [result] = await pool.query('INSERT INTO reviews (user_id, title, content, product_id, rating) VALUES (?, ?, ?, ?, ?)', [user_id, title, content, product_id, rating]);
        res.status(200).json({ id: result.insertId, user_id, title, content, product_id, rating });
    } catch (err) {
        next(err);
    }
};

// 리뷰 수정
export const updateReview = async (req, res, next) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        const fields = Object.keys(updates).map(field => `${field} = ?`).join(', ');
        const values = Object.values(updates);

        const [result] = await pool.query(`UPDATE reviews SET ${fields} WHERE id = ?`, [...values, id]);

        if (result.affectedRows > 0) {
            res.status(200).json({ id, ...updates });
        } else {
            res.status(404).json({ error: 'Review not found' });
        }
    } catch (err) {
        next(err);
    }
};

// 리뷰 삭제
export const deleteReview = async (req, res, next) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM reviews WHERE id = ?', [id]);

        if (result.affectedRows > 0) {
            res.status(200).json("Review has been deleted.");
        } else {
            res.status(404).json({ error: 'Review not found' });
        }
    } catch (err) {
        next(err);
    }
};

// 리뷰 조회
export const getReview = async (req, res, next) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM reviews WHERE id = ?', [id]);

        if (rows.length > 0) {
            res.status(200).json(rows[0]);
        } else {
            res.status(404).json({ error: 'Review not found' });
        }
    } catch (err) {
        next(err);
    }
};

// 전체 리뷰 조회
export const getAllReviews = async (req, res, next) => {
    try {
        const [rows] = await pool.query('SELECT * FROM reviews');
        res.status(200).json(rows);
    } catch (err) {
        next(err);
    }
};

// 상품 ID로 리뷰 조회
export const getReviewsByProductId = async (req, res, next) => {
    const { product_id } = req.params;
    try {
        const [rows] = await pool.query('SELECT r.*, u.username FROM reviews r JOIN users u ON r.user_id = u.id WHERE r.product_id = ?', [product_id]);
        res.status(200).json(rows);
    } catch (err) {
        next(err);
    }
};

// 사용자 ID로 리뷰 가져오기 (제품 이름 포함)
export const getReviewsByUserIdWithProductNames = async (req, res, next) => {
    const { user_id } = req.params;
    try {
        const [reviews] = await pool.query('SELECT * FROM reviews WHERE user_id = ?', [user_id]);

        if (reviews.length === 0) {
            return res.status(200).json([]);
        }

        const productIds = reviews.map(review => review.product_id);

        const [products] = await pool.query('SELECT id, productName FROM products WHERE id IN (?)', [productIds]);

        const productMap = products.reduce((acc, product) => {
            acc[product.id] = product.productName;
            return acc;
        }, {});

        const reviewsWithProductNames = reviews.map(review => ({
            ...review,
            productName: productMap[review.productid] || "Unknown Product"
        }));

        res.status(200).json(reviewsWithProductNames);
    } catch (err) {
        next(err);
    }
};
