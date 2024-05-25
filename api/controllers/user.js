import path from 'path';
import fs from 'fs';
import User from "../models/User.js";
import { fileURLToPath } from 'url';

// ES 모듈에서 __filename과 __dirname을 사용하는 방법
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 사용자 정보를 업데이트하는 함수
export const updateUser = async (req, res, next) => {
    try {

        // 요청된 ID에 해당하는 사용자를 찾아 업데이트
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, // 업데이트할 사용자의 ID
            { $set: req.body }, // 업데이트할 내용
            { new: true } // 업데이트 후 업데이트된 사용자를 반환하도록 설정
        );

        // 업데이트된 사용자 정보를 JSON 형식으로 응답
        res.status(200).json(updatedUser);
    } catch (err) {
        next(err); // 오류 발생 시 다음 미들웨어에 오류 전달
    }
};

// 사용자를 삭제하는 함수
export const deleteUser = async (req, res, next) => {
    try {

        // 요청된 ID에 해당하는 사용자를 삭제
        await User.findByIdAndDelete(req.params.id);

        // 사용자 삭제 완료 메시지를 JSON 형식으로 응답
        res.status(200).json("User has been deleted.");
    } catch (err) {
        next(err); // 오류 발생 시 다음 미들웨어에 오류 전달
    }
};

// 특정 사용자의 정보를 가져오는 함수
export const getUser = async (req, res, next) => {
    try {

        // 요청된 ID에 해당하는 사용자를 찾아 가져옴
        const user = await User.findById(req.params.id);

        // 해당 사용자의 정보를 JSON 형식으로 응답
        res.status(200).json(user);
    } catch (err) {
        next(err); // 오류 발생 시 다음 미들웨어에 오류 전달
    }
};

// 모든 사용자의 정보를 가져오는 함수
export const getUsers = async (req, res, next) => {
    try {

        // 데이터베이스에서 모든 사용자를 찾아 가져옴
        const users = await User.find();

        // 모든 사용자의 정보를 JSON 형식으로 응답
        res.status(200).json(users);
    } catch (err) {
        next(err); // 오류 발생 시 다음 미들웨어에 오류 전달
    }
};


// export const updateProfileImage = async (req, res, next) => {
//     try {
//         const userId = req.params.id;
//         const imgPath = req.file.path.replace(/\\/g, "/");

//         if (!userId) {
//             return next(createError(400, "User ID is required"));
//         }

//         const user = await User.findById(userId);
//         if (!user) {
//             return next(createError(404, "User not found"));
//         }

//         if (user.img) {
//             const oldImage = path.join(__dirname, '../', user.img);
//             if (fs.existsSync(oldImage)) {
//                 try {
//                     fs.unlinkSync(oldImage);
//                 } catch {
//                     return next(createError(500, "이미지 삭제 오류"));
//                 }
//             }
//         }

//         user.img = `/uploads/${req.file.filename}`;
//         await user.save();
//         res.status(200).json({ message: "Profile image updated", user: { img: `uploads/${req.file.filename}` } });
//     } catch (e) {
//         next(e);
//     }
// };
