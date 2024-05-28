import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCalendar, faHeading, faAlignLeft } from '@fortawesome/free-solid-svg-icons';
import Rating from '../rating/Rating';
import "./review.css";
import WriteReview from './WriteReview';

const Review = (props) => {
    const [reviews, setReviews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedRating, setSelectedRating] = useState(null);
    const reviewsPerPage = 3;

    const formatDate = (dateString) => {
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric', 
            hour: 'numeric', 
            minute: 'numeric', 
            weekday: 'long' 
        };
        const formattedDate = new Date(dateString).toLocaleDateString('ko-KR', options);
        return formattedDate;
    };
    

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/reviews/review/${props.productId}`);
                setReviews(response.data);
            } catch (err) {
                console.error("Error fetching reviews:", err);
            }
        };

        fetchReviews();
    }, []);

    // 별점별로 정렬된 리뷰 가져오는 함수
    const getSortedReviews = () => {
        let sortedReviews = [...reviews]; // 별점별로 정렬하기 전에 기존 리뷰 복사
        if (selectedRating !== null) {
            sortedReviews = sortedReviews.filter(review => review.rating === selectedRating);
        }
        return sortedReviews;
    };

    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviews = getSortedReviews().slice(indexOfFirstReview, indexOfLastReview);

    const handleShowMore = () => {
        setCurrentPage(currentPage + 1);
    };

    const handleShowLess = () => {
        setCurrentPage(currentPage - 1);
    };

    const handleRatingChange = (e) => {
        setSelectedRating(e.target.value === "" ? null : parseInt(e.target.value));
        setCurrentPage(1);
    };

    return (
        <div className="Reviews">
            <h1>상품 후기</h1>
            <select value={selectedRating || ''} onChange={handleRatingChange} className='rating-select'>
                <option value="">전체</option>
                {[1, 2, 3, 4, 5].map(rating => (
                    <option key={rating} value={rating}>{rating}점</option>
                ))}
            </select>
            {currentReviews.map(review => (
                <div key={review._id} className="Review">
                    <div className="reviewP">
                        <FontAwesomeIcon icon={faUser} className='reviewIcon' /> {review.username} <Rating rating={review.rating} />
                    </div>
                    <div className="reviewP">
                        <FontAwesomeIcon icon={faCalendar} className='reviewIcon' />{formatDate(review.createdAt)}
                    </div>
                    <div className="reviewP" id='Rvtitle'>
                        <FontAwesomeIcon icon={faHeading} className='reviewIcon' /> {review.title}
                    </div>
                    <div className="reviewP" id='Rvcontent'>
                        <FontAwesomeIcon icon={faAlignLeft} className='reviewIcon' />{review.content}
                    </div>
                </div>
            ))}
            {(currentReviews.length === reviewsPerPage && getSortedReviews().length > indexOfLastReview) && (
                <button onClick={handleShowMore} className='pagebtn'>다음</button>
            )}
            {currentPage > 1 && (
                <button onClick={handleShowLess} className='pagebtn'>이전</button>
            )}
            <WriteReview productId={props.productId} />
        </div>
    )
}

export default Review;
