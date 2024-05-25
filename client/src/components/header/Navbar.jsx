import React from "react";
import { useNavigate } from "react-router-dom";
import "../header/navbar.css";

const Navbar = () => {
    const navigate = useNavigate();

    const handleHomeClick = () => {
        navigate("/");
    };

    return (
        <div className="lnavbar">
            <div className="lnavContainer">
                <span className="llogo" onClick={handleHomeClick}>Moble</span>
            </div>
        </div>

    )
}

export default Navbar