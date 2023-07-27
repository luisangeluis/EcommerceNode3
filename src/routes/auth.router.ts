import { Router } from "express";
import { post } from "../services/user.http";

const router = Router();

router.route("/register").post(post);

export default router;
