import jwt from "jsonwebtoken"
import Product from "../models/Product.js"

export const addProduct = async (req, res) => {
    const token = req.cookies.accessToken
    if (!token) return res.status(401).json("You are not authenticate")
    jwt.verify(token, process.env.SECRET_KEY, async (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid")
        if (!userInfo.isAdmin) return res.status(403).json("Only admin can do this")
        const newProduct = new Product(req.body);
        try {
            const savedProduct = await newProduct.save()
            res.status(200).json(savedProduct)
        } catch (err) {
            console.log(err)
        }
    })
}

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find().sort('-createdAt').limit(req.query.limit);
        res.status(200).json(products)
    } catch (err) {
        console.log(err)
    }
}

export const getProductDetail = async (req, res) => {
    try {
        const product = await Product.findOne({ _id: req.params.id })
        if (!product) return res.status(404).json("Product not found!")
        res.status(200).json(product)
    } catch (err) {
        console.log(err)
    }
}