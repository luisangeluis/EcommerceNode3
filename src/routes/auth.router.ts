import { Router } from "express";
import { post } from "../services/user.http";
import * as authServices from "../services/auth.http";

const router = Router();

router.route("/login").post(authServices.loginUser);
router.route("/register").post(post);

export default router;
