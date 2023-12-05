import { v4 as uuidv4 } from "uuid";

import Cart from "../models/Cart.model";
import { CartAttributes } from "../types";
import CartItem from "../models/CartItem.model";
import Product from "../models/Product.model";

export const readCartByUserId = async (userId: string) => {
  const response = await Cart.findOne({
    where: { userId },
    include: [
      {
        model: CartItem,
        attributes: ["id", "quantity", "price"],
        include: [
          {
            model: Product,
            attributes: ["id", "title", "description", "categoryId"],
          },
        ],
      },
    ],
  });

  return response;
};

export const readOrCreateCart = async (
  userId: string,
): Promise<[CartAttributes, boolean]> => {
  const response = await Cart.findOrCreate({
    where: { userId: userId },
    defaults: { id: uuidv4(), isActive: true, userId },
    include: [
      {
        model: CartItem,
        attributes: ["id", "quantity", "price"],
        include: [
          {
            model: Product,
            attributes: ["title", "description", "categoryId"],
          },
        ],
      },
    ],
  });

  return response;
};
