import { Request, Response } from "express";
import { UserTokenAttributes } from "../types";
import * as productImagesController from "../controllers/productImage.controller";
import * as productController from "../controllers/product.controller";

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
    const userId = (req.user as UserTokenAttributes)?.id;

    // const files = await req.files?.image;
    console.log({ files: req.files });

    const query = { sellerId: userId };
    const product = await productController.readProductById(productId, query);

    if (!product)
      return res
        .status(404)
        .json({ message: `Product with id: ${productId} doesn't exists` });

    // console.log(req.files);

    // const newProductImage = { productId, url: "" };

    // const response =
    //   await productImagesController.createProductImage(newProductImage);

    return res.status(201).json({ message: "product image created" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
