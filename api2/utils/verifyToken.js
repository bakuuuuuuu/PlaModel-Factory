import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

export const verifyToken = (req, res, next) => {
    const token = req.headers['auth-token'];
    console.log(`verifying token: ${token}`)
    if (!token) {
        return next(createError(401, "You are not authenticated!"));
    }
    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) return next(createError(403, "Token is not valid!"));
        req.user = user;
        console.log("verify 완료 후 user 정보 : " + req.user);
    });
};

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, next);
    console.log(req.params.userId);
    next();
};

export const verifyTokenForCart = (req, res, next) => {
    const token = req.headers['auth-token'];
    console.log(`verifying token: ${token}`);
    if (!token) {
        return next(createError(401, "You are not authenticated!"));
    }
    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) return next(createError(403, "Token is not valid!"));
        req.user = user;
        console.log("verify 완료 후 user 정보 : ", req.user); // 객체를 제대로 출력하기 위해서
        next();
    });
};

// verifyUserForCart 함수
export const verifyUserForCart = (req, res, next) => {
    verifyTokenForCart(req, res, () => {
        console.log("verifyUserForCart - req.user.id: ", req.user.id);
        next();
    });
};

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next)
    if (req.user.isAdmin) {
        console.log("verifyAdmin req.user.isAdmin: true")
        next();
    } else {
        return next(createError(403, "You are not authorized!"));
    }
};