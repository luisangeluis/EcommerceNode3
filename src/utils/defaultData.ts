import Role from "../models/Role.model";
import { v4 as uuidv4 } from "uuid";

export const generateData = async (): Promise<void> => {
  await Role.bulkCreate([
    { title: "admin", id: uuidv4() },
    { title: "seller", id: uuidv4() },
    { title: "customer", id: uuidv4() },
  ]);
};
