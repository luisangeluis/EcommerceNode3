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
  .patch();

export default router;
