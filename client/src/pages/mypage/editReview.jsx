import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../mypage/editReview.css";
import { AuthContext } from '../../context/AuthContext';

const EditReview = () => {

    return (
        <h1>리뷰 관리 화면입니다!</h1>
    );
};

export default EditReview;