// import { Router } from "express";
// import passport from "../middleware/passport.middleware";
// import isAseller from "../middleware/isAseller.middleware";
// import * as sellerProductsServices from "../services/sellerProducts.http";

// const router = Router();

// router
//   .route("/")
//   .get(passport.authenticate("jwt", { session: false }), isAseller, sellerProductsServices.getAllProducts)
//   .post(passport.authenticate("jwt", { session: false }), isAseller, sellerProductsServices.post);

// router
//   .route("/:productId")
//   .get(passport.authenticate("jwt", { session: false }), isAseller, sellerProductsServices.getProductById)
//   .put(passport.authenticate("jwt", { session: false }), isAseller, sellerProductsServices.updateProductById)
//   .delete(passport.authenticate("jwt", { session: false }), isAseller, sellerProductsServices.deleteProductById);

// export default router;
