import { Request, Response } from "express";
import { UserTokenAttributes } from "../types";
import * as cartControllers from "../controllers/cart.controller";

export const getCartByUserId = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = (req.user as UserTokenAttributes)?.id;
    const [cart, _created] = await cartControllers.readOrCreateCart(userId);

    return res.status(200).json({ response: cart });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
