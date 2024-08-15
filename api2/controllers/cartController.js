import pool from '../db.js';
import { createError } from "../utils/error.js";

// 장바구니 생성 (존재하지 않을 경우)
export const createCartIfNotExists = async (req, res, next) => {
    try {
        const userId = req.user.id;

        // 해당 사용자의 장바구니가 이미 있는지 조회
        const [rows] = await pool.query('SELECT * FROM carts WHERE user_id = ?', [userId]);

        // 해당 사용자의 장바구니가 없을 경우
        if (rows.length === 0) {
            // 해당 사용자의 장바구니를 생성
            await pool.query('INSERT INTO carts (user_id) VALUES (?)', [userId]);
        }
        res.status(200).json(rows);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// 장바구니 삭제
export const deleteCartById = async (req, res, next) => {
    try {
        const cartId = req.params.id;

        const [cart] = await pool.query('SELECT * FROM carts WHERE id = ?', [cartId]);

        if (cart.length === 0) {
            return next(createError(404, "장바구니를 찾을 수 없습니다."));
        }

        await pool.query('DELETE FROM cart_items WHERE cart_id = ?', [cartId]);
        await pool.query('DELETE FROM carts WHERE id = ?', [cartId]);

        res.status(200).json("장바구니가 삭제되었습니다.");
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// 전체 장바구니 조회
export const getAllCarts = async (req, res, next) => {
    try {
        const [carts] = await pool.query('SELECT * FROM carts');
        res.status(200).json(carts);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// 장바구니에 상품 추가
export const addToCart = async (req, res, next) => {
    try {
        const { productId, quantity, price } = req.body;
        const userId = req.user.id;

        const [cartRows] = await pool.query('SELECT * FROM carts WHERE user_id = ?', [userId]);

        let cartId;
        if (cartRows.length === 0) {
            const [cartResult] = await pool.query('INSERT INTO carts (user_id) VALUES (?)', [userId]);
            cartId = cartResult.insertId;
        } else {
            cartId = cartRows[0].id;
        }

        const [productRows] = await pool.query('SELECT * FROM products WHERE id = ?', [productId]);

        if (productRows.length === 0) {
            return next(createError(404, "상품을 찾을 수 없습니다."));
        }

        const product = productRows[0];
        if (product.inventory < quantity) {
            return next(createError(400, "재고가 부족합니다."));
        }

        const [cartItemRows] = await pool.query('SELECT * FROM cart_items WHERE cart_id = ? AND product_id = ?', [cartId, productId]);

        if (cartItemRows.length > 0) {
            await pool.query('UPDATE cart_items SET quantity = quantity + ? WHERE cart_id = ? AND product_id = ?', [quantity, cartId, productId]);
        } else {
            await pool.query('INSERT INTO cart_items (cart_id, product_id, quantity, price) VALUES (?, ?, ?, ?)', [cartId, productId, quantity, price]);
        }

        await pool.query('UPDATE products SET inventory = inventory - ? WHERE id = ?', [quantity, productId]);

        const [updatedCartItems] = await pool.query('SELECT * FROM cart_items WHERE cart_id = ?', [cartId]);
        res.status(200).json(updatedCartItems);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// 로그인한 사용자의 장바구니를 가져옴
export const getCartByUserId = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const [cartRows] = await pool.query('SELECT * FROM carts WHERE user_id = ?', [userId]);

        if (cartRows.length === 0) {
            return next(createError(404, "장바구니를 찾을 수 없습니다."));
        }

        const cartId = cartRows[0].id;
        const [cartItems] = await pool.query('SELECT ci.*, p.productName FROM cart_items ci JOIN products p ON ci.product_id = p.id WHERE ci.cart_id = ?', [cartId]);

        res.status(200).json(cartItems);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// 장바구니에서 특정 상품 삭제
export const removeFromCart = async (req, res, next) => {
    try {
        const { productId } = req.body;
        const userId = req.user.id;

        const [cartRows] = await pool.query('SELECT * FROM carts WHERE user_id = ?', [userId]);

        if (cartRows.length === 0) {
            return next(createError(404, "장바구니를 찾을 수 없습니다."));
        }

        const cartId = cartRows[0].id;
        const [cartItemRows] = await pool.query('SELECT * FROM cart_items WHERE cart_id = ? AND product_id = ?', [cartId, productId]);

        if (cartItemRows.length === 0) {
            return next(createError(404, "장바구니에서 해당 상품을 찾을 수 없습니다."));
        }

        const productInCart = cartItemRows[0];

        await pool.query('DELETE FROM cart_items WHERE cart_id = ? AND product_id = ?', [cartId, productId]);
        await pool.query('UPDATE products SET inventory = inventory + ? WHERE id = ?', [productInCart.quantity, productId]);

        const [updatedCartItems] = await pool.query('SELECT * FROM cart_items WHERE cart_id = ?', [cartId]);
        res.status(200).json(updatedCartItems);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
