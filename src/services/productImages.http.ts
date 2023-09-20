import { Request, Response } from "express";
import * as productImagesController from "../controllers/productImage.controller";

export const getAllProductImages = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const productId = req.params?.id;
    const response =
      await productImagesController.readAllImagesByProductId(productId);

    return res.status(200).json({ response });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAnImageByProductId = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const productId = req.params.id;
    const imageId = req.params.productImageId;
    const files = await req.files?.image;

    console.log(files);

    const response = await productImagesController.readAnImageByProductId(
      productId,
      imageId,
    );

    if (!response)
      return res
        .status(404)
        .json({ message: `Image with id: ${imageId} doesn't exists` });

    return res.status(200).json({ response });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const postImageByProductId = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const productId = req.params.id;
    const newProductImage = { productId, url: "" };

    const response =
      await productImagesController.createProductImage(newProductImage);

    return res.status(201).json({ response });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
