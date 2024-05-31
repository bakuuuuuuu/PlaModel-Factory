// EditReview.jsx
import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../mypage/editReview.css";
import { AuthContext } from '../../context/AuthContext';

const EditReview = () => {
    const { user } = useContext(AuthContext);
    const [reviews, setReviews] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserReviews = async () => {
            try {
                const apiUrl = process.env.REACT_APP_API_URL;
                const response = await axios.get(`${apiUrl}/reviews/user/${user._id}`);
                setReviews(response.data);
            } catch (error) {
                console.error("Failed to fetch user reviews", error);
            }
        };

        if (user) {
            fetchUserReviews();
        } else {
            navigate("/login");
        }
    }, [user, navigate]);

    return (
        <div className="edit-review-container">
            <div className='edit-review-content'>
                <h1>리뷰 관리 페이지</h1>
                {reviews.length === 0 ? (
                    <div className="review-list">
                        <div className="review-item">
                            <p>작성한 리뷰가 없습니다.</p>
                        </div>
                    </div>
                ) : (
                    <div className="review-list">
                        {reviews.map(review => (
                            <div key={review._id} className="review-item">
                                <h1>{review.productName}</h1>
                                <h2>{review.title}</h2>
                                <p>{review.content}</p>
                                <p>평점: {review.rating}</p>
                                <p>작성일: {new Date(review.createdAt).toLocaleDateString()}</p>
                                <div className="review-actions">
                                    <button className='er-edit-btn'>수정</button>
                                    <button className='er-delete-btn'>삭제</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default EditReview;
