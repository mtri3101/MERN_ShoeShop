import { Schema } from "mongoose"
import Order from "../models/Order.js"
import User from "../models/User.js"

export const getUser = async (req, res) => {
    try {
        const order = await Order.find({ userId: req.params.id }).populate("users",["name"])
        console.log(order)
        if (!order) return res.status(404).json("User not found")
        return res.status(200).json(order)
    } catch (err) {
        return err
    }
}