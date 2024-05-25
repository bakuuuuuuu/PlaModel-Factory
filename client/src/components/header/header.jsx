import axios from "axios";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./header.css"

const Header = () => {

  const { user, dispatch } = useContext(AuthContext);

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
      const res = await axios.get(`${apiUrl}/auth/logout`, {withCredentials : true});
      console.log(res.data);
      dispatch({ type: "LOGOUT"});
      navigate("/login");
    }
    catch (err) {
      console.error("Logout failed : ", err);
    }
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  const handleMypageClick = () => {
    navigate("/mypage");
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo" onClick={handleHomeClick}>Moble</span>
        {user ? (
          <div className="navItems">
            <span>{user.username}님</span>
            <button className="navButton" onClick={handleMypageClick}>Mypage</button>
            <button className="navButton" onClick={handleLogoutClick}>Logout</button>
          </div>
        ) : (
          <div className="navItems">
            <button className="navButton" onClick={handleSignupClick}>Register</button>
            <button className="navButton" onClick={handleLoginClick}>Login</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;