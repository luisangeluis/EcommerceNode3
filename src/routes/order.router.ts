import { Router } from "express";
// import * as orderServices from "../services/order.http";
import passport from "../middleware/passport.middleware";

const router = Router();

//TODO CREAR AN IsACustomer.middleware
router.route("/").get(passport.authenticate("jwt", { session: false }));

export default router;
