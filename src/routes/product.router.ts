import { Router } from "express";
import passport from "../middleware/passport.middleware";
import * as productServices from "../services/product.http";
import * as cartItemServices from "../services/cartItem.http";

const router = Router();

//CUSTOMER ROUTE
router.route("/").get(productServices.getAllProducts);
router.route("/:id/add-to-cart").post(passport.authenticate("jwt", { session: false }), cartItemServices.addToCart);

//GUEST ROUTE
router.route("/:id").get(productServices.getProductById);

export default router;
