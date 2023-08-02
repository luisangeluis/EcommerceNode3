import { Router } from "express";
import { post } from "../services/user.http";
// import passport from "../middleware/passport.middleware";
import * as authServices from "../services/auth.http";

const router = Router();

router.route("/login").post(
  // passport.authenticate("jwt", { session: false }),
  authServices.loginUser
);
router.route("/register").post(post);

export default router;
