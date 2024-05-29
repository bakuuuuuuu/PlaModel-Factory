import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Menubar from "../../components/header/Menubar";
import { AuthContext } from '../../context/AuthContext';
import "../cart/cart.css";

const Cart = () => {
    const [cart, setCart] = useState(null);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const { user, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCart = async () => {
            if (!user) {
                navigate("/login");
                return;
            }

            try {
                const apiUrl = process.env.REACT_APP_API_URL;
                const response = await axios.get(`${apiUrl}/carts/${user._id}`, { withCredentials: true });
                setCart(response.data);

                // 장바구니 상품 수 업데이트
                dispatch({ type: "SET_CART_ITEM_COUNT", payload: response.data.products.length });
            } catch (error) {
                console.error("There was an error fetching the cart!", error);
            }
        };

        fetchCart();
    }, [user, navigate, dispatch]);

    if (!cart) return <div>Loading...</div>;

    const calculateTotalProductPrice = () => {
        return cart.products.reduce((total, product) => total + product.price * product.quantity, 0);
    };

    const handleCheckboxChange = (productId) => {
        setSelectedProducts(prev =>
            prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
        );
    };

    const handleRemoveSelected = async () => {
        const apiUrl = process.env.REACT_APP_API_URL;

        try {
            for (let productId of selectedProducts) {
                await axios.post(`${apiUrl}/carts/remove`, { productId }, { withCredentials: true });
            }
            // 장바구니 다시 불러오기
            const response = await axios.get(`${apiUrl}/carts/${user._id}`, { withCredentials: true });
            setCart(response.data);

            // 장바구니 상품 수 업데이트
            dispatch({ type: "SET_CART_ITEM_COUNT", payload: response.data.products.length });

            // 선택된 상품 초기화
            setSelectedProducts([]);
        } catch (error) {
            console.error("There was an error removing the products from the cart!", error);
        }
    };

    const totalProductPrice = calculateTotalProductPrice();
    const shippingCost = cart.products.length === 0 ? 0 : 2500;
    const totalPrice = totalProductPrice + shippingCost;

    return (
        <div id="root">
            <Header />
            <Menubar />
            <div className="cartContainer">
                <h1>장바구니</h1>
                <div className="cartContent">
                    <div className="cartProducts">
                        {cart.products.length === 0 ? (
                            <p>장바구니에 담긴 상품이 없습니다</p>
                        ) : (
                            cart.products.map((product) => (
                                <div key={product.productId._id} className="cartProduct">
                                    <input
                                        type="checkbox"
                                        checked={selectedProducts.includes(product.productId._id)}
                                        onChange={() => handleCheckboxChange(product.productId._id)}
                                    />
                                    <span>{product.productId.productName}</span>
                                    <span>{product.quantity}</span>
                                    <span>{new Intl.NumberFormat('ko-KR').format(product.price)}원</span>
                                </div>
                            ))
                        )}
                    </div>
                    <div className="cartSummary">
                        <h2>총 결제 예정 금액</h2>
                        <p><strong>총 상품 금액: </strong>{new Intl.NumberFormat('ko-KR').format(totalProductPrice)}원</p>
                        <p><strong>배송비: </strong>{new Intl.NumberFormat('ko-KR').format(shippingCost)}원</p>
                        <hr />
                        <p><strong>총 결제 예정 금액: </strong>{new Intl.NumberFormat('ko-KR').format(totalPrice)}원</p>
                        <button className="purchaseButton">구매하기</button>
                        <button className="removeButton" onClick={handleRemoveSelected} disabled={selectedProducts.length === 0}>선택 상품 삭제</button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Cart;
