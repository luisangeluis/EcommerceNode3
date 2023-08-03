import { v4 as uuidv4 } from "uuid";
import CartItem from "../models/CartItem.model";
import { CartItemAttributes, CartItemCreationAttributes } from "../types";

export const createCartItem = async (
  cartItem: CartItemCreationAttributes
): Promise<CartItemAttributes> => {
  return await CartItem.create({ ...cartItem, id: uuidv4() });
};

export const readOrCreateCartItem = async (
  cartItem: CartItemCreationAttributes
) => {
  const response = await CartItem.findOrCreate({
    where: { productId: cartItem.productId },
    defaults: {
      //   ...cartItem,
      id: uuidv4(),
    },
  });
  return response;
};
