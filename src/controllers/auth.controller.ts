import { getUserByEmail } from "./user.controller";
import { UserAttributes } from "../types";

export const loginUser = async (email: string, password: string): Promise<UserAttributes | null> => {
  const user = await getUserByEmail(email);

  if (!user) return null;
  if (password !== user.password) return null;

  return user;
};
