import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import { createError } from "../utils/error.js";

// 장바구니 생성 (존재하지 않을 경우)
export const createCartIfNotExists = async (req, res, next) => {
    try {
        // 사용자의 _id를 가져옴
        const userId = req.user.id;

        // 해당 사용자의 장바구니가 존재하는지 확인
        const existingCart = await Cart.findOne({ userId });

        // 장바구니가 존재하지 않는 경우 새 장바구니 생성
        if (!existingCart) {
            const newCart = new Cart({ userId, products: [] });
            await newCart.save();
        }

        // 다음 미들웨어로 이동
        next();
    } catch (err) {
        // 에러 발생 시 다음 미들웨어로 에러 전달
        next(err);
    }
};

// 장바구니 삭제
export const deleteCartById  = async (req, res, next) => {
    try {
        // 요청에서 장바구니 ID를 가져옴
        const cartId = req.params.id;

        // 장바구니 존재 확인
        const cart = await Cart.findById(cartId);

        // 장바구니가 없으면 404 에러 반환
        if (!cart) {
            return next(createError(404, "장바구니를 찾을 수 없습니다."));
        }

        // 장바구니 삭제
        await Cart.findByIdAndDelete(cartId);

        // 성공 메시지 반환
        res.status(200).json("장바구니가 삭제되었습니다.");
    }
    catch (err) {
        // 에러 발생 시 다음 미들웨어로 에러 전달
        next(err);
    }
};

// 전체 장바구니 조회
export const getCarts = async(req, res, next) => {
    try {
        // 모든 장바구니 조회
        const carts = await Cart.find();

        // 조회된 장바구니 반환
        res.status(200).json(carts);
    }
    catch(err) {
        // 에러 발생 시 다음 미들웨어로 에러 전달
        next(err);
    }
};

// 장바구니에 상품 추가
export const addToCart = async (req, res, next) => {
    try {
        // 요청에서 상품 ID, 수량, 가격을 가져옴
        const { productId, quantity, price } = req.body;
        const userId = req.user.id;

        // 사용자의 장바구니를 조회
        let cart = await Cart.findOne({ userId });

        // 장바구니가 없으면 새로 생성
        if (!cart) {
            cart = new Cart({ userId, products: [] });
        }

        // 장바구니에 동일한 상품이 있는지 확인
        const existingProductIndex = cart.products.findIndex(p => p.productId === productId);

        // 동일한 상품이 있으면 수량만 업데이트
        if (existingProductIndex > -1) {
            cart.products[existingProductIndex].quantity += quantity;
        } else {
            // 새 상품을 장바구니에 추가
            cart.products.push({ productId, quantity, price });
        }

        // 재고 확인 및 감소 로직
        const product = await Product.findById(productId);
        if (product.inventory < quantity) {
            return next(createError(400, "재고가 부족합니다."));
        }
        product.inventory -= quantity;
        await product.save();

        // 장바구니 저장
        await cart.save();

        // 업데이트된 장바구니 반환
        res.status(200).json(cart);
    } catch (err) {
        // 에러 발생 시 다음 미들웨어로 에러 전달
        next(err);
    }
};

// 로그인한 사용자의 장바구니를 가져옴
export const getCartByUserId = async (req, res, next) => {
    try {
        // 사용자의 ID를 가져옴
        const userId = req.user.id;

        // 사용자의 장바구니를 조회하고 상품 정보를 채움 (populate)
        const cart = await Cart.findOne({ userId }).populate('products.productId');

        // 장바구니가 없으면 404 에러 반환
        if (!cart) {
            return next(createError(404, "장바구니를 찾을 수 없습니다."));
        }

        // 조회된 장바구니 반환
        res.status(200).json(cart);
    } catch (err) {
        // 에러 발생 시 다음 미들웨어로 에러 전달
        next(err);
    }
};

// 장바구니에서 특정 상품 삭제
export const removeFromCart = async (req, res, next) => {
    try {
        // 요청에서 상품 ID를 가져옴
        const { productId } = req.body;
        const userId = req.user.id;

        // 사용자의 장바구니를 조회
        let cart = await Cart.findOne({ userId });

        // 장바구니가 없으면 404 에러 반환
        if (!cart) {
            return next(createError(404, "장바구니를 찾을 수 없습니다."));
        }

        // 장바구니에서 해당 상품을 찾음
        const productInCart = cart.products.find(product => product.productId.toString() === productId);

        // 해당 상품이 없으면 404 에러 반환
        if (!productInCart) {
            return next(createError(404, "장바구니에서 해당 상품을 찾을 수 없습니다."));
        }

        // 해당 상품을 장바구니에서 제거
        cart.products = cart.products.filter(product => product.productId.toString() !== productId);

        // 재고 증가 로직
        const product = await Product.findById(productId);
        product.inventory += productInCart.quantity;
        await product.save();

        // 장바구니 저장
        await cart.save();

        // 업데이트된 장바구니 반환
        res.status(200).json(cart);
    } catch (err) {
        // 에러 발생 시 다음 미들웨어로 에러 전달
        next(err);
    }
};
