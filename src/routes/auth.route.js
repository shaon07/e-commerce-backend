import { Router } from "express";
import { loginUser } from "../controller/users.controller.js";

const router = Router();

router.post("/user/login",loginUser)

export default router;