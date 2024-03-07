import { Request, Response } from "express";
import { UserTokenAttributes } from "../types";
import { deleteImage, uploadImage } from "../utils/cloudinary";
import fs from "fs-extra";

import * as productImagesController from "../controllers/productImage.controller";
import * as productController from "../controllers/product.controller";
import catchErrors from "../utils/catchErrors";

//Post images by product id
export const postImageByProductId = async (req: Request, res: Response): Promise<Response> => {
  try {
    const user = req?.user as UserTokenAttributes;
    const productId = req.params.id;

    //Search the user product
    const product = await productController.readProductById(productId, { sellerId: user.id });
    if (!product) return res.status(404).json({ message: `Product with id: ${productId} doesn't exist` });

    //Read tempFiles
    let tempFiles: any = req.files;
    if (!tempFiles.length) return res.status(400).json({ message: "Missing data" });

    //Upload images to cloudinary
    const promises = tempFiles.map((tempFile: any) => uploadImage(tempFile.path));
    const uploadedImages = await Promise.all(promises);

    // Create records en bd with the images
    const response = uploadedImages.map((uploadedImage) =>
      productImagesController.createProductImage({
        name: uploadedImage.original_filename,
        productId,
        url: uploadedImage.secure_url,
        cloudinaryId: uploadedImage.public_id
      })
    );
    await Promise.all(response);

    // Delete temporal files
    const deletedTempFiles = tempFiles.map((tempFile: any) => fs.unlink(tempFile.path));
    await Promise.all(deletedTempFiles);

    return res.status(201).json({ message: `Images uploaded successfully` });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteImg = async (req: Request, res: Response): Promise<Response> => {
  try {
    const seller = req.user as UserTokenAttributes;
    const productId = req.params.id;
    const productImageId = req.params.productImageId;

    //check that the product is valid
    const product = await productController.readProductById(productId, seller!.id);
    if (!product) return res.status(400).json({ message: `Product with id: ${productId} doesn't exist` });

    //check that the productImage is valid
    const productImage = await productImagesController.readAProductImage(product.id, productImageId);
    if (!productImage) return res.status(400).json({ message: `Image with id: ${productImageId} doesn't exist` });

    //Cloudinary route
    const imageRoute = productImage.cloudinaryId;

    //Delete image register
    await productImage.destroy();

    //Delete cloudinary image
    await deleteImage(imageRoute);

    return res.status(204).json();
  } catch (error: any) {
    const customError = catchErrors(error);
    return res.status(customError.status).json({ message: customError.error });
  }
};
