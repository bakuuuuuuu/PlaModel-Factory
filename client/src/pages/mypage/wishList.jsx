import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../mypage/reservationInquiry.css";
import { AuthContext } from '../../context/AuthContext';

const WishList = () => {

    return (
        <h1>위시 리스트 화면입니다!</h1>
    );
};

export default WishList;