import { Router } from "express";
import * as orderServices from "../services/order.http";

const router = Router();

router.route("/").get();

export default router;
