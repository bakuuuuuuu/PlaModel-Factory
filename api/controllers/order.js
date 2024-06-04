import Cart from "../models/Cart.js";
import Order from "../models/Order.js";
import { createError } from "../utils/error.js";

// 주문 생성 및 업데이트 (사용자가 장바구니에서 주문버튼을 눌렀을 때)
export const createOrder = async (req, res, next) => {
    try {
        // 사용자의 ID를 가져옴
        const userId = req.user.id;

        // 사용자의 장바구니를 가져옴
        const cart = await Cart.findOne({ userId });

        // 장바구니가 없거나 비어있으면 에러 반환
        if (!cart || cart.products.length === 0) {
            return next(createError(400, "장바구니가 비어있습니다."));
        }

        // 주문 총액 계산
        const totalAmount = cart.products.reduce((total, product) => total + (product.price * product.quantity), 0);

        // 새 주문 정보 생성
        const newOrder = {
            products: cart.products, // 장바구니의 상품들
            totalAmount, // 주문 총액
            status: "주문 완료", // 주문 상태
            createdAt: new Date(), // 주문 생성 시간
            updatedAt: new Date() // 주문 업데이트 시간
        };

        // 사용자의 기존 주문 내역을 가져옴
        let userOrders = await Order.findOne({ userId });

        if (!userOrders) {
            // 기존 주문 내역이 없으면 새로 생성
            userOrders = new Order({
                userId, // 사용자 ID
                orders: [newOrder] // 새로운 주문 추가
            });
        } else {
            // 기존 주문 내역에 새로운 주문 추가
            userOrders.orders.push(newOrder);
        }

        // 주문 내역 저장
        await userOrders.save();

        // 장바구니 비우기
        cart.products = [];
        await cart.save();

        // 저장된 주문 내역 반환
        res.status(201).json(userOrders);
    } catch (err) {
        // 에러 발생 시 다음 미들웨어로 에러 전달
        next(err);
    }
};

// 로그인한 사용자의 주문 내역 조회
export const getUserOrders = async (req, res, next) => {
    try {
        // 사용자의 ID를 가져옴
        const userId = req.user.id;

        // 사용자의 주문 내역을 가져오고 상품 정보를 채움 (populate)
        const orders = await Order.findOne({ userId }).populate('orders.products.productId');

        // 주문 내역이 없으면 404 에러 반환
        if (!orders) {
            return next(createError(404, "주문 내역이 없습니다."));
        }

        // 조회된 주문 내역 반환
        res.status(200).json(orders);
    } catch (err) {
        // 에러 발생 시 다음 미들웨어로 에러 전달
        next(err);
    }
};

// 전체 주문 내역 조회 (관리자용)
export const getAllOrders = async (req, res, next) => {
    try {
        // 모든 주문 내역을 가져오고 상품 정보를 채움 (populate)
        const orders = await Order.find().populate('orders.products.productId');

        // 조회된 주문 내역 반환
        res.status(200).json(orders);
    } catch (err) {
        // 에러 발생 시 다음 미들웨어로 에러 전달
        next(err);
    }
};

// 특정 사용자의 주문 내역 삭제 (관리자용)
export const deleteUserOrder = async (req, res, next) => {
    try {
        // 요청에서 사용자 ID와 주문 ID를 가져옴
        const { userId, orderId } = req.params;

        // 사용자의 주문 내역을 가져옴
        const userOrders = await Order.findOne({ userId });

        // 주문 내역이 없으면 404 에러 반환
        if (!userOrders) {
            return next(createError(404, "사용자의 주문 내역을 찾을 수 없습니다."));
        }

        // 해당 주문 내역을 삭제
        userOrders.orders = userOrders.orders.filter(order => order._id.toString() !== orderId);

        // 주문 내역 저장
        await userOrders.save();

        // 성공 메시지 반환
        res.status(200).json({ message: "주문 내역이 삭제되었습니다." });
    } catch (err) {
        // 에러 발생 시 다음 미들웨어로 에러 전달
        next(err);
    }
};

// 특정 사용자의 주문 내역 수정 (관리자용)
export const updateUserOrder = async (req, res, next) => {
    try {
        // 요청에서 사용자 ID와 주문 ID를 가져옴
        const { userId, orderId } = req.params;
        const { status, products, totalAmount } = req.body;

        // 사용자의 주문 내역을 가져옴
        const userOrders = await Order.findOne({ userId });

        // 주문 내역이 없으면 404 에러 반환
        if (!userOrders) {
            return next(createError(404, "사용자의 주문 내역을 찾을 수 없습니다."));
        }

        // 해당 주문 내역의 인덱스를 찾음
        const orderIndex = userOrders.orders.findIndex(order => order._id.toString() === orderId);

        // 해당 주문 내역이 없으면 404 에러 반환
        if (orderIndex === -1) {
            return next(createError(404, "해당 주문 내역을 찾을 수 없습니다."));
        }

        // 주문 상태, 상품, 총액을 업데이트
        if (status) userOrders.orders[orderIndex].status = status;
        if (products) userOrders.orders[orderIndex].products = products;
        if (totalAmount) userOrders.orders[orderIndex].totalAmount = totalAmount;
        userOrders.orders[orderIndex].updatedAt = new Date(); // 업데이트 시간 갱신

        // 주문 내역 저장
        await userOrders.save();

        // 업데이트된 주문 내역 반환
        res.status(200).json(userOrders.orders[orderIndex]);
    } catch (err) {
        // 에러 발생 시 다음 미들웨어로 에러 전달
        next(err);
    }
};
