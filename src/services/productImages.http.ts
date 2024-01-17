import { Request, Response } from "express";
import { UserTokenAttributes } from "../types";
import { uploadImage } from "../utils/cloudinary";
import fs from "fs-extra";

import * as productImagesController from "../controllers/productImage.controller";
import * as productController from "../controllers/product.controller";
// import ProductImage from "../models/ProductImage.model";
// import Product from "../models/Product.model";

export const getAllProductImages = async (req: Request, res: Response): Promise<Response> => {
  try {
    const productId = req.params?.id;
    const response = await productImagesController.readAllImagesByProductId(productId);

    return res.status(200).json({ response });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAnImageByProductId = async (req: Request, res: Response): Promise<Response> => {
  try {
    const productId = req.params.id;
    const imageId = req.params.productImageId;

    const response = await productImagesController.readAnImageByProductId(productId, imageId);

    if (!response) return res.status(404).json({ message: `Image with id: ${imageId} doesn't exists` });

    return res.status(200).json({ response });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const postImageByProductId = async (req: Request, res: Response): Promise<Response> => {
  try {
    const productId = req.params.id;
    // const userId = (req.user as UserTokenAttributes)?.id;
    // const query = { sellerId: userId };
    const tempFile: any = req.files?.product_image;

    const product = await productController.readProductById(productId);

    if (!product) return res.status(404).json({ message: `Product with id: ${productId} doesn't exists` });

    const uploadedImage = await uploadImage(tempFile.tempFilePath);

    const newProductImage = { productId, url: uploadedImage.secure_url };

    const response = await productImagesController.createProductImage(newProductImage);

    await fs.unlink(tempFile.tempFilePath);

    return res.status(201).json({ response });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteImg = async (req: Request, res: Response): Promise<Response> => {
  const sellerId = (req.user as UserTokenAttributes)?.id;
  const productId = req.params.id;
  const productImageId = req.params.productImageId;

  const response = await productImagesController.deleteProductImage(sellerId, productId, productImageId);

  if (!response) return res.status(404).json({ message: `Image with id doesn't exists` });

  return res.status(204).json();
};
