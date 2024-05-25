import express from "express";
import { login, logout, register } from "../controllers/auth.js";

// Express 라우터 생성
const router = express.Router();

// 회원가입 엔드포인트
router.post("/register", register);

// 로그인 엔드포인트
router.post("/login", login);

// 로그아웃 엔드포인트
router.get("/logout", logout);

export default router;