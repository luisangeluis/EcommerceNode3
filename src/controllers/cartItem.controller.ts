import { v4 as uuidv4 } from "uuid";
import CartItem from "../models/CartItem.model";
import type { CartItemAttributes, CartItemCreationAttributes } from "../types";
import Cart from "../models/Cart.model";

export const readCartItemById = async (
  cartItemId: string,
  userId: string
): Promise<CartItem | null> => {
  const response = await CartItem.findOne({
    where: { id: cartItemId },
    attributes:{
      exclude:["cartId"],
    },
    include: {
      model: Cart,
      where: {
        userId,
      },
    },
  });

  return response;
};

export const createCartItem = async (
  cartItem: CartItemCreationAttributes
): Promise<CartItemAttributes> => {
  return await CartItem.create({ ...cartItem, id: uuidv4() });
};

export const readOrCreateCartItem = async (
  cartItem: Partial<CartItemAttributes>
) => {
  const response = await CartItem.findOrCreate({
    where: { productId: cartItem.productId },
    defaults: {
      ...cartItem,
      id: uuidv4(),
    },
  });
  return response;
};

export const updateQuantity = async (
  cartItemId: string,
  userId: string,
  quantity: number
): Promise<CartItem | null> => {
  const cartItem = await CartItem.findOne({
    where: { id: cartItemId },
    include: {
      model: Cart,
      where: {
        userId,
      },
    },
  });

  if (!cartItem) return null;

  cartItem.quantity = quantity;
  await cartItem.save();

  return cartItem;
};

export const deleteCartItem = async (
  cartItemId: string,
  userId: string
): Promise<number> => {
  const response = await CartItem.findOne({
    where: { id: cartItemId },
    include: {
      model: Cart,
      where: {
        userId,
      },
    },
  });

  if (!response) return 0;

  await response.destroy();
  return 1;
};
