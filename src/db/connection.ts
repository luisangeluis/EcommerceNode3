import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
// import type { Dialect } from "sequelize";
// import { generateData } from "../utils/defaultData";
import Product from "../models/Product.model";
import Category from "../models/Category.model";
import User from "../models/User.model";
import Role from "../models/Role.model";
import Cart from "../models/Cart.model";
import CartItem from "../models/CartItem.model";
import Order from "../models/Order.model";
import OrderDetail from "../models/OrderDetail.model";
import Status from "../models/Status.model";
import ProductImage from "../models/ProductImage.model";

dotenv.config();

// const dialect = process.env.DB_DIALECT as Dialect;
const host = process.env.DB_HOST as string;
const username = process.env.DB_USER as string;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME as string;

const isTesting = process.env.NODE_ENV === "test";

const db = new Sequelize(database, username, password, {
  dialect: "mysql",
  host,
  models: [
    Product,
    Category,
    User,
    Role,
    Cart,
    CartItem,
    Order,
    OrderDetail,
    Status,
    ProductImage,
  ],
  logging: isTesting,
});

export const initDb = async (): Promise<void> => {
  try {
    await db.authenticate();

    if (process.env.NODE_ENV === "production") {
      await db.sync();
      console.log("production");

      // await generateData();
    } else {
      await db.sync({ force: true });
      console.log("development");

      // await generateData();
    }

    console.log("db synced");
  } catch (error: any) {
    console.log("error:", error.message);

    process.exit(1);
  }
};

export default db;
