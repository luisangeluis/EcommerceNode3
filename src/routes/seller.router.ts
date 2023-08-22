import { Router } from "express";
import passport from "../middleware/passport.middleware";
import isAseller from "../middleware/isAseller.middleware";
import * as sellerServices from "../services/seller.http";
import * as productServices from "../services/product.http";

const router = Router();

router
  .route("/my_products")
  .get(
    passport.authenticate("jwt", { session: false }),
    isAseller,
    sellerServices.getProductsBySellerId
  );

router
  .route("/my_products/create")
  .post(
    passport.authenticate("jwt", { session: false }),
    isAseller,
    productServices.post
  );

router
  .route("/my_products/:productId")
  .get(
    passport.authenticate("jwt", { session: false }),
    isAseller,
    productServices.getById
  )
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
