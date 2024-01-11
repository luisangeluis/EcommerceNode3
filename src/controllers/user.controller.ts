import { v4 as uuidv4 } from "uuid";
import User from "../models/User.model";
import type { UserAttributes, UserCreationAttributes } from "../types";

export const getUserById = async (id: string): Promise<UserAttributes | null> => {
  return await User.findOne({
    where: { id },
    attributes: ["id", "firstName", "lastName", "email", "roleId"]
  });
};

export const createUser = async (newUser: UserCreationAttributes): Promise<UserAttributes> => {
  return await User.create({ ...newUser, id: uuidv4() });
};

export const updateUserById = async (id: string, data: Partial<UserAttributes>): Promise<Number[]> =>
  await User.update(data, { where: { id } });

export const deleteUserById = async (id: string) => {
  return await User.update({ statusId: "4b48c2d6-0114-4b76-a80e-d795661f5c9d" }, { where: { id } });
};

export const getUserByEmail = async (email: string): Promise<UserAttributes | null> => {
  return await User.findOne({ where: { email } });
};
