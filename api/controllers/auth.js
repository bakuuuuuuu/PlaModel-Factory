import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";


// 회원가입 함수
export const register = async (req, res, next) => {
    try {
        // 비밀번호 해싱을 위한 salt 생성
        // salt : 해싱 함수에서 사용되는 임의의 데이터
        const salt = bcrypt.genSaltSync(10);

        // 요청으로부터 받은 비밀번호를 해싱
        const hash = bcrypt.hashSync(req.body.password, salt);

        // 새로운 사용자 생성
        const newUser = new User({
            ...req.body, // ES6의 전개 연산자를 사용하여 'req.body' 객체의 모든 속성을 새로운 객체에 복사
            password: hash,
            img: null,
        });

        // 새로운 사용자 저장
        await newUser.save();

        // 응답 : 사용자가 생성되었음을 알리는 메시지
        res.status(200).send("회원가입이 완료되었습니다.");
    } catch (err) {
        next(err);
    }
};

// 로그인 함수
export const login = async (req, res, next) => {
    try {
        // 사용자명을 통해 사용자 찾기
        const user = await User.findOne({ username: req.body.username });

        // 사용자가 없으면 오류 처리
        if (!user) return next(createError(404, "아이디를 확인해 주세요."));

        // 비밀번호 일치 여부 확인
        const isPasswordCorrect = await bcrypt.compare(
            req.body.password,
            user.password
        );

        // 비밀번호가 일치하지 않으면 오류 처리
        if (!isPasswordCorrect)
            return next(createError(400, "비밀번호가 일치하지 않습니다."));

        // JWT 토큰 생성
        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT
        );

        // 사용자 객체에서 비밀번호와 관리자 여부를 제외한 데이터 추출
        // user._doc 실제 데이터만 포함하는 순수 JavaScript 객체
        const { password, isAdmin, ...otherDetails } = user._doc;

        // 응답 : JWT 쿠키와 사용자의 세부 정보 전송
        res
            .cookie("access_token", token, {
                httpOnly: true,
            })
            .status(200)
            .json({ details: { ...otherDetails }, isAdmin });
    } catch (err) {
        next(err);
    }
};

// 로그아웃할 때 쿠키 삭제
export const logout = (req, res) => {
    res
        .clearCookie("access_token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        })
        .status(200)
        .json({ message: "로그아웃이 완료되었습니다!" });
}