import mongoose from "mongoose";
const ReviewSchema = new mongoose.Schema({
    userId: { // 작성자 ID
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    title : { // 제목
        type : String,
        required : true,
    },

    content : { // 내용
        type : String,
        required : true,
    },

    productid : { // 상품 ID
        type : String,
        required : true,
    },

    rating : { // 평점
        type : Number,
        min : 0,
        max : 5,
        default : 5,
    },

    createdAt : { // 작성날짜
        type : Date,
        default : Date.now,
    }
});

export default mongoose.model("Review", ReviewSchema);