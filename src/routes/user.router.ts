import { Router } from "express";
import { Request, Response } from "express";

const router = Router();

router.route("/").post((_req: Request, res: Response) => res.send(200));
