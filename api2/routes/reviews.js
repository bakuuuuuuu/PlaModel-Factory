import express from 'express';
import {
    createReview,
    updateReview,
    deleteReview,
    getReview,
    getAllReviews,
    getReviewsByProductId,
    getReviewsByUserIdWithProductNames
} from "../controllers/reviewController.js";

const router = express.Router();

// 리뷰 등록
router.post('/', createReview);

// 리뷰 수정
router.put('/:id', updateReview);

// 리뷰 삭제
router.delete('/:id', deleteReview);

// 특정 리뷰 조회
router.get('/:id', getReview);

// 모든 리뷰 조회
router.get('/', getAllReviews);

// 상품 ID로 리뷰 조회
router.get('/product/:product_id', getReviewsByProductId);

// 사용자 ID로 리뷰 조회 (제품 이름 포함)
router.get('/user/:user_id', getReviewsByUserIdWithProductNames);

export default router;
