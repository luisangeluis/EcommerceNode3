import { Request, Response } from "express";
import type { UserTokenAttributes } from "../types";
import * as orderControllers from "../controllers/order.controller";
import { readCartByUserId } from "../controllers/cart.controller";

export const post = async (req: Request, res: Response) => {
  try {
    // const cartId = req.params.cartId;
    const userId = (req.user as UserTokenAttributes)?.id;

    //****TODO LOGICA PARA PAGOS

    const cart = await readCartByUserId(userId);
    console.log("cartId:", cart?.id);
    console.log({cart});
    const total = cart?.cartItems.reduce(
      (accum, current) => accum + current.price * current.quantity,
      0
    );
    console.log({ total });

    const order = await orderControllers.createOrder();
    return res.status(201).json({ message: "Post order" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
