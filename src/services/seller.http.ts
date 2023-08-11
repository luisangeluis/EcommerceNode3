import { Request, Response } from "express";
import type { UserAttributes } from "../types";
import * as productControllers from "../controllers/product.controller";
import type { ProductsQuery } from "../types/request/types.request";

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
