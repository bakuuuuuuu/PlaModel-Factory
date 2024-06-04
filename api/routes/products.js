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

// 상품 등록
router.post("/add", verifyAdmin, createProduct);

// 상품 정보 수정
router.put("/:id", verifyAdmin, updateProduct);

// 상품 삭제
router.delete("/:id", verifyAdmin, deleteProduct);

// 상품 정보 조회
router.get("/find/:id", getProduct);

// 전체 상품 조회
router.get("/", getProducts);

// 카테고리별 상품 카운트
router.get("/countByCategory", countByCategory);

// 타입별 상품 카운트
router.get("/countByType", countByType);

// 상품 검색
router.get("/search", searchProducts);

export default router;