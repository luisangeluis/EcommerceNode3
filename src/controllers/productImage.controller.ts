import { v4 as uuidv4 } from "uuid";

import ProductImage from "../models/ProductImage.model";
import type { ProductImageCreationAttributes } from "../types";
// import Product from "../models/Product.model";

export const readAllImagesByProductId = async (productId: string) => {
  const response = await ProductImage.findAll({ where: { productId } });

  return response;
};

export const readAProductImage = async (productId: string, productImageId: string) =>
  await ProductImage.findOne({
    where: { productId, id: productImageId }
  });

export const createProductImage = async (productImage: ProductImageCreationAttributes) => {
  const response = await ProductImage.create({ ...productImage, id: uuidv4() });

  return response;
};

// export const deleteProductImage = async (sellerId: string, productId: string, productImageId: string) => {
export const deleteProductImage = async (productId: string, productImageId: string) => {
  const response = await ProductImage.destroy({ where: { id: productImageId, productId } });
  console.log({ response });
  if (!response) return false;

  return true;
};
