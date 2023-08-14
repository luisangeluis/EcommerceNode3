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
  .route("/my_products/:productId")
  .put(
    passport.authenticate("jwt", { session: false }),
    isAseller,
    sellerServices.updateProductBySellerId
  )
  .delete(
    passport.authenticate("jwt", { session: false }),
    isAseller,
    sellerServices.deleteProductBySellerId
  );

router
  .route("/post_a_product")
  .post(
    passport.authenticate("jwt", { session: false }),
    isAseller,
    productServices.post
  );
export default router;
