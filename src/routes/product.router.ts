import { Router } from "express";
import * as productServices from "../services/product.http";
import { Request, Response } from "express";

const router = Router();

router.route("/").get(productServices.getAll).post(productServices.post);

router
  .route("/:id/add-to-cart")
  .post((_req: Request, res: Response) => res.send("product added"));

router
  .route("/:id")
  .get(productServices.getById)
  .put(productServices.edit)
  .delete(productServices.remove);

export default router;
