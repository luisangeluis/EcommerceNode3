import { Router } from "express";
import passport from "../middleware/passport.middleware";
import * as cartServices from "../services/cart.http";
import * as orderServices from "../services/order.http";

const router = Router();

router
  .route("/")
  .get(
    passport.authenticate("jwt", { session: false }),
    cartServices.getCartByUserId
  );

router
  .route("/:cartId/make-order")
  .post(passport.authenticate("jwt", { session: false }), orderServices.post);

export default router;
