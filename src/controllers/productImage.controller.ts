import { v4 as uuidv4 } from "uuid";

import ProductImage from "../models/ProductImage.model";
import type { ProductImageCreationAttributes } from "../types";
import Product from "../models/Product.model";

export const readAllImagesByProductId = async (productId: string) => {
  const response = await ProductImage.findAll({ where: { productId } });

  return response;
};

export const readAnImageByProductId = async (
  productId: string,
  imageId: string,
) => {
  const response = await ProductImage.findOne({
    where: { productId, id: imageId },
  });

  return response;
};

export const createProductImage = async (
  productImage: ProductImageCreationAttributes,
) => {
  const response = await ProductImage.create({ ...productImage, id: uuidv4() });

  return response;
};

export const deleteProductImage = async (
  sellerId: string,
  productId: string,
  productImageId: string,
) => {
  const response = await Product.findOne({
    where: { id: productId, sellerId },
    include: {
      model: ProductImage,
      where: {
        id: productImageId,
      },
    },
  });

  if (!response) return 0;

  return await ProductImage.destroy({ where: { id: productImageId } });
};
