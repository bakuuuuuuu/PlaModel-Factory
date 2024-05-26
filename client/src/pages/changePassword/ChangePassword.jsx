import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/header/Navbar";
import "../changePassword/changePassword.css";

const ChangePassword = () => {
    const [changePassword, setChangePassword] = useState({
        email: "",
        password: "",
        passwordConfirm: ""
    });

    const [passwordConfirm, setPasswordConfirm] = useState(false);

    const navigate = useNavigate();

    const passwordConfirmClick = () => { // 재설정할 비밀번호 입력과 재설정할 비밀번호 재입력이 일치하면 passwordConfirm를 true로 변경
        if (changePassword.password === changePassword.passwordConfirm) {
            setPasswordConfirm(true);
            alert("비밀번호가 일치합니다.");
        } else {
            setPasswordConfirm(false);
            alert("비밀번호가 일치하지 않습니다.");
        }
    };

    const handleChange = (e) => {
        setChangePassword((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleChangePasswordClick = async () => { //성공시에만 해당 사용자의 비밀번호를 변경하고 /login으로 이동(passwordConfirm가 true일 때만 진행가능)
        if (passwordConfirm) {
            try {
                const apiUrl = process.env.REACT_APP_API_URL;
                const token = localStorage.getItem('resetToken');
                const res = await axios.put(`${apiUrl}/users/changePassword`, {
                    email: changePassword.email,
                    password: changePassword.password,
                    token
                });
                alert("비밀번호가 성공적으로 변경되었습니다.");
                navigate("/login");
            } catch (err) {
                console.error("비밀번호 변경 오류: ", err);
                alert("비밀번호 변경 중 오류가 발생했습니다.");
            }
        } else {
            alert("비밀번호 확인이 필요합니다.");
        }
    };

    return (
        <div>
            <Navbar />
            <div className="changePasswordContainer">
                <div className="changePassword-content">
                    <div className="util-top">
                        <div>
                            <span id="changePassword-logo">PLAMODEL FACTORY</span>
                        </div>
                        <h1>비밀번호 재설정</h1>
                        <div>
                            <span id="changePassword-desc">PLAMODEL FACTORY에 오신 것을 환영합니다!</span>
                        </div>
                    </div>
                    <div className="changePassword-form">
                        <div>
                            <div>
                                <input type="email" placeholder="이메일 입력" className="changePassword-input" id="email" onChange={handleChange} />
                            </div>
                            <div>
                                <input type="password" placeholder="재설정할 비밀번호 입력" className="changePassword-input" id="password" onChange={handleChange} />
                            </div>
                            <div>
                                <input type="password" placeholder="재설정할 비밀번호 재입력" className="changePassword-input" id="passwordConfirm" onChange={handleChange} />
                            </div>
                        </div>
                        <div>
                            <button id="passwordConfirm-btn" onClick={passwordConfirmClick}>비밀번호 확인</button>
                        </div>
                        <div>
                            <button type="submit" id="changePassword-btn" onClick={handleChangePasswordClick}>완료</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;