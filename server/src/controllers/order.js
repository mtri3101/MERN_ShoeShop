import Order from "../models/Order.js"
import Product from "../models/Product.js"
import User from "../models/User.js"

export const placeOrder = async (req, res) => {
    const order = new Order(req.body)
    order.userId = req.params.id
    order.productId = req.body.productId
    order.image = req.body.image
    order.size = req.body.size
    order.quantity = req.body.quantity
    order.price = req.body.price
    const user = await User.findOne({ _id: order.userId })
    if (!user) return res.status(404).json("User not found")
    const product = await Product.findOne({ _id: order.productId })
    if (!product) return res.status(404).json("User not found")
    const orderSaved = await order.save()
    try {
        res.status(200).json({ orderSaved })
    } catch (err) {
        console.log(err)
    }
}

