import { v4 as uuidv4 } from "uuid";
import type { OrderCreationAttributes } from "../types";
import Order from "../models/Order.model";
import { Transaction } from "sequelize";
import Cart from "../models/Cart.model";
import OrderDetail from "../models/OrderDetail.model";

export const readAllOrders = async (userId: string): Promise<Order[]> => {
  const response = await Order.findAll({
    include: [
      { model: Cart, where: { userId }, attributes: [] },
      { model: OrderDetail, required: true },
    ],
  });

  return response;
};

export const readOrderById = async (
  userId: string,
  orderId: string
): Promise<Order | null> => {
  const response = await Order.findOne({
    where: { id: orderId },
    include: { model: Cart, where: { userId } },
  });

  return response;
};

export const createOrder = async (
  order: OrderCreationAttributes,
  transaction: Transaction
) => await Order.create({ ...order, id: uuidv4() }, { transaction });

export const updateOrder = async (
  orderId: string,
  userId: string,
  status: string
) => {
  const response = await Order.findOne({
    where: { id: orderId },
    include: [
      {
        model: Cart,
        where: { userId },
        required: true,
      },
    ],
  });

  if (!response) return null;

  response.status = status;

  await response.save();

  return response;
};
