import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Header from '../../components/header/Header';
import Menubar from '../../components/header/Menubar';
import Footer from '../../components/footer/Footer';
import "../cart/cart.css";

const Cart = () => {
    const [cart, setCart] = useState(null);
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const apiUrl = process.env.REACT_APP_API_URL;
                const res = await axios.get(`${apiUrl}/carts/${user._id}`, {
                    withCredentials: true // 쿠키 포함 옵션 추가
                });
                setCart(res.data);
                console.log(res.data);
            } catch (err) {
                console.log("Error fetching cart:", err);
                if (err.response && err.response.status === 401) {
                    navigate('/login');
                }
            }
        };

        if (user) {
            fetchCart();
        }
    }, [navigate, user]);

    if (!cart) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Header />
            <Menubar />
            <div className="cartContainer">
                <h1>장바구니</h1>
                <div className='showCart-content'>
                    {cart.products.length > 0 ? (
                        cart.products.map((product) => (
                            <div key={product.productId._id} className="cart-item">
                                <div>
                                    <p>상품명 : {product.productId.productName}</p>
                                </div>
                                <div>
                                    <img src={product.photos}></img>
                                </div>
                                <div>
                                    <p>가격 : {product.price}</p>
                                </div>
                                <div>
                                    <p>수량 : {product.quantity}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="cart-item">
                            <p>장바구니에 담은 상품이 없습니다.</p>
                        </div>
                    )}
                </div>
                <div className='orderCart-content'>
                    <div className='orderCart-content-form'>
                        <div className='orderCart-content-top'>
                            <h4>최종 결제 금액</h4>
                        </div>
                        <div className='orderCart-content-middle'>
                            <div>
                                <span>주문금액</span>
                                <span>000원</span>
                            </div>
                            <div>
                                <span>할인금액</span>
                                <span>000원</span>
                            </div>
                            <div>
                                <span>배송비</span>
                                <span>000원</span>
                            </div>
                        </div>
                        <div className='orderCart-content-horizonLine'>
                            <div className='horizonLine'></div>
                        </div>
                        <div className='orderCart-content-bottom'>
                            <div>
                                <span>총 결제 예정 금액</span>
                                <span>000원</span>
                            </div>
                        </div>
                    </div>
                    <div className='orderCart-content-btn'>
                        <button className='Cart-oderbtn'>주문하기</button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Cart;
