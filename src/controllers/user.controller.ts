import { UUIDV4 } from "sequelize";
import User from "../models/User.model";
import type { UserAttributes, UserCreationAttributes } from "../types";

export const createUser = async (
  newUser: UserCreationAttributes
): Promise<UserAttributes> => {
  return await User.create({ ...newUser, id: UUIDV4() });
};
