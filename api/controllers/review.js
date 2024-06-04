import Review from "../models/Review.js";
import Product from "../models/Product.js";

// 리뷰 등록
export const createReview = async (req, res, next) => {
    // 클라이언트로부터 전달받은 데이터를 기반으로 새로운 리뷰 객체 생성
    const newReview = new Review(req.body);
    try {
        // 새로운 리뷰를 데이터베이스에 저장
        const savedReview = await newReview.save();
        // 저장된 리뷰 정보를 클라이언트에게 응답
        res.status(200).json(savedReview);
    }
    catch (err) {
        // 에러 발생 시 다음 미들웨어로 에러 전달
        next(err);
    }
};

// 리뷰 수정
export const updateReview = async (req, res, next) => {
    try {
        // 요청된 리뷰 ID를 기반으로 해당 리뷰의 정보를 업데이트
        const updatedReview = await Review.findByIdAndUpdate(
            req.params.id, // 리뷰 ID
            { $set: req.body }, // 업데이트할 정보
            { new: true } // 업데이트 후의 새로운 정보 반환
        );
        // 업데이트된 리뷰 정보를 클라이언트에게 응답
        res.status(200).json(updatedReview);
    }
    catch (err) {
        // 에러 발생 시 다음 미들웨어로 에러 전달
        next(err);
    }
};

// 리뷰 삭제
export const deleteReview = async (req, res, next) => {
    try {
        // 요청된 리뷰 ID를 기반으로 해당 리뷰를 삭제
        await Review.findByIdAndDelete(req.params.id);
        // 삭제 성공 메시지를 클라이언트에게 응답
        res.status(200).json("Review has been deleted.");
    }
    catch (err) {
        // 에러 발생 시 다음 미들웨어로 에러 전달
        next(err);
    }
};

// 리뷰 조회
export const getReview = async (req, res, next) => {
    try {
        // 요청된 리뷰 ID를 기반으로 해당 리뷰 정보를 조회
        const review = await Review.findById(req.params.id);
        // 조회된 리뷰 정보를 클라이언트에게 응답
        res.status(200).json(review);
    }
    catch (err) {
        // 에러 발생 시 다음 미들웨어로 에러 전달
        next(err);
    }
};

// 전체 리뷰 조회
export const getReviews = async (req, res, next) => {
    try {
        // 모든 리뷰 정보를 조회
        const reviews = await Review.find();
        // 조회된 모든 리뷰 정보를 클라이언트에게 응답
        res.status(200).json(reviews);
    }
    catch (err) {
        // 에러 발생 시 다음 미들웨어로 에러 전달
        next(err);
    }
};

// 상품 ID로 리뷰 조회
export const getReviewsByProductId = async (req, res, next) => {
    // 요청된 상품 ID를 가져옴
    const { productid } = req.params;
    console.log(productid);
    try {
        // 해당 상품 ID에 대한 리뷰들을 조회하고, 사용자 정보를 포함 (populate)
        const reviews = await Review.find({ productid }).populate('userId', 'username');
        // 조회된 리뷰들을 클라이언트에게 응답
        res.status(200).json(reviews);
    } catch (err) {
        // 에러 발생 시 다음 미들웨어로 에러 전달
        next(err);
    }
};

// 사용자 ID로 리뷰 가져오기 (제품 이름 포함)
export const getReviewsByUserIdWithProductNames = async (req, res, next) => {
    // 요청된 사용자 ID를 가져옴
    const { userId } = req.params;
    try {
        // 해당 사용자 ID에 대한 리뷰들을 조회
        const reviews = await Review.find({ userId });

        // 조회된 리뷰들에서 상품 ID들을 추출
        const productIds = reviews.map(review => review.productid);

        // 추출된 상품 ID들에 대한 제품 정보를 조회
        const products = await Product.find({ _id: { $in: productIds } });

        // 제품 정보를 맵으로 변환 (키: 제품 ID, 값: 제품 이름)
        const productMap = products.reduce((acc, product) => {
            acc[product._id] = product.productName;
            return acc;
        }, {});

        // 리뷰들에 제품 이름을 추가
        const reviewsWithProductNames = reviews.map(review => ({
            ...review.toObject(), // 리뷰 객체를 일반 객체로 변환
            productName: productMap[review.productid] || "Unknown Product" // 제품 이름 추가
        }));

        // 제품 이름이 포함된 리뷰들을 클라이언트에게 응답
        res.status(200).json(reviewsWithProductNames);
    } catch (err) {
        // 에러 발생 시 다음 미들웨어로 에러 전달
        next(err);
    }
};
