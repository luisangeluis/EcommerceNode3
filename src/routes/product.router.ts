import { Router } from "express";
import * as productServices from "../services/product.http";

const router = Router();

router.route("/").get(productServices.getAll).post(productServices.post);

router
  .route("/:id")
  .get(productServices.getById)
  .put(productServices.edit)
  .delete(productServices.remove);

export default router;
