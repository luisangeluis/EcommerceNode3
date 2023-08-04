import { Router } from "express";
import passport from "../middleware/passport.middleware";
import * as cartServices from "../services/cart.http";

const router = Router();

router.route("/").get(passport.authenticate("jwt", { session: false }), cartServices.getCartByUserId);

export default router;
