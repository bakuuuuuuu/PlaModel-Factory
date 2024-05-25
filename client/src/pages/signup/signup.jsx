import axios from "axios";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/header/Navbar";
import "../signup/signup.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope, faGlobe, faMapMarkerAlt, faPhone } from '@fortawesome/free-solid-svg-icons';

const Signup = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: "",
        country: "",
        city: "",
        phone: "",
        image: null
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData((prev) => ({...prev, [e.target.id] : e.target.value}));
    };

    const handleClick = async () => {
        try {
            const apiUrl = process.env.REACT_APP_API_URL;
            const res = await axios.post(`${apiUrl}/auth/register`, formData);
            navigate("/login")
        }
        catch (err) {
            console.log("SignUp err : " + (err));
        }
    }

    return (
        <div>
            <Navbar/>
            <div className="signupContanier">
                <h1 id="suh1">Sign Up</h1>
                <div className="signinput">
                    <div className="inputWithIcon">
                        <FontAwesomeIcon icon={faUser} className="inputIcon" size="1x"/>
                        <input type="text" placeholder="Name" className="Sinput" name="Sname" id="username" onChange={handleChange}></input>
                    </div>
                    <div className="inputWithIcon">
                        <FontAwesomeIcon icon={faLock} className="inputIcon"  size="1x"/>
                        <input type="password" placeholder="Password" className="Sinput" name="Spassword" id="password" onChange={handleChange}></input>
                    </div>
                    <div className="inputWithIcon">
                        <FontAwesomeIcon icon={faEnvelope} className="inputIcon"  size="1x"/>
                        <input type="mail" placeholder="Email" className="Sinput" name="Semail" id="email" onChange={handleChange}></input>
                    </div>
                    <div className="inputWithIcon">
                        <FontAwesomeIcon icon={faGlobe} className="inputIcon"  size="1x"/>
                        <input type="text" placeholder="Country" className="Sinput" name="Scountry" id="country" onChange={handleChange}></input>
                    </div>
                    <div className="inputWithIcon">
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="inputIcon"  size="1x"/>
                        <input type="text" placeholder="Address" className="Sinput" name="Saddress" id="city" onChange={handleChange}></input>
                    </div>
                    <div className="inputWithIcon">
                        <FontAwesomeIcon icon={faPhone} className="inputIcon"  size="1x"/>
                        <input type="tel" placeholder="Phone" className="Sinput" name="Sphone" id="phone" onChange={handleChange}></input>
                    </div>
                </div>
                <button className="Signup" onClick={handleClick}>Sign Up</button>
                <div className="horizontal-line"></div>
                <Footer/>
            </div>
        </div>
    )
}

export default Signup;