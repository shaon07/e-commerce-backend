import { Router } from "express";
import { loginUser, logOutUser, registerUser } from "../controller/users.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/user/register").post(registerUser)
router.route("/user/login").post(loginUser)
router.route("/user/logout").get(verifyJWT, logOutUser)


export default router;