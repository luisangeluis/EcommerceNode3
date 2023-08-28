import { Router } from "express";
import passport from "../middleware/passport.middleware";
import * as cartItemServices from "../services/cartItem.http";

const router = Router();

router
  .route("/:cartItemId")
  .get(
    passport.authenticate("jwt", { session: false }),
    cartItemServices.getCartItem
  )
  .delete(
    passport.authenticate("jwt", { session: false }),
    cartItemServices.removeCartItem
  );

export default router;
