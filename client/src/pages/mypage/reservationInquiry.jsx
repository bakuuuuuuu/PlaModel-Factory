import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import "../mypage/reservationInquiry.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';

const ReservationInquiry = () => {
    const [orders, setOrders] = useState([]);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            if (!user) {
                navigate("/login");
                return;
            }

            try {
                const apiUrl = process.env.REACT_APP_API_URL;
                const response = await axios.get(`${apiUrl}/orders/user`, { withCredentials: true });
                setOrders(response.data.orders);
            } catch (error) {
                console.error("There was an error fetching the orders!", error);
            }
        };

        fetchOrders();
    }, [user, navigate]);

    if (!user) {
        return <p>로그인이 필요합니다.</p>;
    }

    return (
        <div className="reservation-inquiry-container">
            <div className='reservation-inquiry-content'>
                <h1>주문 내역</h1>
                {orders.length === 0 ? (
                    <div className="order-item">
                        <p>주문 내역이 없습니다.</p>
                    </div>
                ) : (
                    <div className="orders-list">
                        {orders.map((order, index) => (
                            <div key={index} className="order-item">
                                <h2><FontAwesomeIcon icon={faClock} /> 주문 일시: {format(new Date(order.createdAt), 'yyyy-MM-dd HH:mm:ss')}</h2>
                                <h3>주문 상태: <span className='order-state'>{order.status}</span></h3>
                                <h3>총 금액: {new Intl.NumberFormat('ko-KR').format(order.totalAmount)}원</h3>
                                <div className="order-products">
                                    {order.products.map((product, idx) => (
                                        <div key={idx} className="order-product">
                                            <p><strong>상품명:</strong> {product.productId.productName}</p>
                                            <p><strong>수량:</strong> {product.quantity}</p>
                                            <p><strong>가격:</strong> {new Intl.NumberFormat('ko-KR').format(product.price)}원</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReservationInquiry;
