import jwt from "jsonwebtoken";
import { UserAttributes } from "../types";
import dotenv from "dotenv";

dotenv.config();

const jwtKey = process.env.JWT_KEY as string;

const generateToken = async ({
  id,
  email,
  roleId,
}: Partial<UserAttributes>) => {
  const token = await jwt.sign(
    {
      id,
      email,
      roleId,
    },
    jwtKey
  );

  return token;
};

export default generateToken;
