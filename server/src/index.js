import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoute from "./routes/auth.js"
import orderRoute from "./routes/order.js"
import productRoute from "./routes/products.js"
import userRoute from "./routes/user.js"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true)
    next()
})
dotenv.config()
app.use(cors({
    origin: "http://localhost:3000"
}
))
app.use(cookieParser())
app.use(express.json());

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("connected mongodb")
    } catch (error) {
        handleError(error);
    }
}

app.use("/api/auth", authRoute)
app.use("/api/products", productRoute)
app.use("/api/order", orderRoute)
app.use("/api/users", userRoute)



app.listen(8800, () => {
    connect()
    console.log("Connected to server")
})