import { Router } from "express";
import passport from "../middleware/passport.middleware";
import * as orderServices from "../services/order.http";

const router = Router();

//TODO CREAR AN IsACustomer.middleware
router
  .route("/")
  .get(
    passport.authenticate("jwt", { session: false }),
    orderServices.getOrdersByUserId
  );

router
  .route("/:orderId")
  .get(
    passport.authenticate("jwt", { session: false }),
    orderServices.getOrderById
  )
  .delete();

export default router;
