import jwt from "jsonwebtoken";
import Review from "../models/Review.js";
import { createError } from "../utils/error.js";

// 토큰을 확인하고 사용자를 인증하는 미들웨어
export const verifyToken = (req, res, next) => {

    // 요청에서 액세스 토큰을 가져옴
    const token = req.cookies.access_token;

    // 액세스 토큰이 없는 경우, 401 Unauthorized 오류를 생성하고 다음 미들웨어로 전달
    if (!token) {
        return next(createError(401, "You are not authenticated!"));
    }

    // 토큰 검증
    jwt.verify(token, process.env.JWT, (err, user) => {

        // 토큰이 유효하지 않은 경우, 403 Forbidden 오류를 생성하고 다음 미들웨어로 전달
        if (err) return next(createError(403, "Token is not valid!"));

        // 사용자 객체를 요청에 추가
        req.user = user;
        // next();// 지워야 할 수도 있음
    });

};

// 사용자를 확인하고 요청된 작업을 인가하는 미들웨어
export const verifyUser = (req, res, next) => {

    // 토큰을 확인하고 사용자를 인증하는 verifyToken 미들웨어를 호출
    verifyToken(req, res, next);

    // 사용자가 요청된 작업을 수행할 권한이 있는지 확인(isAdmin은 관리자 권한 여부)
    if (req.user.id === req.params.id || req.user.isAdmin) {
        // 사용자가 권한이 있는 경우 다음 미들웨어로 이동
        next();
    } else {
        // 사용자 권한이 없는 경우, 403 Forbidden 오류를 생성하고 다음 미들웨어로 전달
        return next(createError(403, "You are not authorized!"));
    }
};

// 장바구니용 미들웨어
// 토큰
export const verifyTokenForCart = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) {
        return next(createError(401, "You are not authenticated!"));
    }

    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) return next(createError(403, "Token is not valid!"));

        req.user = user;
        next(); // 토큰 검증 후 다음 미들웨어로 이동
    });
};

// 유저 인증
export const verifyUserForCart = (req, res, next) => {

    // 토큰을 확인하고 사용자를 인증하는 verifyToken 미들웨어를 호출
    verifyTokenForCart(req, res, next);

    // 사용자가 요청된 작업을 수행할 권한이 있는지 확인(isAdmin은 관리자 권한 여부)
    if (req.user.id === req.params.id || req.user.isAdmin) {
        // 사용자가 권한이 있는 경우 다음 미들웨어로 이동
        next();
    } else {
        // 사용자 권한이 없는 경우, 403 Forbidden 오류를 생성하고 다음 미들웨어로 전달
        return next(createError(403, "You are not authorized!"));
    }
};

// 관리자를 확인하고 요청된 작업을 인가하는 미들웨어
export const verifyAdmin = (req, res, next) => {

    // 토큰을 확인하고 사용자를 인증하는 verifyToken 미들웨어를 호출
    verifyToken(req, res, next);

    // 사용자가 관리자인지 확인
    if (req.user.isAdmin) {
        // 사용자가 관리자인 경우 다음 미들웨어로 이동
        next();
    } else {
        // 사용자가 관리자가 아닌 경우, 403 Forbidden 오류를 생성하고 다음 미들웨어로 전달
        return next(createError(403, "You are not authorized!"));
    }

};