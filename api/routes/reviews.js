import express from "express";
import {
    createReview,
    deleteReview,
    getReview,
    getReviews,
    updateReview,
    getReviewsByProductId
} from "../controllers/review.js";
import { checkReviewOwnership } from "../utils/verifyToken.js";

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

//GET Reviews BY Product ID (아직 안됌)
router.get("/review/:productid", getReviewsByProductId);

export default router;
