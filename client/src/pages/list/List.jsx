import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Menubar from "../../components/header/Menubar";
import Rating from '../../components/rating/Rating';
import { useNavigate } from 'react-router-dom';
import "../list/list.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faTag, faCube, faWonSign, faWarehouse, faWrench, faPercentage } from '@fortawesome/free-solid-svg-icons';

const List = () => {
    const [products, setProducts] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortCriteria, setSortCriteria] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const itemsPerPage = 8;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProductsAndReviews = async () => {
            try {
                const apiUrl = process.env.REACT_APP_API_URL;
                const [productResponse, reviewResponse] = await Promise.all([
                    axios.get(`${apiUrl}/products`),
                    axios.get(`${apiUrl}/reviews`)
                ]);

                const productsWithReviewCount = productResponse.data.map(product => {
                    const productReviews = reviewResponse.data.filter(review => review.productid === product._id);
                    return { ...product, reviewCount: productReviews.length };
                });

                setProducts(productsWithReviewCount);
                setReviews(reviewResponse.data);
            } catch (error) {
                console.error("There was an error fetching the data!", error);
            }
        };

        fetchProductsAndReviews();
    }, []);

    // 정렬
    useEffect(() => {
        if (sortCriteria) {
            setProducts(prevProducts => [...prevProducts].sort(sortCriteria));
        }
    }, [sortCriteria]);

    const calculateAverageRating = (productId) => {
        const productReviews = reviews.filter(review => review.productid === productId);
        if (productReviews.length === 0) return 0;
        const totalRating = productReviews.reduce((sum, review) => sum + review.rating, 0);
        return (totalRating / productReviews.length).toFixed(1); // 소수점 1자리까지 표시
    };

    const totalPages = Math.ceil(products.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const selectedProducts = products.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleProductClick = (id) => {
        navigate(`/products/${id}`);
    }

    const formatPrice = (price) => {
        return new Intl.NumberFormat('ko-KR').format(price);
    };

    // 정렬 함수들 정의
    const sortByNewest = (a, b) => new Date(b.createdAt) - new Date(a.createdAt);
    const sortByLowestPrice = (a, b) => a.price - b.price;
    const sortByHighestPrice = (a, b) => b.price - a.price;
    const sortByDiscountRate = (a, b) => b.discountedPrice - a.discountedPrice;
    const sortByMostReviews = (a, b) => b.reviewCount - a.reviewCount; // 수정된 부분
    const sortByHighestRating = (a, b) => calculateAverageRating(b._id) - calculateAverageRating(a._id);

    // 공통 정렬 핸들러
    const handleSort = (sortFunction) => {
        setSortCriteria(() => sortFunction);
    };

    return (
        <div>
            <Header />
            <Menubar />
            <div className="productListContainer">
                <div className="productList-content-top">
                    <div className="productList-content-img-all">
                    </div>
                </div>
                <div className="productList-content-middle">
                    <div className="productList-content-middle-position">
                        <div className="productList-content-middle-top">
                            <h4>전체 상품</h4>
                        </div>
                        <div className="productList-content-middle-bottom">
                            <div>
                                <button className="productList-filterbtn" onClick={() => handleSort(sortByMostReviews)}>인기도순</button> <span className="filter-text">|&nbsp;</span>
                            </div>
                            <div>
                                <button className="productList-filterbtn" onClick={() => handleSort(sortByNewest)}>최신등록순</button> <span className="filter-text">|&nbsp;</span>
                            </div>
                            <div>
                                <button className="productList-filterbtn" onClick={() => handleSort(sortByLowestPrice)}>낮은가격순</button> <span className="filter-text">|&nbsp;</span>
                            </div>
                            <div>
                                <button className="productList-filterbtn" onClick={() => handleSort(sortByHighestPrice)}>높은가격순</button> <span className="filter-text">|&nbsp;</span>
                            </div>
                            <div>
                                <button className="productList-filterbtn" onClick={() => handleSort(sortByDiscountRate)}>할인율순</button> <span className="filter-text">|&nbsp;</span>
                            </div>
                            <div>
                                <button className="productList-filterbtn" onClick={() => handleSort(sortByMostReviews)}>리뷰많은순</button> <span className="filter-text">|&nbsp;</span>
                            </div>
                            <div>
                                <button className="productList-filterbtn" onClick={() => handleSort(sortByHighestRating)}>평점높은순</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="productList-content-bottom">
                    <div className="productList-content-bottom-products">
                        {selectedProducts.map((product) => (
                            <div key={product._id} className="productList-content-bottom-product" onClick={() => handleProductClick(product._id)}>
                                <img src={product.photos[0]} alt={product.productName} id='product-img' />
                                <div>
                                    <h4><FontAwesomeIcon icon={faBox} /> {product.productName}</h4>
                                </div>
                                <div id='productList-ratingContainer'>
                                    <Rating rating={calculateAverageRating(product._id)} /> <span>({product.reviewCount})</span>
                                </div>
                                <div>
                                    <p><FontAwesomeIcon icon={faTag} /> {product.category}</p>
                                </div>
                                <div>
                                    <p><FontAwesomeIcon icon={faCube} /> {product.type}</p>
                                </div>
                                <div>
                                    <p><FontAwesomeIcon icon={faWonSign} /> {formatPrice(product.price)}원 <span id='List-discount'>{product.discountedPrice}%</span></p>
                                </div>
                                <div>
                                    <p><FontAwesomeIcon icon={faWarehouse} /> {product.inventory}개</p>
                                </div>
                                <div>
                                    <p><FontAwesomeIcon icon={faWrench} /> {product.manufacturer}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="pagination-buttons">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default List;
