import Product from "../models/Product.model";
import { ProductAttributes } from "../types";

export const readAllProducts = async (): Promise<ProductAttributes[]> =>
  await Product.findAll();

export const readProductById = async (
  id: string
): Promise<ProductAttributes | null> =>
  await Product.findOne({ where: { id } });
