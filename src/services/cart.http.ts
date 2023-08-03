import { Request, Response } from "express";

import * as cartControllers from "../controllers/cart.controller";
import * as cartItemControllers from "../controllers/cartItem.controller";
import * as productControllers from "../controllers/product.controller";
import { UserTokenAttributes } from "../types";

export const addToCart = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const productId = req.params.id;
  const userId = (req.user as UserTokenAttributes)?.id;

  const [cart, _createdCart] = await cartControllers.readOrCreateCart(userId);

  const product = await productControllers.readProductById(productId);

  if (!product || product === null)
    return res
      .status(404)
      .json({ message: `Product with id: ${product} doesn't exist` });

  await cartItemControllers.readOrCreateCartItem({
    productId: product.id,
    cartId: cart.id,
    quantity: 1,
  });

  return res.send("product added");
};
