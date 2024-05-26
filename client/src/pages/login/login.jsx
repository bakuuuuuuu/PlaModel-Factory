import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Navbar from "../../components/header/Navbar";
import "../login/login.css";

const Login = () => {
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined
    });

    const { loading, error, dispatch } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleLoginSignupClick = () => {
        navigate("/signup");
    }

    const handleClick = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });

        try {
            const apiUrl = process.env.REACT_APP_API_URL;
            const res = await axios.post(`${apiUrl}/auth/login`, credentials, { withCredentials: true });
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
            navigate("/")
        }
        catch (err) {
            dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
            alert(err.response.data.message);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="loginContainer">
                <div className="login-content">
                    <div className="util-top">
                        <div>
                            <span id="login-logo">PLAMODEL FACTORY</span>
                        </div>
                        <h1>로그인</h1>
                        <div>
                            <span id="login-desc">PLAMODEL FACTORY의 다양한 서비스와 혜택을 누리세요!</span>
                        </div>
                    </div>
                    <div className="login-form">
                        <div>
                            <input type="text" placeholder="아이디를 입력해주세요" className="login-input" id="username" onChange={handleChange}/><br></br>
                            <input type="password" placeholder="비밀번호를 입력해주세요" className="login-input" id="password" onChange={handleChange}/>
                        </div>
                        <div className="options">
                            <div>
                                <input type="checkbox" id="auto-login"/> <span id="auto-login-text">자동 로그인</span>
                            </div>
                            <div>
                                <a href="#" className="login-find">아이디 찾기</a> | <a href="#" className="login-find">비밀번호 찾기</a>
                            </div>
                        </div>
                        <button type="submit" id="login-btn" onClick={handleClick}>로그인</button>
                    </div>
                    <div className="social-login">
                        <p id="login-sns-desc">SNS계정으로 로그인하기</p>
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
                    <div className="signup">
                        <button id="login-signupbtn" onClick={handleLoginSignupClick}>아직 계정이 없으신가요? 회원가입하기</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;