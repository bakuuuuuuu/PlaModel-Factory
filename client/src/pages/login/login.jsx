import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/header/Navbar";
import "../login/login.css";

const Login = () => {
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined
    });

    const {loading, error, dispatch} = useContext(AuthContext);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials((prev) => ({...prev, [e.target.id] : e.target.value}));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        dispatch({type : "LOGIN_START"});

        try {
            const apiUrl = process.env.REACT_APP_API_URL;
            const res = await axios.post(`${apiUrl}/auth/login`, credentials, {withCredentials: true});
            dispatch({type : "LOGIN_SUCCESS", payload:res.data.details});
            navigate("/")
        }
        catch (err){
            dispatch({type : "LOGIN_FAILURE", payload:err.response.data});
        }
    };

    return (
        <div>
            <Navbar />
            <div className="loginContainer">
                <h1>LogIn</h1>
                <div className="logininput">
                    <input type="text" placeholder="Name" className="Linput" id="username" name="Lname" onChange={handleChange}></input>
                    <input type="password" placeholder="Password" className="Linput" id="password" name="Lpassword" onChange={handleChange}></input>
                </div>
                <button className="login" onClick={handleClick}>LogIn</button>
                {error && <span>{error.message}</span>}
                <div className="horizontal-line"></div>
                <Footer />
            </div>
        </div>
    )
}

export default Login;