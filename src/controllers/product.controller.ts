import Product from "../models/Product.model";
import {
  ProductAttributes,
  ProductCreationAttributes,
  ProductUpdateAttributes,
} from "../types";
import { v4 as uuidv4 } from "uuid";

//Geat all products
export const readAllProducts = async (): Promise<ProductAttributes[]> =>
  await Product.findAll();

//Get a product by id
export const readProductById = async (
  id: string
): Promise<ProductAttributes | null> =>
  await Product.findOne({ where: { id } });

//Create a product
export const createProduct = async (
  product: ProductCreationAttributes
): Promise<ProductAttributes> =>
  await Product.create({ ...product, id: uuidv4() });

//Update a product
export const updateProduct = async (
  id: string,
  data: ProductUpdateAttributes
): Promise<number[]> => await Product.update(data, { where: { id } });

//Delete a product
export const deleteProduct = async (id: string): Promise<number> =>
  await Product.destroy({ where: { id } });
