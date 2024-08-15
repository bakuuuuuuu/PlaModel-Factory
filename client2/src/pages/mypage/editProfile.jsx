import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../mypage/editProfile.css";
import { AuthContext } from '../../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faVenusMars, faHome, faPhone, faCamera } from '@fortawesome/free-solid-svg-icons';

const EditProfile = () => {
  const [mpData, setMpData] = useState({
    username: '',
    gender: '',
    email: '',
    address: '',
    phone: '',
    img: '',
  });

  const [newImage, setNewImage] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setMpData({
        username: user.username,
        gender: user.gender,
        email: user.email,
        address: user.address,
        phone: user.phone,
        img: user.img,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "img" && files) {
      setNewImage(files[0]);
    } else {
      setMpData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const userId = user._id;
      const updatedData = { ...mpData };

      if (newImage) {
        const formData = new FormData();
        formData.append("file", newImage);
        const uploadRes = await axios.put(`${apiUrl}/users/${userId}/profile-image`, formData, { withCredentials: true });
        updatedData.img = uploadRes.data.filePath;
      }

      const res = await axios.put(`${apiUrl}/users/${userId}`, updatedData, { withCredentials: true });
      alert("프로필이 성공적으로 업데이트되었습니다!");
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      setEditMode(false);
      console.log(user)
      navigate("/mypage");
    } catch (err) {
      console.error(err);
      alert("프로필 업데이트 중 오류가 발생했습니다.");
    }
  };

  const { username, email, gender, address, phone, img } = mpData;
  console.log(img)

  return (
    <div>
      <div className="mypage-container">
        {editMode ? (
          <div className="edit-profile-modal">
            <h2>회원정보 변경</h2>
            <div className="form-group-img">
              <FontAwesomeIcon icon={faCamera} fixedWidth className="editProfile-icon-img" />
              <input
                type="file"
                id="profilePicture"
                name="img"
                accept="image/*"
                className='editProfile-input'
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <FontAwesomeIcon icon={faUser} fixedWidth className="editProfile-icon" />
              <input
                type="text"
                id="username"
                name="username"
                className='editProfile-input'
                value={username}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <FontAwesomeIcon icon={faEnvelope} fixedWidth className="editProfile-icon" />
              <input
                type="email"
                id="email"
                name="email"
                className='editProfile-input'
                value={email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <FontAwesomeIcon icon={faVenusMars} fixedWidth className="editProfile-icon" />
              <input
                type="text"
                id="gender"
                name="gender"
                className='editProfile-input'
                value={gender}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <FontAwesomeIcon icon={faHome} fixedWidth className="editProfile-icon" />
              <input
                type="text"
                id="address"
                name="address"
                className='editProfile-input'
                value={address}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <FontAwesomeIcon icon={faPhone} fixedWidth className="editProfile-icon" />
              <input
                type="text"
                id="phone"
                name="phone"
                className='editProfile-input'
                value={phone}
                onChange={handleChange}
              />
            </div>
            <button onClick={handleSave} className="submit-btn">완료</button>
          </div>
        ) : (
          <><div className='profilev'>
            <h1>어서오세요! <span id='editProfile-username'>{username}</span>님!</h1>
            <div className="top-container">
              {img && <img src={`${process.env.REACT_APP_API_IMAGE_URL}${img}`} alt="Profile" className="profile-image" />}
            </div>
            <div className="user-info">
              <div className='user-info-detail'>
                <FontAwesomeIcon icon={faUser} fixedWidth className="signup-icon" />
                <span><strong>이름 | </strong> {username}</span>
              </div>
              <div className='user-info-detail'>
                <FontAwesomeIcon icon={faEnvelope} fixedWidth className="signup-icon" />
                <span><strong>이메일 | </strong> {email}</span>
              </div>
              <div className='user-info-detail'>
                <FontAwesomeIcon icon={faVenusMars} fixedWidth className="signup-icon" />
                <span><strong>성별 | </strong> {gender}</span>
              </div>
              <div className='user-info-detail'>
                <FontAwesomeIcon icon={faHome} fixedWidth className="signup-icon" />
                <span><strong>주소 | </strong> {address}</span>
              </div>
              <div className='user-info-detail'>
                <FontAwesomeIcon icon={faPhone} fixedWidth className="signup-icon" />
                <span><strong>전화번호 | </strong> {phone}</span>
              </div>
            </div>
            <div>
              <button onClick={handleEdit} className="edit-btn">수정</button>
            </div>
          </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EditProfile;