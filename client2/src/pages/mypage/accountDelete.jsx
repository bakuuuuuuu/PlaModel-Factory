import axios from 'axios';
import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../mypage/accountDelete.css";
import { AuthContext } from '../../context/AuthContext';
import { faBorderNone } from '@fortawesome/free-solid-svg-icons';

const AccountDelete = () => {
    const { user, dispatch } = useContext(AuthContext);
    const [confirm, setConfirm] = useState(false);
    const [userInput, setUserInput] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUserInput(e.target.value);
    };

    const handleConfirmClick = () => {
        if (userInput === '계정을 삭제하겠습니다') {
            setConfirm(true);
            alert('확인되었습니다. 삭제 버튼을 눌러 계정을 삭제하세요.');
        } else {
            setConfirm(false);
            alert('입력한 문구가 일치하지 않습니다.');
        }
    };

    const handleDeleteClick = async () => {
        if (!confirm) {
            alert('먼저 확인 문구를 입력하고 확인 버튼을 눌러주세요.');
            return;
        }

        try {
            const apiUrl = process.env.REACT_APP_API_URL;
            await axios.delete(`${apiUrl}/users/mypage/${user._id}`, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            alert('계정이 삭제되었습니다.');
            dispatch({ type: "LOGOUT" });
            navigate('/');
        } catch (err) {
            console.error(err);
            alert('계정 삭제에 실패했습니다. 다시 시도해주세요.');
        }
    };

    const confirmButtonStyle = confirm ? { backgroundColor: '#ccc', color: 'grey' } : {};

    return (
        <div>
            <div className='AccountDelete-container'>
                <div className='AccountDelete-form'>
                    <h1>회원 탈퇴</h1>
                    <h4>회원 탈퇴를 하시려면 아래의 문구를 기입해주세요.</h4>
                    <div className='Confirm-text'>
                        <input type='text' placeholder='계정을 삭제하겠습니다' className='AccountDelete-input-element' readOnly></input>
                    </div>
                    <div className='AccountDelete-input'>
                        <input type='text' placeholder='확인 문구 입력' className='AccountDelete-input-element' id='password' onChange={handleChange}></input>
                    </div>
                    <div className='AccountDelete-btn'>
                        <button className='AccountDelete-btn-element' id='AccountDelete-btn-confirm' onClick={handleConfirmClick} disabled={confirm} style={confirmButtonStyle}>확인</button>
                        <button className='AccountDelete-btn-element' id='AccountDelete-btn-delete' onClick={handleDeleteClick}>삭제</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountDelete;