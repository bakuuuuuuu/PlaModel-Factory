import express from "express";
import {
    updateUser,
    deleteUser,
    getUser,
    getUsers,
    // updateProfileImage
} from "../controllers/user.js"; // 사용자 관련 컨트롤러 함수 가져옴.
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
// import upload from "../utils/upload.js";

const router = express.Router();

// UPDATE 라우트
router.put("/:id", verifyUser, updateUser);

// Profile Image Update 라우트
// router.put("/:id/profile-image", verifyUser, upload.single('file'), updateProfileImage);

// DELETE 라우트
router.delete("/:id", verifyUser, deleteUser);

// GET 라우트
router.get("/:id", verifyUser, getUser); 

// GET ALL 라우트
router.get("/", verifyAdmin, getUsers); 

export default router; 
