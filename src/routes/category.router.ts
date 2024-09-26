import { Router } from "express";
import * as categoryServices from "../services/category.http";

const router = Router();

router.route("/").get(categoryServices.getAll);

export default router;
