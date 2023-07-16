import {
  readAllProducts,
  readProductById,
} from "../controllers/product.controller";
import { Request, Response } from "express";

export const getAll = async (_req: Request, res: Response): Promise<void> => {
  try {
    const response = await readAllProducts();

    res.status(200).json(response);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const response = await readProductById(id);
    response
      ? res.status(200).json(response)
      : res
          .status(404)
          .json({ message: `Product with id:${id} doesn't exist` });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const post = (req: Request, res: Response) => {
  const data = req.body;

  if (!Object.keys(data)) {
    return res.status(400).json({ message: "Missing data" });
  }

  if (!data.title || !data.description || !data.price) {
  }
};
