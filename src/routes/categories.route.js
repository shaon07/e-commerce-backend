import { Router } from "express";
import { createCategory, deleteCategory, getCategories, getCategory, updateCategory } from "../controller/categories.controller.js";

const router = Router();

router.route("/").get(getCategories).post(createCategory)
router.route("/:id").get(getCategory).patch(updateCategory).delete(deleteCategory)


export default router;