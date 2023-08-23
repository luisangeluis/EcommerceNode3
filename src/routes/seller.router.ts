import { Router } from "express";
import passport from "../middleware/passport.middleware";
import isAseller from "../middleware/isAseller.middleware";
import * as sellerServices from "../services/seller.http";

const router = Router();

router
  .route("/my_products")
  .get(
    passport.authenticate("jwt", { session: false }),
    isAseller,
    sellerServices.getProductsBySellerId
  )
  .post(
    passport.authenticate("jwt", { session: false }),
    isAseller,
    sellerServices.postProductAsSeller
  );

router
  .route("/my_products/:productId")
  .get(
    passport.authenticate("jwt", { session: false }),
    isAseller,
    sellerServices.getProductAsSellerById
  )
  .put(
    passport.authenticate("jwt", { session: false }),
    isAseller,
    sellerServices.updateProductAsSeller
  )
  .delete(
    passport.authenticate("jwt", { session: false }),
    isAseller,
    sellerServices.removeProductAsSeller
  );

export default router;
