import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema({
    productName: { // 상품명
        type: String,
        required: true,
    },
    category: { // 카테고리 (ex : 건담, 디지몬, 포켓몬, 헥사기어)
        type: String,
        required: true,
    },
    type: { // 종류 (ex : HG, MG, PG)(ex : Figure-Rise-Standard, Figure-Rise-Standard-Amplified)
        type: String,
        required: true,
    },
    price: { // 가격
        type: Number,
        required: true,
    },
    photos: { // 상품 사진
        type: [String],
    },
    desc: { // 상품 설명
        type: String,
        required: true,
    },
    rating: { // 상품 평점
        type: Number,
        default: 5,
        min: 0,
        max: 5,
    },
    inventory: { // 재고
        type: Number,
        required: true,
    },
    manufacturer: { // 제조사
        type: String,
        required: true,
    },
    discountedPrice: { // 할인 가격
        type: Number,
        default: 0,
    },
    isNewProduct: { //신상품 유무
        type: Boolean,
        default: false
    },
    createdAt : { // 등록날짜
        type : Date,
        default : Date.now,
    }
});
export default mongoose.model("Product", ProductSchema);