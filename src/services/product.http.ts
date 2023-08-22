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
      : res.status(404).send(`Product with id:${id} doesn't exist`);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
