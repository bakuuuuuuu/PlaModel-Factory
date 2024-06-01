import express from "express";
import {
    countByCategory,
    countByType,
    createProduct,
    deleteProduct,
    getProduct,
    getProducts,
    updateProduct,
    searchProducts
} from "../controllers/product.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE
router.post("/add", verifyAdmin, createProduct);

//UPDATE
router.put("/:id", verifyAdmin, updateProduct);

//DELETE
router.delete("/:id", verifyAdmin, deleteProduct);

//GET
router.get("/find/:id", getProduct);

//GET ALL
router.get("/", getProducts);
router.get("/countByCategory", countByCategory);
router.get("/countByType", countByType);

// SEARCH
router.get("/search", searchProducts);

export default router;