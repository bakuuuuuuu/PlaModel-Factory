import Cart from "../models/Cart.js";
import Order from "../models/Order.js";
import { createError } from "../utils/error.js";

// 주문 생성 및 업데이트 (사용자가 장바구니에서 주문버튼을 눌렀을 때)
export const createOrder = async (req, res, next) => {
    try {
        const userId = req.user.id;

        // 사용자의 장바구니 가져오기
        const cart = await Cart.findOne({ userId });

        if (!cart || cart.products.length === 0) {
            return next(createError(400, "장바구니가 비어있습니다."));
        }

        // 주문 총액 계산
        const totalAmount = cart.products.reduce((total, product) => total + (product.price * product.quantity), 0);

        // 주문 정보
        const newOrder = {
            products: cart.products,
            totalAmount,
            status: "주문 완료",
            createdAt: new Date(),
            updatedAt: new Date()
        };

        // 사용자의 기존 주문내역 가져오기
        let userOrders = await Order.findOne({ userId });

        if (!userOrders) {
            // 기존 주문내역이 없으면 새로 생성
            userOrders = new Order({
                userId,
                orders: [newOrder]
            });
        } else {
            // 기존 주문내역에 새로운 주문 추가
            userOrders.orders.push(newOrder);
        }

        // 저장
        await userOrders.save();

        // 장바구니 비우기
        cart.products = [];
        await cart.save();

        res.status(201).json(userOrders);
    } catch (err) {
        next(err);
    }
};

// 로그인한 사용자의 주문내역 조회
export const getUserOrders = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const orders = await Order.findOne({ userId }).populate('orders.products.productId');

        if (!orders) {
            return next(createError(404, "주문 내역이 없습니다."));
        }

        res.status(200).json(orders);
    } catch (err) {
        next(err);
    }
};

// 전체 주문내역 조회 (관리자용)
export const getAllOrders = async (req, res, next) => {
    try {
        const orders = await Order.find().populate('orders.products.productId');
        res.status(200).json(orders);
    } catch (err) {
        next(err);
    }
};

// 특정 사용자의 주문 내역 삭제 (관리자용)
export const deleteUserOrder = async (req, res, next) => {
    try {
        const { userId, orderId } = req.params;

        const userOrders = await Order.findOne({ userId });

        if (!userOrders) {
            return next(createError(404, "사용자의 주문 내역을 찾을 수 없습니다."));
        }

        userOrders.orders = userOrders.orders.filter(order => order._id.toString() !== orderId);

        await userOrders.save();

        res.status(200).json({ message: "주문 내역이 삭제되었습니다." });
    } catch (err) {
        next(err);
    }
};

// 특정 사용자의 주문 내역 수정 (관리자용)
export const updateUserOrder = async (req, res, next) => {
    try {
        const { userId, orderId } = req.params;
        const { status, products, totalAmount } = req.body;

        const userOrders = await Order.findOne({ userId });

        if (!userOrders) {
            return next(createError(404, "사용자의 주문 내역을 찾을 수 없습니다."));
        }

        const orderIndex = userOrders.orders.findIndex(order => order._id.toString() === orderId);

        if (orderIndex === -1) {
            return next(createError(404, "해당 주문 내역을 찾을 수 없습니다."));
        }

        if (status) userOrders.orders[orderIndex].status = status;
        if (products) userOrders.orders[orderIndex].products = products;
        if (totalAmount) userOrders.orders[orderIndex].totalAmount = totalAmount;
        userOrders.orders[orderIndex].updatedAt = new Date();

        await userOrders.save();

        res.status(200).json(userOrders.orders[orderIndex]);
    } catch (err) {
        next(err);
    }
};