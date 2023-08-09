import Role from "../models/Role.model";
import { RoleAttributes } from "../types";

export const getRoleByName = async (
  roleTitle: string
): Promise<RoleAttributes | null> =>
  await Role.findOne({ where: { title: roleTitle } });
