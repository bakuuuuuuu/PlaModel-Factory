import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
    {
        username: { // 이름
            type: String,
            required: true,
            unique: true,
        },
        password: { // 비밀번호
            type: String,
            required: true,
        },
        gender: { // 성별
            type: String,
            required: true,
        },
        email: { // 이메일
            type: String,
            required: true,
            unique: true,
        },
        address: { // 주소
            type: String,
            required: true,
        },
        phone: { // 전화번호
            type: String,
            required: true,
        },
        img: { // 사진
            type: String,
            default: null,
        },
        isAdmin: { // 관리자 권한 여부
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);
export default mongoose.model("User", UserSchema);