import { Router } from "express";
import { loginUser, registerUser } from "../controller/users.controller.js";

const router = Router();

router.route("/user/register").post(registerUser)
router.route("/user/login").post(loginUser)

export default router;