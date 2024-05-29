import Cart from "../models/Cart.js";
import { createError } from "../utils/error.js";

// 생성
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

        next();
    } catch (err) {
        next(err);
    }
};

// 삭제
export const deleteCartById  = async (req, res, next) => {
    try {
        const cartId = req.params.id;

        // 장바구니 존재 확인
        const cart = await Cart.findById(cartId);

        if (!cart) {
            return next(createError(404, "장바구니를 찾을 수 없습니다."));
        }

        await Cart.findByIdAndDelete(cartId);

        res.status(200).json("장바구니가 삭제되었습니다.");
    }
    catch (err) {
        next(err);
    }
};

// 전체 장바구니 조회
export const getCarts = async(req, res, next) => {
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
    }
    catch(err) {
        next(err);
    }
};

// 장바구니에 상품 추가 미들웨어
export const addToCart = async (req, res, next) => {
    try {
        const { productId, quantity, price } = req.body;
        const userId = req.user.id;

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            // 장바구니가 없으면 새로 생성
            cart = new Cart({ userId, products: [] });
        }

        // 장바구니에 동일한 상품이 있는지 확인
        const existingProductIndex = cart.products.findIndex(p => p.productId === productId);

        if (existingProductIndex > -1) {
            // 동일한 상품이 있으면 수량만 업데이트
            cart.products[existingProductIndex].quantity += quantity;
        } else {
            // 새 상품을 장바구니에 추가
            cart.products.push({ productId, quantity, price });
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (err) {
        next(err);
    }
};

// 로그인한 사용자의 장바구니를 가져오는 미들웨어
export const getCartByUserId = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const cart = await Cart.findOne({ userId }).populate('products.productId'); // populate 사용

        if (!cart) {
            return next(createError(404, "Cart not found!"));
        }

        res.status(200).json(cart);
    } catch (err) {
        next(err);
    }
};

// 장바구니에서 특정 상품 삭제 미들웨어
export const removeFromCart = async (req, res, next) => {
    try {
        const { productId } = req.body;
        const userId = req.user.id;

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            return next(createError(404, "Cart not found!"));
        }

        // 해당 상품 제거
        cart.products = cart.products.filter(product => product.productId.toString() !== productId);

        await cart.save();
        res.status(200).json(cart);
    } catch (err) {
        next(err);
    }
};