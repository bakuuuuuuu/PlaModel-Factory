import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    userId: { // 사용자 id
        type: String,
        required: true,
    },
    orders: [
        {
            products: [
                {
                    productId: { // 상품 id
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "Product", // 참조하는 모델명
                        required: true,
                    },
                    quantity: { // 주문한 상품 수량
                        type: Number,
                        required: true,
                        min: 1,
                    },
                    price: { // 해당 상품 개별 가격
                        type: Number,
                        required: true,
                    }
                }
            ],
            totalAmount: { // 주문 총액
                type: Number,
                required: true,
            },
            status: { // 주문 상태
                type: String,
                default: "주문 완료",
            },
            createdAt: { // 주문 생성 일시
                type: Date,
                default: Date.now,
            },
            updatedAt: { // 주문 업데이트 일시
                type: Date,
                default: Date.now,
            }
        }
    ]
});

OrderSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

export default mongoose.model("Order", OrderSchema);
