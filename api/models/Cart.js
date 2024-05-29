import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    userId: { // 사용자 id
        type: String,
        required: true,
    },
    products: [
        {
            productId: { // 상품 id
                type: String,
                required: true,
            },
            quantity: { // 장바구니에 담은 상품 수량
                type: Number,
                required: true,
                default: 1,
                min: 1,
            },
            price: { // 해당 상품 개별 가격
                type: Number,
                required: true,
            }
        }
    ],
    createdAt: { // 장바구니 생성 일시
        type: Date,
        default: Date.now,
    },
    updatedAt: { // 장바구니 업데이트 일시
        type: Date,
        default: Date.now,
    }
});

CartSchema.pre('save', function(next) { // 해당 훅을 사용할 때마다 장바구니 업데이트 일시를 갱신
    this.updatedAt = Date.now();
    next();
});

export default mongoose.model("Cart", CartSchema);
