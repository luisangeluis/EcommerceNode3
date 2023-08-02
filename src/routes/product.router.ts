import { Router } from "express";
import * as productServices from "../services/product.http";
import * as cartServices from "../services/cart.http";
import passport from "passport";

const router = Router();

router.route("/").get(productServices.getAll).post(productServices.post);

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
