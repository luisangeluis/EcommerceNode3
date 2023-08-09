import { v4 as uuidv4 } from "uuid";
import type { OrderCreationAttributes } from "../types";
import { Order } from "../models/Order.model";
import { Transaction } from "sequelize";

export const createOrder = async (
  order: OrderCreationAttributes,
  transaction: Transaction
) => await Order.create({ ...order, id: uuidv4() }, { transaction });
