import { v4 as uuidv4 } from "uuid";
import User from "../models/User.model";
import type { UserAttributes, UserCreationAttributes } from "../types";

export const getUserById = async (
  id: string
): Promise<UserAttributes | null> => {
  return await User.findOne({
    where: { id },
    attributes: ["id", "firstName", "lastName", "email", "roleId"],
  });
};

export const createUser = async (
  newUser: UserCreationAttributes
): Promise<UserAttributes> => {
  return await User.create({ ...newUser, id: uuidv4() });
};

export const getUserByEmail = async (
  email: string
): Promise<UserAttributes | null> => {
  return await User.findOne({ where: { email } });
};
