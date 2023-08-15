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
  );

export default router;
