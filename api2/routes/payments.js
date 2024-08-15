import express from 'express';
import { completePayment, getUserPayments } from "../controllers/paymentController.js";
import { verifyTokenForCart } from "../utils/verifyToken.js";

const router = express.Router();

// 로그인한 사용자의 주문 내역 조회
router.get('/user', verifyTokenForCart, getUserPayments);

// 결제 완료
router.post('/complete/:paymentId', verifyTokenForCart, completePayment);

export default router;
