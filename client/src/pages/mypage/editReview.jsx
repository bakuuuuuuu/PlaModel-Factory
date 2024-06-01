import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../mypage/editReview.css";
import { AuthContext } from '../../context/AuthContext';
import Rating from '../../components/rating/Rating';
import Star from '../../components/star/Star';

const EditReview = () => {
    const { user } = useContext(AuthContext);
    const [reviews, setReviews] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [currentReview, setCurrentReview] = useState(null);
    const [editReviewData, setEditReviewData] = useState({ title: '', content: '', rating: 0 });
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

    const handleDelete = async (reviewId) => {
        try {
            const apiUrl = process.env.REACT_APP_API_URL;
            await axios.delete(`${apiUrl}/reviews/user/${reviewId}`);
            setReviews(reviews.filter(review => review._id !== reviewId));
            alert("리뷰가 삭제되었습니다.")
        } catch (error) {
            console.error("Failed to delete review", error);
        }
    };

    const handleEdit = (review) => {
        setCurrentReview(review);
        setEditReviewData({ title: review.title, content: review.content, rating: review.rating });
        setEditMode(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditReviewData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleRatingChange = (newRating) => {
        setEditReviewData((prevData) => ({
            ...prevData,
            rating: newRating
        }));
    };

    const handleSave = async () => {
        try {
            const apiUrl = process.env.REACT_APP_API_URL;
            await axios.put(`${apiUrl}/reviews/user/${currentReview._id}`, editReviewData);
            setReviews(reviews.map(review => 
                review._id === currentReview._id ? { ...review, ...editReviewData } : review
            ));
            setEditMode(false);
            alert("리뷰 수정이 완료되었습니다.");
        } catch (error) {
            console.error("Failed to update review", error);
        }
    };

    return (
        <div className="edit-review-container">
            <div className='edit-review-content'>
                <h1>리뷰 관리 페이지</h1>
                {editMode ? (
                    <div className="edit-review-modal">
                        <h2>리뷰 수정</h2>
                        <div className="form-group">
                            <label>제목 :&nbsp;</label>
                            <input
                                type="text"
                                name="title"
                                value={editReviewData.title}
                                onChange={handleInputChange}
                                id='edit-reivew-input-title'
                            />
                        </div>
                        <div className="form-group">
                            <label>내용 :&nbsp;</label>
                            <textarea
                                name="content"
                                value={editReviewData.content}
                                onChange={handleInputChange}
                                id='edit-reivew-input-content'
                            />
                        </div>
                        <div className="form-group">
                            <label>평점 :&nbsp;</label>
                            <div className="star-rating">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star 
                                        key={star}
                                        filled={star <= editReviewData.rating}
                                        onClick={() => handleRatingChange(star)}
                                    />
                                ))}
                            </div>
                        </div>
                        <button onClick={handleSave} className="submit-btn">저장</button>
                    </div>
                ) : (
                    <div className="review-list">
                        {reviews.length === 0 ? (
                            <div className="review-item">
                                <p>작성한 리뷰가 없습니다.</p>
                            </div>
                        ) : (
                            reviews.map(review => (
                                <div key={review._id} className="review-item">
                                    <h1>{review.productName}</h1>
                                    <h2>{review.title}</h2>
                                    <p>{review.content}</p>
                                    <Rating rating={review.rating} />
                                    <p>작성일: {new Date(review.createdAt).toLocaleDateString()}</p>
                                    <div className="review-actions">
                                        <button className='er-edit-btn' onClick={() => handleEdit(review)}>수정</button>
                                        <button className='er-delete-btn' onClick={() => handleDelete(review._id)}>삭제</button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default EditReview;
