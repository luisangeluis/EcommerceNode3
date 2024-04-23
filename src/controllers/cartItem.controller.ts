import { v4 as uuidv4 } from "uuid";
import type { CartItemAttributes } from "../types";
import CartItem from "../models/CartItem.model";
import Cart from "../models/Cart.model";
import { Transaction } from "sequelize";

//Read cartItem by Id
export const readCartItemById = async (cartItemId: string, userId: string): Promise<CartItem | null> => {
  const response = await CartItem.findOne({
    where: { id: cartItemId },
    attributes: {
      exclude: ["cartId"]
    },
    include: {
      model: Cart,
      where: {
        userId
      }
    }
  });

  return response;
};

//Create cartItem
export const createCartItem = async (cartItem: Omit<CartItemAttributes, "id" | "quantity">) =>
  await CartItem.create({ cartId: cartItem.cartId, productId: cartItem.productId, quantity: 1, id: uuidv4() });

//Delete cartItem by id
export const deleteCartItem = async (cartItemId: string, userId: string): Promise<boolean> => {
  const response = await CartItem.findOne({
    where: { id: cartItemId },
    include: {
      model: Cart,
      where: {
        userId
      }
    }
  });

  if (!response) return false;

  await response.destroy();
  return true;
};

//Delete all cartItems
export const deleteAllCartItems = async (cartId: string, transaction?: Transaction) =>
  await CartItem.destroy({
    where: {
      cartId
    },
    transaction
  });
