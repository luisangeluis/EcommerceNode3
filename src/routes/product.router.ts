import { Router } from "express";
import passport from "../middleware/passport.middleware";
import isAseller from "../middleware/isAseller.middleware";
import * as productServices from "../services/product.http";
import * as cartServices from "../services/cart.http";

const router = Router();

router
  .route("/")
  .get(productServices.getAll)
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
  .put(
    passport.authenticate("jwt", { session: false }),
    isAseller,
    productServices.edit
  )
  .delete(
    passport.authenticate("jwt", { session: false }),
    isAseller,
    productServices.remove
  );

export default router;
