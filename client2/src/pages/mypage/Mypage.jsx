import "../mypage/mypage.css";
import { useContext, useState } from "react";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Menubar from "../../components/header/Menubar";
import { AuthContext } from "../../context/AuthContext";
import EditProfile from "./editProfile";
import EditReview from "./editReview";
import ReservationInquiry from "./reservationInquiry";
import AccountDelete from "./accountDelete";

const Mypage = () => {
    const { user } = useContext(AuthContext);
    const [profileComponent, setProfileComponent] = useState(1);


    const handleEditProfileClick = () => {
        setProfileComponent(1);
    };

    const handleReservationInquiryClick = () => {
        setProfileComponent(2);
    };

    const handleAccountDeleteClick = () => {
        setProfileComponent(3);
    };

    const handleEditReviewClick = () => {
        setProfileComponent(4);
    };

    return (
        <div>
            <Header />
            <Menubar/>
            <div className="mypageContainer">
                <div className="mypage-sidemenu">
                    <div className="sidemenu-top">
                        <h1 className="mypage-desc">마이페이지</h1>
                        {user.img == null ? (<div>
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaS_w-noAH9vlU-kaQmZqT45pAti-PUXN-xA&s" id="profileimg" className="mypage-profile-image"/>
                        </div>) : (<div>
                            {user.img && <img src={`${process.env.REACT_APP_API_IMAGE_URL}${user.img}`}
                                alt="Profile" className="mypage-profile-image" id="profileimg" />}
                        </div>)}
                    </div>
                    <div className="sidemenu-myshoppingInfo">
                            <h4 className="sidemenu-desc">나의 쇼핑정보</h4>
                            <li className="mypage-menu" onClick={handleReservationInquiryClick}>주문 내역</li>
                            <li className="mypage-menu" onClick={handleEditReviewClick}>리뷰 관리</li>
                    </div><br></br>
                    <div className="sidemenu-editInfo">
                            <h4 className="sidemenu-desc">개인정보관리</h4>
                            <li className="mypage-menu" onClick={handleEditProfileClick}>회원정보 변경</li>
                            <li className="mypage-menu" onClick={handleAccountDeleteClick}>회원 탈퇴</li>
                    </div>
                </div>
                <div className="mypage-content">
                    {profileComponent === 1 && <EditProfile />}
                    {profileComponent === 2 && <ReservationInquiry />}
                    {profileComponent === 3 && <AccountDelete />}
                    {profileComponent === 4 && <EditReview />}
                </div>
            </div>
            <div className="horizontalLineContainer">
                <div className="horizontal-line"></div>
                <Footer />
            </div>
        </div>
    )
}

export default Mypage;
