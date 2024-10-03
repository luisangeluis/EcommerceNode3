import { getUserByEmail } from "./user.controller";
import { UserAttributes } from "../types";
import { comparePassword } from "../utils/crypt";

export const loginUser = async (email: string, password: string): Promise<UserAttributes | null> => {
  const user = await getUserByEmail(email);

  if (!user) return null;

  const verifyPassword = comparePassword(password,user.password)

  if(!verifyPassword)
    return null;
  //if (password !== user.password) return null;
  //

  return user;
};
