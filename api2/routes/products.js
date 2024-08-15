import express from 'express';
import {
    getAllProducts,
    getCategoriesProducts,
    getTypesProducts,
    getIDProduct,
    createProduct,
    updateProduct,
    deleteProduct
} from "../controllers/productController.js";

const router = express.Router();

// 모든 상품 정보 가져오기
router.get('/', getAllProducts);

// 카테고리 이름으로 상품 정보 가져오기
router.get('/category/:catename', getCategoriesProducts);

// 타입 이름으로 상품 정보 가져오기
router.get('/type/:typename', getTypesProducts);

// 특정 상품 정보 가져오기
router.get('/:id', getIDProduct);

// 상품 생성
router.post('/', createProduct);

// 상품 업데이트
router.put('/:id', updateProduct);

// 상품 삭제
router.delete('/:id', deleteProduct);

export default router;
