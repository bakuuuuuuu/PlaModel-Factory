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

//CREATE
router.post("/create", createReview);

//UPDATE(관리자용)
router.put("/:id", verifyAdmin, updateReview);

//DELETE(관리자용)
router.delete("/:id", verifyAdmin, deleteReview);

//UPDATE(사용자용)
router.put("/user/:id", updateReview);

//DELETE(사용자용)
router.delete("/user/:id", deleteReview);

//GET
router.get("/:id", getReview);

//GET ALL
router.get("/", getReviews);

//GET Reviews BY Product ID
router.get("/review/:productid", getReviewsByProductId);

// GET Reviews BY UserId
router.get("/user/:userId", getReviewsByUserIdWithProductNames);

export default router;