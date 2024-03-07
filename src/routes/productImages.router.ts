import { Router } from "express";
import passport from "../middleware/passport.middleware";
// import productExistsMiddleware from "../middleware/productExists.middleware";
import * as productImages from "../services/productImages.http";
// import uploadImage from "../utils/uploadImage";
import upload from "../utils/multer";
// import multer from "multer";
// const upload = multer({ dest: "uploads/" });

const router = Router();

router
  .route("/product/:id/product-image/:productImageId")
  .delete(passport.authenticate("jwt", { session: false }), productImages.deleteImg);

router
  .route("/product/:id")
  .post(passport.authenticate("jwt", { session: false }), upload.array("product_images", 2), productImages.postImageByProductId);

export default router;
