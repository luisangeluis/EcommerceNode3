import { v4 as uuidv4 } from "uuid";
import type { OrderCreationAttributes } from "../types";
import { Order } from "../models/Order.model";

export const createOrder = async (order: OrderCreationAttributes) =>
  await Order.create({ ...order, id: uuidv4() });
