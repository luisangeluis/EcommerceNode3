import { Router } from "express";
import passport from "../middleware/passport.middleware";
import IsACustomer from "../middleware/isACustomer.middleware";
// import isASuperUser from "../middleware/isASuperUser.middleware";
import * as orderServices from "../services/order.http";

const router = Router();

//Get Orders by userId
router.route("/").get(passport.authenticate("jwt", { session: false }), IsACustomer, orderServices.getOrdersByUserId);

//Pay an order
router.route("/:orderId/pay").patch(passport.authenticate("jwt", { session: false }), orderServices.payAnOrder);

//Cancel an order
router.route("/:orderId/cancel").patch(passport.authenticate("jwt", { session: false }), orderServices.cancelAnOrder);

//Get Order by userId
router.route("/:orderId").get(passport.authenticate("jwt", { session: false }), orderServices.getOrderById);

export default router;
