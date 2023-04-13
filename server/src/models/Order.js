import mongoose, { Schema } from "mongoose";

const OrderSchema = mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    productId: {
        type: String,
        ref: "Product"
    },
    image: {
        type: String
    },
    size: [String],
    quantity: {
        type: Number
    },
    price: {
        type: Number
    }
},
    { timestamps: true }
)

export default mongoose.model("Order", OrderSchema)