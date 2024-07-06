import { Router } from "express";
import { deleteUser, getUser, getUsers, updateUser } from "../controller/users.controller.js";

const router = Router();

router.route("/").get(getUsers)
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser)

export default router;