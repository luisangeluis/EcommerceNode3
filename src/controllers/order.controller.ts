import { v4 as uuidv4 } from "uuid";
import type { OrderCreationAttributes } from "../types";
import { Transaction } from "sequelize";

//MODELS
import Order from "../models/Order.model";
import Cart from "../models/Cart.model";
import OrderDetail from "../models/OrderDetail.model";

//controllers
// import * as cartControllers from "./cart.controller";
// import { orderStatus } from "../utils/Enums";

//Read all orders by cartId
export const readAllOrdersByCartId = async (cartId: string): Promise<Order[]> => await Order.findAll({ where: { cartId } });

//Read and order by orderId and cartId
export const readOrderById = async (orderId: string, cartId: string): Promise<Order | null> =>
  await Order.findOne({ where: { id: orderId, cartId } });

export const createOrder = async (order: OrderCreationAttributes, transaction?: Transaction) =>
  await Order.create({ ...order, id: uuidv4() }, { transaction });

//Cancel an order by orderId
export const changeStatus = async (orderId: string, userId: string, status: string) => {
  const order = await readOrderById(orderId, userId);

  if (!order) return 0;

  order.status = status;
  await order.save();

  return 1;
};

// export const deleteOrderById = async (orderId: string, cartId: string) =>
//   await Order.update({ status: "canceled" }, { where: { id: orderId, cartId } });

// export const updateOrderStatus = async (id: string, status: orderStatus) => {
//   const response = await Order.update({ status }, { where: { id } });

//   return response;
// };

// export const updateOrderStatusAsCustomer = async (orderId: string, status: string, userId: string) => {
//   const response = await Order.findOne({
//     where: { id: orderId, status: "created" },
//     include: [
//       {
//         model: Cart,
//         where: { userId: userId },
//         required: true
//       }
//     ]
//   });
//   // console.log(response);

//   if (!response) return null;

//   response.status = status;

//   await response.save();

//   return response;
// };
