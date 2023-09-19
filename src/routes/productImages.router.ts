import { Router } from "express";
import passport from "../middleware/passport.middleware";
import productExistsMiddleware from "../middleware/productExists.middleware";

import * as productImages from "../services/productImages.http";

const router = Router();

router
  .route("/:id/product-image/:productImageId")
  .get(productExistsMiddleware, productImages.getAnImageByProductId);

router
  .route("/:id")
  .get(productExistsMiddleware, productImages.getAllProductImages)
  .post(
    passport.authenticate("jwt", { session: false }),
    productExistsMiddleware,
    productImages.postImageByProductId,
  );

export default router;
