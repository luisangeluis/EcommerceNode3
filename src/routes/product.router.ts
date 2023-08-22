import { Router } from "express";
import passport from "../middleware/passport.middleware";
import * as productServices from "../services/product.http";
import * as cartItemServices from "../services/cartItem.http";

const router = Router();

router.route("/").get(productServices.getAll);

router
  .route("/:id/add-to-cart")
  .post(
    passport.authenticate("jwt", { session: false }),
    cartItemServices.addToCart
  );

router.route("/:id").get(productServices.getById);

export default router;
