import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import type { Dialect } from "sequelize";
import Product from "../models/Product.model";
import Category from "../models/Category.model";
import User from "../models/User.model";
import Role from "../models/Role.model";
import { generateData } from "../utils/defaultData";

dotenv.config();

const dialect = process.env.DB_DIALECT as Dialect;
const host = process.env.DB_HOST as string;
const username = process.env.DB_USER as string;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME as string;

const isTesting = process.env.NODE_ENV === "test";

const db = new Sequelize(database, username, password, {
  dialect,
  host,
  models: [Product, Category, User, Role],
  logging: isTesting,
});

export const initDb = async (): Promise<void> => {
  try {
    await db.authenticate();

    if (process.env.NODE_ENV === "production") await db.sync();
    else await db.sync({ force: true });
    await generateData();
    console.log("db synced");
  } catch (error: any) {
    console.log("error:", error.message);

    process.exit(1);
  }
};

export default db;
