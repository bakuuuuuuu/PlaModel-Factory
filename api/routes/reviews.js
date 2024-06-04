import express from "express";
import {
    createReview,
    deleteReview,
    getReview,
    getReviews,
    updateReview,
    getReviewsByProductId,
    getReviewsByUserIdWithProductNames,
} from "../controllers/review.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// 리뷰 등록
router.post("/create", createReview);

// 리뷰 수정(관리자용)
router.put("/:id", verifyAdmin, updateReview);

// 리뷰 삭제(관리자용)
router.delete("/:id", verifyAdmin, deleteReview);

// 리뷰 수정(사용자용)
router.put("/user/:id", updateReview);

// 리뷰 삭제(사용자용)
router.delete("/user/:id", deleteReview);

// 리뷰 조회
router.get("/:id", getReview);

// 전체 리뷰 조회
router.get("/", getReviews);

// 사용자 ID로 리뷰 가져오기 (제품 이름 포함)
router.get("/review/:productid", getReviewsByProductId);

// 상품 ID 로 리뷰 조회
router.get("/user/:userId", getReviewsByUserIdWithProductNames);

export default router;