import { Router } from "express";
import passport from "../middleware/passport.middleware";
import * as productServices from "../services/product.http";
import * as cartServices from "../services/cart.http";

const router = Router();

router.route("/").get(productServices.getAll);

router
  .route("/:id/add-to-cart")
  .post(
    passport.authenticate("jwt", { session: false }),
    cartServices.addToCart
  );

router
  .route("/:id")
  .get(productServices.getById)
  .put(productServices.edit)
  .delete(productServices.remove);

export default router;
