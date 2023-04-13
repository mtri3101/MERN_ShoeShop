import express from "express"
import { addProduct, getProductDetail, getProducts } from "../controllers/products.js"

const router = express.Router()

router.post("/", addProduct)
router.get("/", getProducts)
router.get("/:id", getProductDetail)

export default router