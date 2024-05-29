import axios from "axios";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignInAlt, faUserPlus, faUserCircle, faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
import "./header.css"

const Header = () => {
  const { user, dispatch, cartItemCount } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogoutClick = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const res = await axios.get(`${apiUrl}/auth/logout`, { withCredentials: true });
      console.log(res.data);
      dispatch({ type: "LOGOUT" });
      alert("로그아웃이 완료되었습니다.");
      navigate("/login");
    } catch (err) {
      console.error("Logout failed : ", err);
    }
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  const handleMypageClick = () => {
    navigate("/mypage");
  };

  const handleCartClick = () => {
    navigate("/cart");
  }

  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo" onClick={handleHomeClick}>PLAMODEL FACTORY</span>
        {user ? (
          <div className="navItems">
            <span>
              <FontAwesomeIcon icon={faUserCircle} />&nbsp;{user.username}님
            </span>
            <span className="homebtn" onClick={handleLogoutClick}>
              <FontAwesomeIcon icon={faSignInAlt} rotation={180} />&nbsp;로그아웃
            </span>
            <span className="homebtn" onClick={handleMypageClick}>
              <FontAwesomeIcon icon={faUser} />&nbsp;마이페이지
            </span>
            <span className="homebtn" id="header-right1" onClick={handleCartClick}>
              <FontAwesomeIcon icon={faCartArrowDown} />
              <span className="cartBadge">{cartItemCount}</span>
              &nbsp;<span>장바구니</span>
            </span>
          </div>
        ) : (
          <div className="navItems">
            <span onClick={handleLoginClick} className="homebtn">
              <FontAwesomeIcon icon={faSignInAlt} />&nbsp;로그인
            </span>
            <span className="homebtn" onClick={handleSignupClick} id="header-right2">
              <FontAwesomeIcon icon={faUserPlus} />&nbsp;회원가입
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
