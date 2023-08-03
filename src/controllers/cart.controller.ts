import { v4 as uuidv4 } from "uuid";

import Cart from "../models/Cart.model";
import { CartAttributes } from "../types";

export const readOrCreateCart = async (
  userId: string
): Promise<[CartAttributes, boolean]> => {
  const response = await Cart.findOrCreate({
    where: { userId },
    defaults: {
      id: uuidv4(),
    },
  });

  return response;
};
