import { Request, Response } from "express";
import catchErrors from "../utils/catchErrors";
import { ProductStatusEnum } from "../utils/Enums";
import type { UserTokenAttributes } from "../types";
import * as productControllers from "../controllers/product.controller";

//Get all products as a Seller
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const user = req.user as UserTokenAttributes;
    const { totalResults, response, currentPage, totalPages } = await productControllers.readAllProducts({ userId: user.id });

    return res.status(200).json({
      totalResults,
      totalPages,
      currentPage,
      response
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
