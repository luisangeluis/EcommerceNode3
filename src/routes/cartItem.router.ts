import { Router } from "express";
import passport from "../middleware/passport.middleware";
import * as cartItemServices from "../services/cartItem.http";
import IsACustomer from "../middleware/isACustomer.middleware";

const router = Router();

router
  .route("/:cartItemId")
  // .get(passport.authenticate("jwt", { session: false }), cartItemServices.getCartItem)
  .patch(passport.authenticate("jwt", { session: false }), IsACustomer, cartItemServices.updateQuantityFromCartItem)
  .delete(passport.authenticate("jwt", { session: false }), cartItemServices.removeCartItem);

export default router;
