import { v4 as uuidv4 } from "uuid";
import type { OrderCreationAttributes } from "../types";
import Order from "../models/Order.model";
import { Transaction } from "sequelize";
import Cart from "../models/Cart.model";
import OrderDetail from "../models/OrderDetail.model";
import { orderStatus } from "../utils/Enums";

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

export const updateOrderStatus=async(id:string,status:orderStatus)=>{
  const response = await Order.update({status},{where:{id}});
  
  return response;
}


export const updateOrderStatusAsCustomer = async (
  orderId: string,
  status: string,
  userId:string,
) => {
  const response = await Order.findOne({
    where: { id: orderId,status:"created" },
    include: [
      {
        model: Cart,
        where: {userId:userId},
        required:true
      },
    ],
  });
  // console.log(response);
  
  if (!response) return null;

  response.status = status;

  await response.save();

  return response;
};
