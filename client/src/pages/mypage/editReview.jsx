import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../mypage/editReview.css";
import { AuthContext } from '../../context/AuthContext';

const EditReview = () => {
    const [reviews, setReviews] = useState([]);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserReviews = async () => {
            if (!user) {
                navigate("/login");
                return;
            }

            try {
                const apiUrl = process.env.REACT_APP_API_URL;
                const response = await axios.get(`${apiUrl}/user`, { withCredentials: true });
                setReviews(response.data);
            } catch (error) {
                console.error("Failed to fetch user reviews", error);
            }
        };

        fetchUserReviews();
    }, [user, navigate]);

    const handleEdit = (reviewId) => {
        navigate(`/edit-review/${reviewId}`);
    };

    const handleDelete = async (reviewId) => {
        try {
            const apiUrl = process.env.REACT_APP_API_URL;
            await axios.delete(`${apiUrl}/reviews/${reviewId}`);
            setReviews(reviews.filter(review => review._id !== reviewId));
        } catch (error) {
            console.error("Failed to delete review", error);
        }
    };

    if (!user) {
        return <p>로그인이 필요합니다.</p>;
    }

    return (
        <div className="edit-review-container">
            <h1>리뷰 관리</h1>
            <div className="review-list">
                {reviews.length === 0 ? (
                    <p>작성한 리뷰가 없습니다.</p>
                ) : (
                    reviews.map(review => (
                        <div key={review._id} className="review-item">
                            <h3>{review.title}</h3>
                            <p>{review.content}</p>
                            <p>평점: {review.rating}</p>
                            <button onClick={() => handleEdit(review._id)}>수정</button>
                            <button onClick={() => handleDelete(review._id)}>삭제</button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default EditReview;
