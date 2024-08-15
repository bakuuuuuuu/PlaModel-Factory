import express from 'express';
import {
    getAllUsers, 
    getUser, 
    updateUser, 
    updateProfileImage, 
    deleteUser, 
    getUserByDetails, 
    changePassword
} from "../controllers/userController.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// 모든 사용자 정보 가져오기
router.get('/', verifyAdmin, getAllUsers);

// 특정 사용자 정보 가져오기
router.get('/:id', verifyUser, getUser);

// 특정 사용자 정보 업데이트
router.put('/:id', verifyUser, updateUser);

// 특정 사용자 삭제
router.delete('/:id', verifyUser, deleteUser);


//아래는 수정 필요

// 회원 정보 수정(이미지)
// router.put('/:id/profile-image', upload.single('image'), updateProfileImage);

// 계정 찾기
router.post('/find', getUserByDetails);

// 비밀번호 재설정
router.post('/change-password', changePassword);

export default router;