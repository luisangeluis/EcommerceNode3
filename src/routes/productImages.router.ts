import { Router } from "express";
import passport from "../middleware/passport.middleware";
import productExistsMiddleware from "../middleware/productExists.middleware";

import * as productImages from "../services/productImages.http";
import uploadImage from "../utils/uploadImage";

const router = Router();

router
  .route("/:productImageId/product/:id")
  .get(productExistsMiddleware, productImages.getAnImageByProductId);

router
  .route("/product/:id")
  .get(productExistsMiddleware, productImages.getAllProductImages)
  .post(
    passport.authenticate("jwt", { session: false }),
    productExistsMiddleware,
    uploadImage,
    productImages.postImageByProductId,
  );

export default router;
