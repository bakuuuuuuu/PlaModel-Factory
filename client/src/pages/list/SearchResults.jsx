import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../../components/header/Header';
import Menubar from "../../components/header/Menubar";
import Footer from '../../components/footer/Footer';
import Rating from '../../components/rating/Rating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faTag, faCube, faWonSign, faWarehouse, faWrench } from '@fortawesome/free-solid-svg-icons';
import "../list/searchResult.css";

const SearchResults = () => {
    const [results, setResults] = useState([]);
    const [reviews, setReviews] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const fetchSearchResults = async () => {
            const query = new URLSearchParams(location.search).get('q');
            if (query) {
                try {
                    const apiUrl = process.env.REACT_APP_API_URL;
                    const [productResponse, reviewResponse] = await Promise.all([
                        axios.get(`${apiUrl}/products/search?q=${query}`),
                        axios.get(`${apiUrl}/reviews`)
                    ]);

                    const productsWithReviewCount = productResponse.data.map(product => {
                        const productReviews = reviewResponse.data.filter(review => review.productid === product._id);
                        return { ...product, reviewCount: productReviews.length };
                    });

                    setResults(productsWithReviewCount);
                    setReviews(reviewResponse.data);
                } catch (error) {
                    console.error("Failed to fetch search results", error);
                }
            }
        };

        fetchSearchResults();
    }, [location.search]);

    const calculateAverageRating = (productId) => {
        const productReviews = reviews.filter(review => review.productid === productId);
        if (productReviews.length === 0) return 0;
        const totalRating = productReviews.reduce((sum, review) => sum + review.rating, 0);
        return (totalRating / productReviews.length).toFixed(1); // 소수점 1자리까지 표시
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('ko-KR').format(price);
    };

    return (
        <div>
            <Header />
            <Menubar />
            <div className="searchResultsContainer">
                {results.length > 0 ? (
                    <div className="search-results">
                        {results.map(product => (
                            <div key={product._id} className="search-result-item">
                                <Link to={`/products/${product._id}`}>
                                    <img src={product.photos[0]} alt={product.productName} className="product-img" />
                                    <div>
                                        <h4><FontAwesomeIcon icon={faBox} /> {product.productName}</h4>
                                    </div>
                                    <div className='product-rating'>
                                        <Rating rating={calculateAverageRating(product._id)} /> <span>({product.reviewCount || 0})</span>
                                    </div>
                                    <div>
                                        <p><FontAwesomeIcon icon={faTag} /> {product.category}</p>
                                    </div>
                                    <div>
                                        <p><FontAwesomeIcon icon={faCube} /> {product.type}</p>
                                    </div>
                                    <div>
                                        <p><FontAwesomeIcon icon={faWonSign} /> {formatPrice(product.price)}원</p>
                                    </div>
                                    <div>
                                        <p><FontAwesomeIcon icon={faWarehouse} /> {product.inventory}개</p>
                                    </div>
                                    <div>
                                        <p><FontAwesomeIcon icon={faWrench} /> {product.manufacturer}</p>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="no-results">
                        <p>일치하는 상품이 없습니다.</p>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default SearchResults;
