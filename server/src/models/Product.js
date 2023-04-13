import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        mainImage: String,
        topImage: String,
        backImage: String
    },
    size: [String],
},
    { timestamps: true }
)

export default mongoose.model("Product", ProductSchema)