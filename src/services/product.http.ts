import {
  createProduct,
  deleteProduct,
  readAllProducts,
  readProductById,
  updateProduct,
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

export const post = async (req: Request, res: Response) => {
  try {
    // const data = req.body;
    const { title, description, price } = req.body;

    if (!title || !description || !price) {
      return res.status(400).json({
        message: "At least these  fields must be completed",
        fields: {
          name: "string",
          description: "string",
          price: "number",
        },
      });
    }

    const response = await createProduct({ title, description, price });

    return res.status(201).json({ response });
  } catch (error: any) {
    if (error.name === "SequelizeValidationError") {
      const errors = error.errors.map((e: any) => e.message);
      return res.status(400).json({ error: errors });
    }
    return res.status(500).json({ message: error.message });
  }
};

export const edit = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const response = await updateProduct(id, data);

    if (response[0] > 0) {
      return res
        .status(200)
        .json({ message: `Product with id:${id} edited successfully` });
    }

    return res
      .status(404)
      .json({ message: `Product with id: ${id} doesn't exist` });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await deleteProduct(id);

    if (response === 0)
      return res
        .status(404)
        .json({ message: `Product with id: ${id} doesn't exist` });

    return res.status(204).json();
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
