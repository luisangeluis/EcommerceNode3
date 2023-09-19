import ProductImage from "../models/ProductImage.model";

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

export const createProductImage = (productImage) => {
    
};
