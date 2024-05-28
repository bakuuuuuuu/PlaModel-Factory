import axios from "axios";
import React, { useContext, useState } from 'react';
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./review.css";
import Star from "../star/Star";

const WriteReview = ({ productId }) => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [reviewData, setReviewData] = useState({
        username: user ? user.username : "",
        title: "",
        content: "",
        productid: productId,
        rating: 0,
    });

    const [rating, setRating] = useState(0);

    const handleStarClick = (index) => {
        if (!user) {
            alert("리뷰를 작성하려면 로그인이 필요합니다.");
            navigate("/login");
            return;
        }
        setRating(index + 1);
        setReviewData((prev) => ({ ...prev, rating: index + 1 })); // rating 설정
    };

    const handleChange = (e) => {
        if (!user) {
            alert("리뷰를 작성하려면 로그인이 필요합니다.");
            navigate("/login");
            return;
        }
        setReviewData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleWriteClick = async () => {
        if (!user) {
            alert("리뷰를 작성하려면 로그인이 필요합니다.");
            navigate("/login");
            return;
        }
        try {
            const apiUrl = process.env.REACT_APP_API_URL;
            console.log(reviewData);
            const res = await axios.post(`${apiUrl}/reviews/create`, reviewData);

            setReviewData({
                username: user.username,
                title: "",
                content: "",
                productid: productId,
                rating: 0,
            });

            alert("리뷰 작성이 완료되었습니다!");
            window.location.reload();
        }
        catch (err) {
            alert("리뷰 작성 실패!");
            console.log("Write Review err : " + err);
        }
    }

    return (
        <div className="WriteReviews">
            <h2>리뷰 작성</h2>
            <input type="text" placeholder="제목 (최대 50자)" className="Wreivew" name="title" id="WRtitle" onChange={handleChange} maxLength={50} /><br />
            <div className="star-rating">
                {[...Array(5)].map((_, index) => (
                    <Star
                        key={index}
                        filled={index < rating}
                        onClick={() => handleStarClick(index)}
                    />
                ))}
            </div>
            <textarea placeholder="내용 (최대 400자)" className="Wreivew" id="WRcontent" name="content" onChange={handleChange} maxLength={400}></textarea><br />
            <button id="WRbtn" onClick={handleWriteClick}>작성</button>
        </div>
    );
};

export default WriteReview;
