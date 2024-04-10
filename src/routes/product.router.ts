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
  //SELLER ROUTER
  .put(passport.authenticate("jwt", { session: false }), productServices.update);

export default router;
