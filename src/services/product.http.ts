import { Request, Response } from "express";
import type { UserTokenAttributes } from "../types";
import catchErrors from "../utils/catchErrors";
import * as productControllers from "../controllers/product.controller";
import { ProductStatusEnum } from "../utils/Enums";

//Get all products
export const getAllProducts = async (req: Request, res: Response): Promise<Response> => {
  try {
    const queries = req.query;
    const { totalResults, response, currentPage, totalPages } =
      Object.keys(queries).length === 0 ? await productControllers.readAllProducts() : await productControllers.readAllProducts(queries);

    return res.status(200).json({
      totalResults,
      totalPages,
      currentPage,
      response
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getProductById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const productId = req.params.id;
    const response = await productControllers.readProductById(productId);

    if (!response) return res.status(404).json({ message: `Product with id: ${productId} doesn't exists` });

    return res.status(200).json({ response });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const post = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = (req.user as UserTokenAttributes)?.id;
    const data = req.body;

    if (!Object.keys(data).length) return res.status(400).json({ message: "Missing data" });

    if (!data.title || !data.description || !data.price || !data.categoryId || data.status === "deleted") {
      return res.status(400).json({
        message: "At least these  fields must be completed",
        fields: {
          title: "string",
          description: "string",
          price: "number",
          status: "active/inactive - optional value -",
          categoryId: "string"
        }
      });
    }

    if (typeof data.price !== "number") return res.status(400).json({ message: "Price property must be a number" });

    const newProduct = {
      title: data.title,
      description: data.description,
      price: data.price,
      status: data.status,
      categoryId: data.categoryId,
      sellerId: userId
    };

    const response = await productControllers.createProduct(newProduct);

    return res.status(201).json({ response });
  } catch (error: any) {
    const customError = catchErrors(error);
    return res.status(customError.status).json({ message: customError.error });
  }
};

export const updateProductById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = (req.user as UserTokenAttributes).id;
    const productId = req.params.productId;
    const data = req.body;
    const status = ["active", "inactive"];
    const { id, sellerId, ...restOfData } = data;

    if (Object.keys(restOfData).length === 0) return res.status(400).json({ message: "Missing data" });

    if (restOfData.status) {
      const statusIndex = status.indexOf(restOfData.status);

      if (statusIndex < 0)
        return res.status(400).json({
          message: "Status must contain a valid value: active or inactive"
        });
    }

    const response = await productControllers.updateAProductBySellerId(userId, productId, restOfData);

    if (!response[0]) return res.status(404).json({ message: `Product with id: ${productId} doesn't exists` });

    return res.status(200).json({ message: `Product with id:${productId} successfully edited` });
  } catch (error: any) {
    const customError = catchErrors(error);
    return res.status(customError.status).json({ message: customError.error });
  }
};

export const deleteProductById = async (req: Request, res: Response) => {
  try {
    const userId = (req.user as UserTokenAttributes).id;
    const productId = req.params.productId;
    const data = { status: ProductStatusEnum.DELETED };

    const response = await productControllers.updateAProductBySellerId(userId, productId, data);

    if (!response[0]) return res.status(404).json({ message: `Product with id:${productId} doesn't exist` });

    return res.status(204).json();
  } catch (error: any) {
    const customError = catchErrors(error);
    return res.status(customError.status).json({ message: customError.error });
  }
};
