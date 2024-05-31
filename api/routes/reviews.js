import express from "express";
import {
    createReview,
    deleteReview,
    getReview,
    getReviews,
    updateReview,
    getReviewsByProductId,
    getReviewsByUserIdWithProductNames
} from "../controllers/review.js";
import { checkReviewOwnership, verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE
router.post("/create", createReview);

//UPDATE
router.put("/:id", checkReviewOwnership, updateReview);

//DELETE
router.delete("/:id", checkReviewOwnership, deleteReview);

//GET
router.get("/:id", getReview);

//GET ALL
router.get("/", getReviews);

//GET Reviews BY Product ID
router.get("/review/:productid", getReviewsByProductId);

// GET Reviews BY UserId
router.get("/user/:userId", getReviewsByUserIdWithProductNames);

export default router;