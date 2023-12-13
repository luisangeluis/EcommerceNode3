import { Request, Response } from "express";
import type { UserTokenAttributes } from "../types";
import catchErrors from "../utils/catchErrors";
import * as productControllers from "../controllers/product.controller";

export const getAllProducts = async (
  _req: Request,
  res: Response,
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
  res: Response,
): Promise<Response> => {
  try {
    const productId = req.params.id;
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

export const post = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = (req.user as UserTokenAttributes)?.id;
    const data = req.body;

    if (!Object.keys(data).length)
      return res.status(400).json({ message: "Missing data" });

    if (
      !data.title ||
      !data.description ||
      !data.price ||
      !data.categoryId ||
      data.status === "deleted"
    ) {
      return res.status(400).json({
        message: "At least these  fields must be completed",
        fields: {
          title: "string",
          description: "string",
          price: "number",
          status: "active/inactive - optional value -",
          categoryId: "string",
        },
      });
    }

    if (typeof data.price !== "number")
      return res
        .status(400)
        .json({ message: "Price property must be a number" });

    const newProduct = {
      title: data.title,
      description: data.description,
      price: data.price,
      status: data.status,
      categoryId: data.categoryId,
      sellerId: userId,
    };

    const response = await productControllers.createProduct(newProduct);

    return res.status(201).json({ response });
  } catch (error: any) {
    // return res.status(500).json({ message: error.message });
    // return catchErrors(error);
    const customError = catchErrors(error);
    return res.status(customError.status).json({ message: customError.error });
  }
};
