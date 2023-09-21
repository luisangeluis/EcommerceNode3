import { Router } from "express";
import passport from "../middleware/passport.middleware";
import productExistsMiddleware from "../middleware/productExists.middleware";

import * as productImages from "../services/productImages.http";
import uploadImage from "../utils/uploadImage";
import isAseller from "../middleware/isAseller.middleware";

const router = Router();

router
  .route("/product-id/:id")
  .get(productExistsMiddleware, productImages.getAllProductImages)
  .post(
    passport.authenticate("jwt", { session: false }),
    isAseller,
    uploadImage,
    productImages.postImageByProductId,
  );

router
  .route("/product/:id/product-image-id/:productImageId")
  .get(productExistsMiddleware, productImages.getAnImageByProductId);

export default router;
