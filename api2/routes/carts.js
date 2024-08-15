import express from 'express';
import {
    createCartIfNotExists,
    deleteCartById,
    getAllCarts,
    addToCart,
    getCartByUserId,
    removeFromCart
} from '../controllers/cartController.js';
import { verifyAdmin, verifyUserForCart } from '../utils/verifyToken.js';

const router = express.Router();

// 모든 장바구니 조회
router.get('/', verifyAdmin, getAllCarts);

// 로그인한 사용자의 장바구니 가져오기
router.get('/user', verifyUserForCart, getCartByUserId);

// 장바구니 생성 (존재하지 않을 경우)
router.post('/create', verifyUserForCart, createCartIfNotExists);

// 장바구니에 상품 추가
router.post('/add', verifyUserForCart, addToCart);

// 장바구니에서 특정 상품 삭제
router.post('/remove', verifyUserForCart, removeFromCart);

// 장바구니 삭제
router.delete('/:id', verifyAdmin, deleteCartById);

export default router;
