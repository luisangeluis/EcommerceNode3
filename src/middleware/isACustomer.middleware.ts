import Role from '../models/Role.model';
import type { UserTokenAttributes } from '../types';
import { Request, Response, NextFunction } from 'express';

const IsACustomer = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const user = req.user as UserTokenAttributes;
  const role = await Role.findOne({ where: { title: 'customer' } });

  if (user.roleId !== role?.id) return res.status(401).json({ message: `User not authorized to make this request` });

  next();
};

export default IsACustomer;
