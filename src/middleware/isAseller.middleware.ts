import { Request, Response, NextFunction } from "express";
import type { UserTokenAttributes } from "../types";
import { getRoleByName } from "../controllers/role.controller";

export const isAseller = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const user = req.user as UserTokenAttributes;
  const role = await getRoleByName("seller");

  if (role?.id !== user.roleId)
    return res
      .status(401)
      .json({ message: `User not authorized to make this request` });

  next();
};
