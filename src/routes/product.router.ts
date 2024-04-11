import { Router } from "express";
import passport from "../middleware/passport.middleware";
import * as productServices from "../services/product.http";
import * as cartItemServices from "../services/cartItem.http";
import isAseller from "../middleware/isAseller.middleware";

const router = Router();

router
  .route("/")
  //CUSTOMER ROUTE
  .get(productServices.getAllProducts)
  //SELLER ROUTER
  .post(passport.authenticate("jwt", { session: false }), isAseller, productServices.post);

//CUSTOMER ROUTE
router.route("/:id/add-to-cart").post(passport.authenticate("jwt", { session: false }), cartItemServices.addToCart);

router
  .route("/:id")
  //GUEST ROUTE
  .get(productServices.getProductById)
  //SELLER ROUTE
  .put(passport.authenticate("jwt", { session: false }), isAseller, productServices.update)
  //SELLER ROUTE
  .delete(passport.authenticate("jwt", { session: false }), isAseller, productServices.deleteProductById);

export default router;
