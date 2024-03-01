import { Router } from "express";
import passport from "../middleware/passport.middleware";
import productExistsMiddleware from "../middleware/productExists.middleware";
import * as productImages from "../services/productImages.http";
// import uploadImage from "../utils/uploadImage";
import upload from "../utils/multer";
// import multer from "multer";
// const upload = multer({ dest: "uploads/" });

const router = Router();

router.route("/product/:id/product-image/:productImageId").get(productExistsMiddleware, productImages.getAnImageByProductId);
// .delete(
//   passport.authenticate("jwt", { session: false }),
//   productImages.deleteImg,
// );

router
  .route("/product/:id")
  .get(productExistsMiddleware, productImages.getAllProductImages)
  // .post(passport.authenticate("jwt", { session: false }), uploadImage, productImages.postImageByProductId);
  .post(passport.authenticate("jwt", { session: false }), upload.single("product_images"), productImages.postImageByProductId);

export default router;
