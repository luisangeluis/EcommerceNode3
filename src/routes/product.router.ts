import { Router } from "express";
import * as productServices from "../services/product.http";
import * as cartServices from "../services/cart.http";
import passport from "../middleware/passport.middleware";

const router = Router();

router.route("/").get(productServices.getAll).post(productServices.post);

router
  .route("/:id/add-to-cart")
  .post(
    passport.authenticate("jwt", { session: false }),
    cartServices.addToCart
  );

// router.router("/my-products_as-seller").get()

router
  .route("/:id")
  .get(productServices.getById)
  .put(productServices.edit)
  .delete(productServices.remove);

export default router;
