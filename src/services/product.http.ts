import { Request, Response } from "express";
import sequelize from "sequelize";
import type { UserTokenAttributes } from "../types";
import catchErrors from "../utils/catchErrors";
import { ProductStatusEnum } from "../utils/Enums";
import * as productControllers from "../controllers/product.controller";

const { Op } = sequelize;

//Get all products
export const getAllProducts = async (req: Request, res: Response): Promise<Response> => {
  try {
    const queries = req.query;
    const { productInfo, categoryId, page } = queries;
    const queriesToSearch: any = { status: { [Op.in]: [ProductStatusEnum.ACTIVE, ProductStatusEnum.INACTIVE] } };

    if (productInfo) {
      queriesToSearch.title = productInfo;
      queriesToSearch.description = productInfo;

      queriesToSearch.title = { [Op.like]: `%${productInfo}%` };
      queriesToSearch.description = { [Op.like]: `%${productInfo}%` };
    }
    if (categoryId) queriesToSearch.categoryId = categoryId;
    if (page) queriesToSearch.page = page;

    const { totalResults, totalPages, currentPage, products } = await productControllers.readAllProducts(queriesToSearch);

    return res.status(200).json({
      totalResults,
      totalPages,
      currentPage,
      products
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
