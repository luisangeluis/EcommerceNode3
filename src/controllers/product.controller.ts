import { v4 as uuidv4 } from "uuid";
import sequelize from "sequelize";
import type { ProductAttributes, ProductCreationAttributes, ProductReadAttributes, ProductUpdateAttributes } from "../types";
// import type { ProductsQuery } from "../types/request/types.request";
import Product from "../models/Product.model";
import ProductImage from "../models/ProductImage.model";
import { ProductStatusEnum } from "../utils/Enums";

interface GetProducts {
  totalResults: number;
  response: Product[];
  currentPage: number;
  totalPages: number;
}

const { Op } = sequelize;

//Geat all products
// export const readAllProducts = async (optionalQueries?: Partial<ProductReadAttributes>): Promise<ProductAttributes[]> => {
export const readAllProducts = async (optionalQueries?: Partial<ProductReadAttributes>): Promise<GetProducts> => {
  const limit = 4;
  const page = optionalQueries?.page || 1;
  const offset = (page - 1) * limit;
  const queries: any = {
    status: { [Op.in]: [ProductStatusEnum.ACTIVE, ProductStatusEnum.INACTIVE] }
  };

  if (optionalQueries?.title) queries.title = { [Op.like]: `%${optionalQueries.title}%` };

  if (optionalQueries?.description) queries.description = { [Op.like]: `%${optionalQueries.description}%` };

  if (optionalQueries?.categoryId) queries.categoryId = optionalQueries.categoryId;

  if (optionalQueries?.userId) queries.userId = optionalQueries.userId;

  const { rows: response, count } = await Product.findAndCountAll({
    where: queries,
    include: [{ model: ProductImage, required: false }],
    limit,
    offset
  });

  const totalPages = Math.ceil(count / limit);

  return {
    totalResults: count,
    totalPages: totalPages,
    currentPage: page,
    response: response
  };
};

//Get a product by id
export const readProductById = async (id: string, optionalQueries?: Partial<ProductReadAttributes>): Promise<Product | null> => {
  const queries: any = {
    id
  };

  if (optionalQueries?.userId) queries.userId = optionalQueries.userId;

  return await Product.findOne({
    where: queries,
    include: { model: ProductImage, required: false }
  });
};

//Create a product
export const createProduct = async (product: ProductCreationAttributes): Promise<ProductAttributes> => {
  return await Product.create({ ...product, id: uuidv4() });
};

//Update a product
export const updateProduct = async (id: string, data: ProductUpdateAttributes): Promise<number[]> => {
  return await Product.update(data, { where: { id } });
};

export const updateProductAsSeller = async (
  { id, sellerId }: Partial<ProductAttributes>,
  data: ProductUpdateAttributes
): Promise<number[]> => {
  return await Product.update(data, { where: { id, sellerId } });
};

export const updateAProductBySellerId = async (sellerId: string, productId: string, data: ProductUpdateAttributes): Promise<number[]> =>
  await Product.update(data, { where: { sellerId, id: productId } });

//Delete a product
export const deleteProduct = async (id: string): Promise<number> => await Product.destroy({ where: { id } });
