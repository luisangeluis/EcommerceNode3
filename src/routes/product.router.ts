import { Router } from "express";
import passport from "../middleware/passport.middleware";
import isAseller from "../middleware/isAseller.middleware";
import * as productServices from "../services/product.http";
import * as cartServices from "../services/cart.http";

const router = Router();

router
  .route("/")
  .get(productServices.getAll)
  //Post a product as seller
  .post(
    passport.authenticate("jwt", { session: false }),
    isAseller,
    productServices.post
  );

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
