import { Request, Response } from "express";
import catchErrors from "../utils/catchErrors";
import { ProductStatusEnum } from "../utils/Enums";
import type { UserTokenAttributes } from "../types";
import * as productControllers from "../controllers/product.controller";

//Get all products as a Seller
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const user = req.user as UserTokenAttributes;
    const { totalResults, products, currentPage, totalPages } = await productControllers.readAllProducts({ userId: user.id });

    return res.status(200).json({
      totalResults,
      totalPages,
      currentPage,
      products
    });
  } catch (error: any) {
    const customError = catchErrors(error);
    return res.status(customError.status).json({ message: customError.error });
  }
};

//Get a product as seller
export const getProductById = async (req: Request, res: Response) => {
  try {
    const user = req.user as UserTokenAttributes;
    const productId = req.params.productId;
    const response = await productControllers.readProductById(productId, { userId: user.id });

    if (!response) return res.status(404).json({ message: `Product with id: ${productId} doesn't exists` });

    return res.status(200).json({ response });
  } catch (error: any) {
    const customError = catchErrors(error);
    return res.status(customError.status).json({ message: customError.error });
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
    const user = req.user as UserTokenAttributes;
    const productId = req.params.productId;
    const product = await productControllers.readProductById(productId, { userId: user.id });

    if (!product) return res.status(404).json({ message: `Product with id: ${productId} doesn't exists` });

    product.status = ProductStatusEnum.DELETED;

    await product.save();

    return res.status(204).json();
  } catch (error: any) {
    const customError = catchErrors(error);
    return res.status(customError.status).json({ message: customError.error });
  }
};
