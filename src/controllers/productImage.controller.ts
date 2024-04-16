// import Product from "../models/Product.model";
import { v4 as uuidv4 } from "uuid";
import { Transaction } from "sequelize";
import ProductImage from "../models/ProductImage.model";
import type { ProductImageCreationAttributes } from "../types";

export const readAllImagesByProductId = async (productId: string, transaction?: Transaction) => {
  const response = await ProductImage.findAll({ where: { productId }, transaction });

  return response;
};

export const readAProductImage = async (productId: string, productImageId: string) =>
  await ProductImage.findOne({
    where: { productId, id: productImageId }
  });

export const createProductImage = async (productImage: ProductImageCreationAttributes) =>
  await ProductImage.create({ ...productImage, id: uuidv4() });

export const deleteProductImage = async (productId: string, productImageId: string) => {
  const response = await ProductImage.destroy({ where: { id: productImageId, productId } });
  console.log({ response });
  if (!response) return false;

  return true;
};

//Delete all product images
// export const deleteAllProductImages = async (productId: string) => await ProductImage.destroy({ where: { id: productId }, force: true });
