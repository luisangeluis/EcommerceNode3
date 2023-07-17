import Product from "../models/Product.model";
import {
  ProductAttributes,
  ProductCreationAttributes,
  ProductUpdateAttributes,
} from "../types";
import { v4 as uuidv4 } from "uuid";

export const readAllProducts = async (): Promise<ProductAttributes[]> =>
  await Product.findAll();

export const readProductById = async (
  id: string
): Promise<ProductAttributes | null> =>
  await Product.findOne({ where: { id } });

export const createProduct = async (
  product: ProductCreationAttributes
): Promise<ProductAttributes> => {
  const response = await Product.create({ ...product, id: uuidv4() });
  return response;
};

export const updateProduct = async (
  id: string,
  data: ProductUpdateAttributes
) => {
  const response = await Product.update(data, { where: { id } });

  return response;
};
