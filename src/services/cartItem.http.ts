import { Request, Response } from "express";
import catchErrors from "../utils/catchErrors";
import type { UserTokenAttributes } from "../types";
import * as cartItemControllers from "../controllers/cartItem.controller";
import * as cartControllers from "../controllers/cart.controller";
import { readProductById } from "../controllers/product.controller";
// import { readProductById } from "../controllers/product.controller";

// export const getCartItem = async (req: Request, res: Response): Promise<Response> => {
//   try {
//     const userId = (req.user as UserTokenAttributes)?.id;
//     const cartItemId = req.params.cartItemId;

//     const response = await cartItemControllers.readCartItemById(cartItemId, userId);

//     if (!response) return res.status(404).json({ message: `Cart item with id: ${cartItemId} doesn´t exists` });

//     return res.status(200).json({ response });
//   } catch (error: any) {
//     return res.status(500).json({ message: error.message });
//   }
// };

//Add to cart
// export const addToCart = async (req: Request, res: Response): Promise<Response> => {
//   try {
//     const productId = req.params.id;
//     const userId = (req.user as UserTokenAttributes)?.id;
//     const cart = await cartControllers.readCartByUserId(userId);
//     const product = await readProductById(productId);

//     if (!product || product === null) return res.status(404).json({ message: `Product with id: ${productId} doesn't exist` });

//     const currentCartItem = {
//       productId: product.id,
//       cartId: cart!.id
//     };

//     const [cartItem, created] = await cartItemControllers.readOrCreateCartItemById(currentCartItem);

//     if (!created) {
//       cartItem.quantity += 1;
//       await cartItem.save();

//       return res.status(200).json({ message: `Product with id: ${cartItem.productId} added to cart` });
//     }

//     return res.status(201).json({ message: `Product with id: ${cartItem.productId} added to cart` });
//   } catch (error: any) {
//     return res.status(500).json({ message: error.message });
//   }
// };

export const addToCart = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const userId = (req.user as UserTokenAttributes)?.id;
    const cart = await cartControllers.readCartByUserId(userId);
    const product = await readProductById(productId);

    //Checking if product exists
    if (!product || product === null) return res.status(404).json({ message: `Product with id: ${productId} doesn't exist` });

    //Searching cartItem in cart
    const index = cart!.cartItems.findIndex((cartItem) => cartItem.product.id === productId);

    //If cartItem exists
    if (index >= 0) {
      cart!.cartItems[index].quantity += 1;
      await cart!.save();
      return res.status(200).json({ message: `Product with id: ${productId} added to cart` });
    } else {
      await cartItemControllers.createCartItem({ cartId: cart!.id, productId });
      return res.status(201).json({ message: `Product with id: ${productId} added to cart` });
    }
  } catch (error: any) {
    const customError = catchErrors(error);
    return res.status(customError.status).json({ message: customError.error });
  }
};

export const updateQuantityFromCartItem = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = (req.user as UserTokenAttributes)?.id;
    const cartItemId = req.params.cartItemId;
    const quantity = req.body.quantity;

    //Check it out a valid value
    if (!quantity || quantity < 1 || quantity > 10) return res.status(400).json({ message: "Type a quantity between 1 and 10" });

    const currentCartItem = await cartItemControllers.readCartItemById(cartItemId, userId);

    if (!currentCartItem) return res.status(404).json({ message: `cart item with id: ${cartItemId} not found` });

    currentCartItem.quantity = quantity;

    await currentCartItem.save();

    return res.status(200).json({ message: `Cart item with id: ${currentCartItem.id} successfully edited` });
  } catch (error: any) {
    const customError = catchErrors(error);
    return res.status(customError.status).json({ message: customError.error });
  }
};

export const removeCartItem = async (req: Request, res: Response): Promise<Response> => {
  const userId = (req.user as UserTokenAttributes)?.id;
  const cartItemId = req.params.cartItemId;

  try {
    const response = await cartItemControllers.deleteCartItem(cartItemId, userId);

    if (!response) return res.status(404).json({ message: `The item with id: ${cartItemId} doesn´t exists` });

    return res.status(204).json();
  } catch (error: any) {
    const customError = catchErrors(error);
    return res.status(customError.status).json({ message: customError.error });
  }
};
