import { Request, Response } from "express";
import type { UserAttributes } from "../types";
import * as productControllers from "../controllers/product.controller";
import type { ProductsQuery } from "../types/request/types.request";
import catchErrors from "../utils/catchErrors";

export const getProductsBySellerId = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const sellerId = (req.user as Partial<UserAttributes>)?.id;
  const query = req.query as ProductsQuery;
  const filters: ProductsQuery = {};

  filters.sellerId = sellerId;

  if (query.categoryId) filters.categoryId = query.categoryId;

  try {
    const response = await productControllers.readAllProducts(filters);
    return res.status(200).json({ response });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const postProductAsSeller = async (req: Request, res: Response) => {
  try {
    const sellerId = (req.user as Partial<UserAttributes>)?.id;
    const { title, description, price, categoryId } = req.body;

    if (!title || !description || !price || !categoryId || !sellerId) {
      return res.status(400).json({
        message: "At least these  fields must be completed",
        fields: {
          title: "string",
          description: "string",
          price: "number",
          categoryId: "string",
          sellerId: "string",
        },
      });
    }

    const response = await createProduct({
      title,
      description,
      price,
      categoryId,
      sellerId,
    });

    return res.status(201).json({ response });
  } catch (error: any) {
    const errorResponse = catchErrors(error);

    return res
      .status(errorResponse.status)
      .json({ message: errorResponse.error });
  }
};

export const updateProductAsSeller = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId = (req.user as Partial<UserAttributes>)?.id;
  const productId = req.params.productId;
  const data = req.body;
  const { id, sellerId, ...restOfData } = data;

  try {
    if (!Object.keys(restOfData).length)
      return res.status(400).json({ message: "Missing data" });

    const response = await productControllers.updateProductAsSeller(
      { id: productId, sellerId: userId },
      restOfData
    );

    if (!response[0])
      return res
        .status(404)
        .json({ message: `Product with id: ${productId} doesn't exists` });

    return res
      .status(200)
      .json({ message: `Product with id: ${productId} edited successfully` });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const removeProductAsSeller = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const productId = req.params.productId;
    const sellerId = (req.user as Partial<UserAttributes>)?.id;

    const response = await productControllers.updateProductAsSeller(
      {
        id: productId,
        sellerId,
      },
      { status: "deleted" }
    );

    if (!response[0])
      return res
        .status(404)
        .json({ message: `Product with id: ${productId} doesn't exists` });

    return res.status(204).json();
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
