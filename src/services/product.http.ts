import { Request, Response } from "express";
import * as productControllers from "../controllers/product.controller";

export const getAllProducts = async (
  _req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await productControllers.readAllProducts();

    return res.status(200).json(response);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getProductById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const productId = req.params.id;
  try {
    const response = await productControllers.readProductById(productId);

    if (!response)
      return res
        .status(404)
        .json({ message: `Product with id: ${productId} doesn't exists` });

    return res.status(200).json({ response });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
