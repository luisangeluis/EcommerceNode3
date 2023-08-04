import { Request, Response } from "express";
import { UserTokenAttributes } from "../types";
import * as cartControllers from "../controllers/cart.controller";
import * as cartItemControllers from "../controllers/cartItem.controller";
import { readProductById } from "../controllers/product.controller";

export const getCartByUserId = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const userId = (req.user as UserTokenAttributes)?.id;
    const cart = await cartControllers.readCartByUserId(userId);

    return res.status(200).json({ response: cart });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const addToCart = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const productId = req.params.id;
    const userId = (req.user as UserTokenAttributes)?.id;

    const [cart, _createdCart] = await cartControllers.readOrCreateCart(userId);

    const product = await readProductById(productId);

    if (!product || product === null)
      return res
        .status(404)
        .json({ message: `Product with id: ${productId} doesn't exist` });

    const [cartItem, created] = await cartItemControllers.readOrCreateCartItem({
      productId: product.id,
      cartId: cart.id,
      quantity: 1,
      price: product.price,
    });

    if (!created) cartItem.quantity += 1;

    await cartItem.save();

    return res
      .status(201)
      .json({ message: `Product with id: ${productId} added to cart` });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
