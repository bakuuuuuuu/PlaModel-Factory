import Product from "../models/Product.js";

// 상품 등록
export const createProduct = async (req, res, next) => {
    // 클라이언트로부터 전달받은 데이터를 기반으로 새로운 상품 객체 생성
    const newProduct = new Product(req.body);
    try {
        // 새로운 상품을 데이터베이스에 저장
        const savedProduct = await newProduct.save();
        // 저장된 상품 정보를 클라이언트에게 응답
        res.status(200).json(savedProduct);
    } catch (err) {
        // 에러 발생 시 다음 미들웨어로 에러 전달
        next(err);
    }
};

// 상품 정보 수정
export const updateProduct = async (req, res, next) => {
    try {
        // 요청된 상품 ID를 기반으로 해당 상품의 정보를 업데이트
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id, // 상품 ID
            { $set: req.body }, // 업데이트할 정보
            { new: true } // 업데이트 후의 새로운 정보 반환
        );
        // 업데이트된 상품 정보를 클라이언트에게 응답
        res.status(200).json(updatedProduct);
    } catch (err) {
        // 에러 발생 시 다음 미들웨어로 에러 전달
        next(err);
    }
};

// 상품 삭제
export const deleteProduct = async (req, res, next) => {
    try {
        // 요청된 상품 ID를 기반으로 해당 상품을 삭제
        await Product.findByIdAndDelete(req.params.id);
        // 삭제 성공 메시지를 클라이언트에게 응답
        res.status(200).json("Product has been deleted.");
    } catch (err) {
        // 에러 발생 시 다음 미들웨어로 에러 전달
        next(err);
    }
};

// 상품 정보 조회
export const getProduct = async (req, res, next) => {
    try {
        // 요청된 상품 ID를 기반으로 해당 상품 정보를 조회
        const product = await Product.findById(req.params.id);
        // 조회된 상품 정보를 클라이언트에게 응답
        res.status(200).json(product);
    } catch (err) {
        // 에러 발생 시 다음 미들웨어로 에러 전달
        next(err);
    }
};

// 전체 상품 조회
export const getProducts = async (req, res, next) => {
    // 요청된 쿼리에서 limit 값과 나머지 필터링 조건을 추출
    const { limit, ...others } = req.query;
    try {
        // 필터링 조건을 기반으로 상품 목록을 조회하고, limit 값이 있다면 해당 수만큼 제한
        const Products = await Product.find({
            ...others
        }).limit(parseInt(limit) || 0);
        // 조회된 상품 목록을 클라이언트에게 응답
        res.status(200).json(Products);
    } catch (err) {
        // 에러 발생 시 다음 미들웨어로 에러 전달
        next(err);
    }
};

// 카테고리별 상품 카운트
export const countByCategory = async (req, res, next) => {
    // 요청된 카테고리를 쉼표로 구분하여 배열로 변환
    const categories = req.query.categorys.split(",");
    try {
        // 각 카테고리에 대해 상품 수를 비동기적으로 카운트
        const list = await Promise.all(
            categories.map((category) => {
                return Product.countDocuments({ category: category });
            })
        );
        // 각 카테고리별 상품 수를 클라이언트에게 응답
        res.status(200).json(list);
    } catch (err) {
        // 에러 발생 시 다음 미들웨어로 에러 전달
        next(err);
    }
};

// 타입별 상품 카운트
export const countByType = async (req, res, next) => {
    try {
        // 각 타입별로 상품 수를 카운트
        const EGCount = await Product.countDocuments({ type: "EG" });
        const HGCount = await Product.countDocuments({ type: "HG" });
        const RGCount = await Product.countDocuments({ type: "RG" });
        const MGCount = await Product.countDocuments({ type: "MG" });
        const PGCount = await Product.countDocuments({ type: "PG" });
        const FRSCount = await Product.countDocuments({ type: "Figure Rise Standard" });
        const FRSACount = await Product.countDocuments({ type: "Figure Rise Standard Amplified" });

        // 각 타입별 상품 수를 클라이언트에게 응답
        res.status(200).json([
            { type: "EG", count: EGCount },
            { type: "HG", count: HGCount },
            { type: "RG", count: RGCount },
            { type: "MG", count: MGCount },
            { type: "PG", count: PGCount },
            { type: "Figure Rise Standard", count: FRSCount },
            { type: "Figure Rise Standard Amplified", count: FRSACount },
        ]);
    } catch (err) {
        // 에러 발생 시 다음 미들웨어로 에러 전달
        next(err);
    }
};

// 상품 검색
export const searchProducts = async (req, res, next) => {
    // 요청된 검색어를 가져옴
    const query = req.query.q;
    try {
        // 검색어를 기반으로 상품명을 대소문자 구분 없이 검색
        const products = await Product.find({ productName: { $regex: query, $options: 'i' } });
        // 검색된 상품 목록을 클라이언트에게 응답
        res.status(200).json(products);
    } catch (err) {
        // 에러 발생 시 다음 미들웨어로 에러 전달
        next(err);
    }
};
