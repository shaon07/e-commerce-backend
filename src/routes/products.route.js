import { Router } from "express"
import { createProduct, getProduct, getProducts, updateProduct } from "../controller/products.controller.js";

const router = Router();

router.route("/").get(getProducts).post(createProduct)
router.route("/:id").get(getProduct).patch(updateProduct)

export default router;