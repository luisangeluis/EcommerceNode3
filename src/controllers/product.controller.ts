import { v4 as uuidv4 } from "uuid";
import sequelize from "sequelize";
import type {
  ProductAttributes,
  ProductCreationAttributes,
  ProductUpdateAttributes,
} from "../types";
// import type { ProductsQuery } from "../types/request/types.request";
import Product from "../models/Product.model";
import ProductImage from "../models/ProductImage.model";

const { Op } = sequelize;

//Geat all products
export const readAllProducts = async (): Promise<ProductAttributes[]> => {
  return await Product.findAll({
    where: { status: { [Op.in]: ["active", "inactive"] } },
    include: [{ model: ProductImage, required: false }],
  });
};

//Get a product by id
export const readProductById = async (
  id: string,
): Promise<ProductAttributes | null> =>
  await Product.findOne({
    where: { id },
    include: { model: ProductImage, required: false },
  });

//Create a product
export const createProduct = async (
  product: ProductCreationAttributes,
): Promise<ProductAttributes> => {
  return await Product.create({ ...product, id: uuidv4() });
};

//Update a product
export const updateProduct = async (
  id: string,
  data: ProductUpdateAttributes,
): Promise<number[]> => await Product.update(data, { where: { id } });

export const updateProductAsSeller = async (
  { id, sellerId }: Partial<ProductAttributes>,
  data: ProductUpdateAttributes,
): Promise<number[]> => await Product.update(data, { where: { id, sellerId } });

//Delete a product
export const deleteProduct = async (id: string): Promise<number> =>
  await Product.destroy({ where: { id } });
