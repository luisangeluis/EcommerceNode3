import { Router } from "express";
import passport from "../middleware/passport.middleware";
import IsACustomer from "../middleware/isACustomer.middleware";
import * as cartServices from "../services/cart.http";
import * as orderServices from "../services/order.http";

const router = Router();

router.route("/").get(passport.authenticate("jwt", { session: false }), IsACustomer, cartServices.getCartByUserId);
router.route("/make-order").post(passport.authenticate("jwt", { session: false }), orderServices.post);

export default router;
