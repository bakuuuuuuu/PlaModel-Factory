import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/header/Navbar";
import "../findAccount/findAccount.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPhone, faVenusMars } from '@fortawesome/free-solid-svg-icons';

const FindAccount = ({ onFindAccount }) => {
    const [foundAccount, setFoundAccount] = useState({
        username: undefined,
        gender: undefined,
        phone: undefined
    });

    const [selectedGender, setSelectedGender] = useState(null);

    const navigate = useNavigate();

    const handleLoginSignupClick = () => {
        navigate("/signup");
    };

    const handleChange = (e) => {
        setFoundAccount((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleGenderClick = (gender) => {
        setSelectedGender(gender);
        setFoundAccount((prev) => ({ ...prev, gender }));
    };

    const handleClick = async () => {
        try {
            const apiUrl = process.env.REACT_APP_API_URL;
            const res = await axios.post(`${apiUrl}/users/findAccount`, foundAccount);
            onFindAccount(); // 사용자가 계정을 찾았음을 알림
            // token 저장
            localStorage.setItem('resetToken', res.data.token);
            alert(`email : ${res.data.email}`);
            alert('비밀번호 재설정 페이지로 이동합니다.')
            navigate('/changePassword');
        }
        catch (err) {
            console.log("SignUp err : " + (err));
            alert("일치하는 사용자가 없습니다.");
        }
    };

    return (
        <div>
            <Navbar />
            <div className="findAccountContainer">
                <div className="findAccount-content">
                    <div className="util-top">
                        <div>
                            <span id="findAccount-logo">PLAMODEL FACTORY</span>
                        </div>
                        <h1>아이디 | 비밀번호 찾기</h1>
                        <div>
                            <span id="findAccount-desc">PLAMODEL FACTORY에 오신 것을 환영합니다!</span>
                        </div>
                    </div>
                    <div className="findAccount-form">
                        <div>
                            <div>
                                <FontAwesomeIcon icon={faUser} fixedWidth className="signup-icon" />
                                <input type="text" placeholder="이름 입력" className="findAccount-input" id="username" onChange={handleChange} />
                            </div>
                            <div>
                                <FontAwesomeIcon icon={faPhone} fixedWidth className="signup-icon" />
                                <input type="tel" placeholder="전화번호 입력" className="findAccount-input" id="phone" onChange={handleChange} />
                            </div>
                            <div>
                                <FontAwesomeIcon icon={faVenusMars} fixedWidth className="signup-icon" />
                                <button className="signup-gender" style={{ backgroundColor: selectedGender === '남자' ? '#ccc' : '' }} onClick={() => handleGenderClick('남자')}>남자</button>
                                <button className="signup-gender" style={{ backgroundColor: selectedGender === '여자' ? '#ccc' : '' }} onClick={() => handleGenderClick('여자')}>여자</button>
                            </div>
                        </div>
                        <button type="submit" id="findAccount-btn" onClick={handleClick}>찾기</button>
                    </div>
                    <div className="signup">
                        <button id="findAccount-signupbtn" onClick={handleLoginSignupClick}>아직 계정이 없으신가요? 회원가입하기</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FindAccount;