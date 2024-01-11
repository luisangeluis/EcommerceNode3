import Role from "../models/Role.model";
import type { UserTokenAttributes } from "../types";

import { Request, Response, NextFunction } from "express";

const isASuperUser = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const user = req.user as UserTokenAttributes;

  const role = await Role.findOne({ where: { title: "superUser" } });

  if (role?.id !== user.roleId) return res.status(401).json({ message: `User not authorized to make this request` });

  next();
};

export default isASuperUser;
