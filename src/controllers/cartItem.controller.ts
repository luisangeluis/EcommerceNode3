import { v4 as uuidv4 } from "uuid";
import type { CartItemAttributes } from "../types";
import CartItem from "../models/CartItem.model";
import Cart from "../models/Cart.model";
import { Transaction } from "sequelize";

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

export const readOrCreateCartItemById = async (cartItem: Omit<CartItemAttributes, "id" | "quantity">) => {
  const response = await CartItem.findOrCreate({
    where: { productId: cartItem.productId, cartId: cartItem.cartId },
    defaults: {
      ...cartItem,
      quantity: 1,
      id: uuidv4()
    }
  });
  return response;
};

export const createCartItem = (cartItem: Omit<CartItemAttributes, "id" | "quantity">) => {
  //TO DO Create only to create a cartItem
};

export const deleteAllCartItems = async (cartId: string, transaction?: Transaction) =>
  await CartItem.destroy({
    where: {
      cartId
    },
    transaction
  });

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
