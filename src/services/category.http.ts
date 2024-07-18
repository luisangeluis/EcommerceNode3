import { Request, Response } from "express";
import catchErrors from "../utils/catchErrors";
import * as categoryControllers from "../controllers/category.controller";

export const getAll = async (_req: Request, res: Response) => {
  try {
    const data = await categoryControllers.getAllCategories();

    return res.status(200).json({ data });
  } catch (error) {
    const customError = catchErrors(error);
    return res.status(customError.status).json({ message: customError.error });
  }
};
