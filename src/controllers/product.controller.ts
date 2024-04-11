import { v4 as uuidv4 } from "uuid";
import type { ProductAttributes, ProductCreationAttributes, ProductUpdateAttributes } from "../types";
import Product from "../models/Product.model";
import ProductImage from "../models/ProductImage.model";

interface GetProducts {
  totalResults: number;
  currentPage: number;
  totalPages: number;
  products: Product[];
}

//Geat all products
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
export const readProductById = async (id: string): Promise<Product | null> => {
  return await Product.findOne({
    where: { id },
    include: { model: ProductImage, required: false }
  });
};

//Create a product
export const createProduct = async (product: ProductCreationAttributes): Promise<ProductAttributes> =>
  await Product.create({ ...product, id: uuidv4() });

export const updateProductById = async (id: string, data: ProductUpdateAttributes): Promise<number[]> =>
  await Product.update(data, { where: { id } });

//Delete a product
export const deleteProduct = async (id: string): Promise<number> => await Product.destroy({ where: { id } });
