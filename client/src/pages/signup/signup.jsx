import axios from "axios";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Navbar from "../../components/header/Navbar";
import "../signup/signup.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope, faVenusMars, faHome, faPhone } from '@fortawesome/free-solid-svg-icons';

const Signup = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        gender: "",
        email: "",
        address: "",
        phone: "",
    });

    const [selectedGender, setSelectedGender] = useState(null);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleGenderClick = (gender) => {
        setSelectedGender(gender);
        setFormData((prev) => ({ ...prev, gender }));
    };

    const handleClick = async () => {
        try {
            const apiUrl = process.env.REACT_APP_API_URL;

            // 회원가입 요청
            const res = await axios.post(`${apiUrl}/auth/register`, formData);

            alert("회원가입이 완료되었습니다.")
            navigate("/login")
        }
        catch (err) {
            console.log("SignUp err : " + (err));
            alert("이메일 또는 전화번호가 중복되었습니다.");
        }
    }

    return (
        <div>
            <Navbar />
            <div className="signupContainer">
                <div className="signup-content">
                    <div className="util-top">
                        <div>
                            <span id="signup-logo">PLAMODEL FACTORY</span>
                        </div>
                        <h1>회원가입</h1>
                        <div>
                            <span id="signup-desc">PLAMODEL FACTORY에 오신 것을 환영합니다!</span>
                        </div>
                    </div>
                    <div className="signup-form">
                        <div>
                            <div>
                                <FontAwesomeIcon icon={faUser} fixedWidth className="signup-icon" />
                                <input type="text" placeholder="이름 입력" className="signup-input" id="username" onChange={handleChange} />
                            </div>
                            <div>
                                <FontAwesomeIcon icon={faLock} fixedWidth className="signup-icon" />
                                <input type="password" placeholder="비밀번호 입력" className="signup-input" id="password" onChange={handleChange} />
                            </div>
                            <div>
                            <FontAwesomeIcon icon={faVenusMars} fixedWidth className="signup-icon" />
                                <button className="signup-gender" style={{ backgroundColor: selectedGender === '남자' ? '#ccc' : '' }} onClick={() => handleGenderClick('남자')}>남자</button>
                                <button className="signup-gender" style={{ backgroundColor: selectedGender === '여자' ? '#ccc' : '' }} onClick={() => handleGenderClick('여자')}>여자</button>
                            </div>
                            <div>
                               <FontAwesomeIcon icon={faEnvelope} fixedWidth className="signup-icon" />
                                <input type="email" placeholder="이메일 입력" className="signup-input" id="email" onChange={handleChange} />
                            </div>
                            <div>
                                <FontAwesomeIcon icon={faHome} fixedWidth className="signup-icon" />
                                <input type="address" placeholder="주소 입력" className="signup-input" id="address" onChange={handleChange} />
                            </div>
                            <div>
                                <FontAwesomeIcon icon={faPhone} fixedWidth className="signup-icon" />
                                <input type="tel" placeholder="전화번호 입력" className="signup-input" id="phone" onChange={handleChange} />
                            </div>
                        </div>
                        <button type="submit" id="signup-btn" onClick={handleClick}>회원가입</button>
                    </div>
                    <div className="social-signup">
                        <p id="signup-sns-desc">SNS 계정으로 회원가입하기</p>
                        <div className="social-buttons">
                            <div className="snsbtn">
                                <a href="#">
                                    <img src="https://www.bnkrmall.co.kr/imgs/member/btn-naver-on.svg" alt="naver" />
                                </a>
                            </div>
                            <div className="snsbtn">
                                <a href="#">
                                    <img src="https://www.bnkrmall.co.kr/imgs/member/btn-kakao-on.svg" alt="kakao" />
                                </a>
                            </div>
                            <div className="snsbtn">
                                <a href="#">
                                    <img src="https://www.bnkrmall.co.kr/imgs/member/btn-facebook-on.svg" alt="facebook" />
                                </a>
                            </div>
                            <div className="snsbtn">
                                <a href="#">
                                    <img src="https://www.bnkrmall.co.kr/imgs/member/btn-google-on.svg" alt="google" />
                                </a>
                            </div>
                            <div>
                                <a href="#">
                                    <img src={`${process.env.PUBLIC_URL}/apple.png`} alt="apple" id="applelogo" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup;