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
    const queriesToSearch: any = { status: { [Op.in]: [ProductStatusEnum.ACTIVE, ProductStatusEnum.INACTIVE] } };
    let pageToSearch = 1;

    if (queries.productInfo) {
      queriesToSearch.title = { [Op.like]: `%${queries.productInfo}%` };
      queriesToSearch.description = { [Op.like]: `%${queries.productInfo}%` };
    }
    if (queries.categoryId) queriesToSearch.categoryId = queries.categoryId;
    if (queries.page && !Number.isNaN(queries.page)) pageToSearch = Number(queries.page);

    const { totalResults, totalPages, currentPage, products } = await productControllers.readAllProducts(queriesToSearch, pageToSearch);

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

//Get a product by id
export const getProductById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const productId = req.params.id;
    const response = await productControllers.readProductById(productId);

    if (!response) return res.status(404).json({ message: `Product with id: ${productId} doesn't exists` });

    return res.status(200).json({ response });
  } catch (error: any) {
    const customError = catchErrors(error);
    return res.status(customError.status).json({ message: customError.error });
  }
};

//Post a product
export const post = async (req: Request, res: Response) => {
  try {
    const seller = req.user;
    const data = req.body;
    const status = ["active", "inactive"];

    if (Object.keys(data).length === 0) return res.status(400).json({ message: "Missing data" });

    if (data.status && !status.includes(data.status))
      return res.status(400).json({ message: "invalid status value, active/inactive - optional value -" });

    if (typeof data.price !== "number") return res.status(400).json({ message: "Price property must be a number" });

    if (!data.title || !data.description || !data.categoryId) {
      return res.status(400).json({
        message: "At least these  fields must be completed",
        fields: {
          title: "string",
          description: "string",
          categoryId: "string"
        }
      });
    }

    const productToCreate = {
      title: data.title,
      description: data.description,
      price: data.price,
      status: data.status,
      categoryId: data.categoryId,
      sellerId: (seller as UserTokenAttributes)?.id
    };

    const response = await productControllers.createProduct(productToCreate);

    return res.status(201).json({ message: `Product with id: ${response.id} successfully created` });
  } catch (error: any) {
    const customError = catchErrors(error);
    return res.status(customError.status).json({ message: customError.error });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const seller = req.user;
    const data = req.body;
    const productId = req.params.id;

    //Cleaning data
    const { id: _id, sellerId: _sellerId, ...restOfData } = data;
    const status = ["active", "inactive"];

    //Cleaning data
    if (Object.keys(restOfData).length === 0) return res.status(400).json({ message: "Missing data" });

    if (restOfData.status && !status.includes(restOfData.status))
      return res.status(400).json({ message: "invalid status value, active/inactive - optional value -" });

    if (restOfData.price && typeof restOfData.price !== "number")
      return res.status(400).json({ message: "Price property must be a number" });

    //Updating product
    const productToUpdate = await productControllers.readProductById(productId);

    if (!productToUpdate || productToUpdate.sellerId !== (seller as UserTokenAttributes)!.id)
      return res.status(404).json({ message: `Product with id: ${productId} doesn't exists` });

    await productControllers.updateProductById(productId, restOfData);

    return res.status(200).json({ message: `Product with id:${productId} successfully edited` });
  } catch (error: any) {
    const customError = catchErrors(error);
    return res.status(customError.status).json({ message: customError.error });
  }
};

//Delete a product
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
