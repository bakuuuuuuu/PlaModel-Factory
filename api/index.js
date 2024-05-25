import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import productsRoute from "./routes/products.js";
import reviewsRoute from "./routes/reviews.js";

const app = express();
dotenv.config();

// DB 연결
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mongoDB.");
    } catch (error) {
        throw error;
    }
};

// DB 연결 해제 이벤트 핸들러
mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!");
});

// 미들웨어 설정
app.use(express.json());
// app.use(cors(corsOptions));
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// API 엔드포인트 설정
app.use("/api/auth", authRoute); 
app.use("/api/users", usersRoute); 
app.use("/api/products", productsRoute);
app.use("/api/reviews", reviewsRoute);

// 서버 시작 및 DB 연결 시도
app.listen(process.env.PORT, () => {
    connect();
    console.log("Connected to backend.");
});

// 특정 도메인만 연결
// const corsOptions = {
//     origin : "http://localhost:3000",
//     credentials: true,
// };

// 전역 오류 처리를 위한 코드
app.use((err, req, res, next) => {

    console.error("Unhandled error:", err);
    // 오류 상태 코드와 메시지를 가져옴 (기본값 : 500 Internal Server Error)
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";

    // JSON 형식으로 오류 응답을 보냄
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});
