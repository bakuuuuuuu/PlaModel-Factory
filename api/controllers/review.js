import Review from "../models/Review.js";
import { createError } from "../utils/error.js";

//CREATE
export const createReview = async (req, res, next) => {
    const newReview = new Review(req.body);
    try {
        const savedReview = await newReview.save();
        res.status(200).json(savedReview);
    }
    catch (err) {
        next(err);
    }
};

//UPDATE
export const updateReview = async (req, res, next) => {
    try {
        const updatedReview = await Review.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedReview);
    }
    catch (err) {
        next(err);
    }
};

//DELETE
export const deleteReview = async (req, res, next) => {
    try {
        await Review.findByIdAndDelete(req.params.id);
        res.status(200).json("Review has been deleted.");
    }
    catch (err) {
        next(err);
    }
};

//GET
export const getReview = async (req, res, next) => {
    try {
        const review = await Review.findById(req.params.id);
        res.status(200).json(review);
    }
    catch (err) {
        next(err);
    }
};

//GET ALL
export const getReviews = async (req, res, next) => {
    try {
        const reviews = await Review.find();
        res.status(200).json(reviews);
    }
    catch (err) {
        next(err);
    }
};

//GET Reviews BY Product ID
export const getReviewsByProductId = async (req, res, next) => {
    const { productid } = req.params;
    console.log(productid);
    try {
        const reviews = await Review.find({ productid });
        res.status(200).json(reviews);
    } catch (err) {
        next(err);
    }
};

//GET Reviews BY Username
export const getReviewsByUsername = async (req, res, next) => {
    const { username } = req.params;
    try {
        const reviews = await Review.find({ username });
        res.status(200).json(reviews);
    } catch (err) {
        next(err);
    }
};
