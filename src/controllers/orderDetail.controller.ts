import { v4 as uuidv4 } from "uuid";
import { Transaction } from "sequelize";
import type { OrderDetailAttributes, OrderDetailCreationAttributes } from "../types";
import OrderDetail from "../models/OrderDetail.model";

export const createOrderDetail = async (
  orderDetail: OrderDetailCreationAttributes,
  transaction: Transaction
): Promise<OrderDetailAttributes | null> => await OrderDetail.create({ ...orderDetail, id: uuidv4() }, { transaction });
