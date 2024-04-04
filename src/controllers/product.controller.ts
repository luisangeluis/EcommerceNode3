import { v4 as uuidv4 } from "uuid";
// import sequelize from "sequelize";
import type { ProductAttributes, ProductCreationAttributes, ProductReadAttributes, ProductUpdateAttributes } from "../types";
// import type { ProductsQuery } from "../types/request/types.request";
import Product from "../models/Product.model";
import ProductImage from "../models/ProductImage.model";
// import { ProductStatusEnum } from "../utils/Enums";

interface GetProducts {
  totalResults: number;
  currentPage: number;
  totalPages: number;
  products: Product[];
}

// const { Op } = sequelize;

//Geat all products
// export const readAllProducts = async (optionalQueries?: Partial<ProductReadAttributes>): Promise<ProductAttributes[]> => {
export const readAllProducts = async (queriesToSearch?: any, page: number = 1): Promise<GetProducts> => {
  const limit = 5;
  const currentPage = page;
  const offset = (currentPage - 1) * limit;

  const { rows: products, count: totalResults } = await Product.findAndCountAll({
    where: queriesToSearch,
    include: [{ model: ProductImage, required: false }],
    limit,
    offset,
    distinct: true
  });

  //Getting total pages
  const totalPages = Math.ceil(totalResults / limit);

  return {
    totalResults,
    totalPages,
    currentPage,
    products
  };
};

//Get a product by id
export const readProductById = async (id: string, optionalQueries?: Partial<ProductReadAttributes>): Promise<Product | null> => {
  const queries: any = {
    id
  };

  if (optionalQueries?.sellerId) queries.sellerId = optionalQueries.sellerId;

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
