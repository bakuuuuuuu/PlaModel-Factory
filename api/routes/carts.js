import express from "express";
import {
    createCart,
    updateCart,
    removeProductFromCart,
    deleteCart,
    getCart,
    getCarts
} from "../controllers/cart.js";
import { verifyAdmin, verifyToken, verifyUser, verifyTokenForCart, verifyUserForCart } from "../utils/verifyToken.js";

const router = express.Router();

// 장바구니 생성
router.post("/create", createCart);

// 장바구니 업데이트 (사용자가 새로운 상품을 더 담거나, 이미 장바구니에 담긴 상품을 추가로 담을 경우)
router.put("/:id", verifyUser, updateCart);

// 장바구니에서 특정 상품 삭제
router.delete("/product/:productId", verifyUserForCart, removeProductFromCart);

// 장바구니 삭제 (사용자가 회원 탈퇴를 할 때 장바구니도 같이 삭제)
router.delete("/:id", verifyUserForCart, deleteCart);

// 장바구니 조회(사용자가 자신의 장바구니를 확인할 때) 
router.get("/:id", verifyTokenForCart, getCart);

// 전체 장바구니 조회(관리자용)
router.get("/", verifyAdmin, getCarts);

export default router;