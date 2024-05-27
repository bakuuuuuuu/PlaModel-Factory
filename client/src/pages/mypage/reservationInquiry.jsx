import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../mypage/reservationInquiry.css";
import { AuthContext } from '../../context/AuthContext';

const ReservationInquiry = () => {

    return (
        <h1>주문 내역 화면입니다!</h1>
    );
};

export default ReservationInquiry;