import express from 'express';
import { createOrder, getUserOrders, getAllOrders, deleteUserOrder, updateUserOrder  } from "../controllers/order.js";
import { verifyAdmin, verifyToken, verifyTokenForCart } from "../utils/verifyToken.js";

const router = express.Router();

// 주문 생성 및 업데이트
router.post('/', verifyTokenForCart, createOrder);

// 로그인한 사용자의 주문내역 조회
router.get('/user', verifyTokenForCart, getUserOrders);

// 전체 주문내역 조회 (관리자용)
router.get('/', verifyAdmin, getAllOrders);

// 특정 사용자의 주문 내역 삭제 (관리자용)
router.delete('/:userId/:orderId', verifyAdmin, deleteUserOrder);

// 특정 사용자의 주문 내역 수정 (관리자용)
router.put('/:userId/:orderId', verifyAdmin, updateUserOrder);

export default router;
