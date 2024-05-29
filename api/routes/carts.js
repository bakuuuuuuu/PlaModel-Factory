import express from 'express';
import {
    createCartIfNotExists ,
    deleteCartById,
    getCarts,
    addToCart,
    getCartByUserId,
    removeFromCart 
} from "../controllers/cart.js";
import { verifyAdmin, verifyToken, verifyUser, verifyTokenForCart, verifyUserForCart } from "../utils/verifyToken.js";

const router = express.Router();

// 장바구니 생성
router.post('/createCart', verifyTokenForCart, createCartIfNotExists, (req, res) => {
    res.status(200).json("Cart created successfully if not exists");
});

// 장바구니 삭제 (사용자가 회원 탈퇴를 할 때 장바구니도 같이 삭제)
router.delete("/:id", deleteCartById);

// 전체 조회
router.get("/", verifyAdmin, getCarts);

// 장바구니에 상품 추가 라우트
router.post('/add', verifyTokenForCart, addToCart);

// 로그인한 사용자의 장바구니 가져오기 라우트
router.get('/:userId', verifyTokenForCart, getCartByUserId);

// 장바구니에서 특정 상품 삭제 라우트
router.post('/remove', verifyTokenForCart, removeFromCart);

export default router;