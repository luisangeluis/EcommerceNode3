import { Request, Response } from "express";
import type { UserTokenAttributes } from "../types";
import * as cartItemControllers from "../controllers/cartItem.controller";
import * as cartControllers from "../controllers/cart.controller";
import { readProductById } from "../controllers/product.controller";

export const getCartItem = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const userId = (req.user as UserTokenAttributes)?.id;
    const cartItemId = req.params.cartItemId;

    const response = await cartItemControllers.readCartItemById(
      cartItemId,
      userId
    );

    if (!response)
      return res
        .status(404)
        .json({ message: `Cart item with id: ${cartItemId} doesn´t exists` });

    return res.status(200).json({ response });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
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

export const updateQuantityFromCartItem = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId = (req.user as UserTokenAttributes)?.id;
  const cartItemId = req.params.cartItemId;
  const quantity = req.body.quantity;

  if (quantity < 1 || quantity > 10)
    return res
      .status(400)
      .json({ message: "quantity property must be between 1 and 10" });

  const response = await cartItemControllers.updateQuantity(
    cartItemId,
    userId,
    quantity
  );

  if (!response) return res.status(404);

  return res
    .status(200)
    .json({ message: `Cart item with id: ${cartItemId} successfully edited` });
};
