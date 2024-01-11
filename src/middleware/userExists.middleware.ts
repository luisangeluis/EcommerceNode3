import { Request, Response, NextFunction } from "express";
import { UserTokenAttributes } from "../types";
import { getUserById } from "../controllers/user.controller";

const userExists = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const userId = (req.user as UserTokenAttributes)?.id;
  const user = await getUserById(userId);

  if (!user) return res.status(404).json({ message: `User with id: ${userId} doesn't exists` });

  next();
};

export default userExists;
