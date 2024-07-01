import { Router } from "express"
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controller/products.controller.js";

const router = Router();

router.route("/").get(getProducts).post(createProduct)
router.route("/:id").get(getProduct).patch(updateProduct).delete(deleteProduct)

export default router;