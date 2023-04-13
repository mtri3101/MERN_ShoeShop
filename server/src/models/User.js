import mongoose, { Schema } from "mongoose"

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }]
},
    { timestamps: true }
)

export default mongoose.model("User", UserSchema)