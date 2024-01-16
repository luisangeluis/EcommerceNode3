import { Router } from "express";
import passport from "../middleware/passport.middleware";
import isAseller from "../middleware/isAseller.middleware";
import * as sellerProductsServices from "../services/sellerProducts.http";

const router = Router();

router.route("/").get(passport.authenticate("jwt", { session: false }), isAseller, sellerProductsServices.getAllProducts);
router.route("/:productId").get(passport.authenticate("jwt", { session: false }), isAseller, sellerProductsServices.getProductById);

export default router;
