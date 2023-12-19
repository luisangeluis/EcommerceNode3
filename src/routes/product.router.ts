import { Router } from "express";
import passport from "../middleware/passport.middleware";
import * as productServices from "../services/product.http";
import * as cartItemServices from "../services/cartItem.http";
import isAseller from "../middleware/isAseller.middleware";

const router = Router();

router.route("/").get(productServices.getAllProducts);

//SELLER ROUTES
router
  .route("/seller")
  .get()
  .post(
    passport.authenticate("jwt", { session: false }),
    isAseller,
    productServices.post,
  );

router
  .route("/seller/:productId")
  .get()
  .put(
    passport.authenticate("jwt", { session: false }),
    isAseller,
    productServices.updateProductById,
  )
  .delete();

router
  .route("/:id/add-to-cart")
  .post(
    passport.authenticate("jwt", { session: false }),
    cartItemServices.addToCart,
  );

router.route("/:id").get(productServices.getProductById);

export default router;
