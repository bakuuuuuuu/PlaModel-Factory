import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Menubar from "../../components/header/Menubar";
import Rating from '../../components/rating/Rating';
import Review from '../../components/review/Review';
import QuantityInput from '../../components/quantityInput/QuantityInput';
import "../product/productDetail.css";

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const apiUrl = process.env.REACT_APP_API_URL;
                const productResponse = await axios.get(`${apiUrl}/products/find/${id}`);
                setProduct(productResponse.data);

                const reviewResponse = await axios.get(`${apiUrl}/reviews/review/${id}`);
                setReviews(reviewResponse.data);
            } catch (error) {
                console.error("There was an error fetching the product!", error);
            }
        };

        fetchProduct();
    }, [id]);

    if (!product) return <div>Loading...</div>;

    const calculateAverageRating = () => {
        if (reviews.length === 0) return 0;
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        return (totalRating / reviews.length).toFixed(1); // 소수점 1자리까지 표시
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('ko-KR').format(price);
    };

    return (
        <div>
            <Header />
            <Menubar />
            <div className="productDetailContainer">
                <div className='productDetail-content'>
                    <div className='productDetail-imgAndreview'>
                        <h1>{product.desc}</h1>
                        <div className="productDetail-img">
                            {product.photos.map((photo, index) => (
                                <img key={index} src={photo} alt={`${product.productName} ${index + 1}`} />
                            ))}
                        </div>
                        <div className='productDetail-review'>
                            <Review productId={product._id} />
                        </div>
                    </div>
                    <div className="productDetail-sidebar">
                        <div className='productDetail-sidebar-2'>
                            <h3>{product.productName}</h3>
                            <Rating rating={calculateAverageRating()} />
                            <p><strong>카테고리 : </strong> {product.category}</p>
                            <p><strong>등급 : </strong> {product.type}</p>
                            <p><strong>가격 : </strong> {formatPrice(product.price)}원</p>
                            <p><strong>제조사 : </strong> {product.manufacturer}</p>
                            <p><strong>제품 설명 : </strong> {product.desc}</p>
                            <QuantityInput />
                            {product.inventory > 0 ? (
                                <button className='productDetail-CartInbtn'>장바구니 담기</button>
                            ) : (
                                <button className='productDetail-SoldOutbtn' disabled>SOLD OUT</button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ProductDetail;