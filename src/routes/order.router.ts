import { Router } from "express";
import passport from "../middleware/passport.middleware";
import IsACustomer from "../middleware/isACustomer.middleware";
import isASuperUser from "../middleware/isASuperUser.middleware";
import * as orderServices from "../services/order.http";

const router = Router();

//TODO CREAR AN IsACustomer.middleware
router.route("/").get(passport.authenticate("jwt", { session: false }), IsACustomer, orderServices.getOrdersByUserId);

router
  .route("/:orderId/cancel")
  .patch(passport.authenticate("jwt", { session: false }), IsACustomer, orderServices.cancelAnOrder);

router
  .route("/:orderId/finish")
  .patch(passport.authenticate("jwt", { session: false }), isASuperUser, orderServices.finishAnOrder);

router
  .route("/:orderId")
  .get(passport.authenticate("jwt", { session: false }), IsACustomer, orderServices.getOrderById);

export default router;
