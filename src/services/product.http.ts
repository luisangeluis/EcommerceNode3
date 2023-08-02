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
      : res.status(404).send(`Product with id:${id} doesn't exist`);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const post = async (req: Request, res: Response) => {
  try {
    // const data = req.body;
    const { title, description, price, categoryId } = req.body;

    if (!title || !description || !price || !categoryId) {
      return res.status(400).json({
        message: "At least these  fields must be completed",
        fields: {
          name: "string",
          description: "string",
          price: "number",
          categoryId: "string",
        },
      });
    }

    const response = await createProduct({
      title,
      description,
      price,
      categoryId,
    });

    return res.status(201).json({ response });
  } catch (error: any) {
    if (error.name === "SequelizeForeignKeyConstraintError") {
      return res.status(400).json({ error: error.message });
    } else if (error.name === "SequelizeValidationError") {
      const errors = error.errors.map((e: any) => e.message);
      return res.status(400).json({ error: errors });
    }
    return res.status(500).json({ message: error.message });
  }
};

export const edit = async (req: Request, res: Response): Promise<Response> => {
  try {
    const productId = req.params.id;
    const data = req.body;
    const { id, ...restOfData } = data;

    if (!Object.keys(restOfData).length)
      return res.status(400).send("Missing data");

    if (
      !restOfData.title &&
      !restOfData.description &&
      !restOfData.price &&
      !restOfData.categoryId
    ) {
      return res.status(400).json({
        message: "At least any these  fields must be completed",
        fields: {
          name: "string",
          description: "string",
          price: "number",
          categoryId: "string",
        },
      });
    }

    const response = await updateProduct(productId, data);

    if (response[0] > 0) {
      return res
        .status(200)
        .json({ message: `Product with id:${id} edited successfully` });
    }

    return res
      .status(404)
      .json({ message: `Product with id: ${id} doesn't exist` });
  } catch (error: any) {
    if (error.name === "SequelizeForeignKeyConstraintError") {
      return res.status(400).json({ error: error.message });
    } else if (error.name === "SequelizeValidationError") {
      const errors = error.errors.map((e: any) => e.message);
      return res.status(400).json({ error: errors });
    }
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
