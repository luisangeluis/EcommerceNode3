import type { OrderCreationAttributes } from "../types";

export const createOrder = async (order: OrderCreationAttributes) => {

    const response = await Order.create();
};
