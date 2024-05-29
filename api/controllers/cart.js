import Cart from "../models/Cart.js";

// 장바구니 생성 (사용자가 회원가입할 때 생성/ 만약 회원가입한 사용자가 장바구니가 없으면 로그인할 때 생성)
export const createCart = async (req, res, next) => {
    const newCart = new Cart(req.body);
    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    }
    catch (err) {
        next(err);
    }
};

// 장바구니 업데이트 (사용자가 새로운 상품을 더 담거나, 이미 장바구니에 담긴 상품을 추가로 담을 경우)
export const updateCart = async (req, res, next) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.id });
        if (!cart) {
            return res.status(404).json("Cart not found");
        }

        const productIndex = cart.products.findIndex(p => p.productId.toString() === req.body.productId);
        if (productIndex > -1) {
            // 상품이 이미 장바구니에 있는 경우 수량을 업데이트
            cart.products[productIndex].quantity = req.body.quantity;
        } else {
            // 새로운 상품을 장바구니에 추가
            cart.products.push({
                productId: req.body.productId,
                quantity: req.body.quantity,
                price: req.body.price
            });
        }

        const updatedCart = await cart.save();
        res.status(200).json(updatedCart);
    } catch (err) {
        next(err);
    }
};

// 장바구니에서 특정 상품 삭제
export const removeProductFromCart = async (req, res, next) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.id });
        if (!cart) {
            return res.status(404).json("Cart not found");
        }

        cart.products = cart.products.filter(p => p.productId.toString() !== req.params.productId);
        const updatedCart = await cart.save();
        res.status(200).json(updatedCart);
    } catch (err) {
        next(err);
    }
};

// 장바구니 삭제 (사용자가 회원 탈퇴를 할 때 장바구니도 같이 삭제)
export const deleteCart = async (req, res, next) => {
    try {
        await Cart.findOneAndDelete({ userId: req.user.id });
        res.status(200).json("Cart has been deleted.");
    }
    catch (err) {
        next(err);
    }
};

// 장바구니 조회(사용자가 장바구니에 접속하면 해당 사용자의 장바구니를 보여줄 때 사용)
export const getCart = async (req, res, next) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.id }).populate('products.productId');
        if (!cart) {
            return res.status(404).json("Cart not found");
        }
        res.status(200).json(cart);
    } catch (err) {
        next(err);
    }
};

// 전체 장바구니 조회(관리자용)
export const getCarts = async (req, res, next) => {
    const { limit, ...others } = req.query;
    try {
        const carts = await Cart.find({ ...others }).limit(parseInt(limit) || 0);
        res.status(200).json(carts);
    } catch (err) {
        next(err);
    }
};