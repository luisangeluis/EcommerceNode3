import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import * as authControllers from "../controllers/auth.controller";

export const loginUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const data = req.body;

  if (!Object.keys(data).length) return res.status(400).send("Missing data");

  if (!data.email || !data.password)
    return res.status(400).send("Missing data");

  const user = await authControllers.loginUser(data.email, data.password);

  if (!user) return res.status(401).send("Invalid credentials");

  const token = jwt.sign(
    { id: user.id, email: user.email, roleId: user.roleId },
    "academlo"
  );

  return res
    .status(200)
    .json({ message: "User successfully logged in ", token });
};