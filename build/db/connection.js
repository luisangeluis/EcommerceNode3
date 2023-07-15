"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const dotenv_1 = __importDefault(require("dotenv"));
const Product_model_1 = __importDefault(require("../models/Product.model"));
dotenv_1.default.config();
const dialect = process.env.DB_DIALECT;
const host = process.env.DB_HOST;
const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;
// const port = process.env.DB_PORT;
const db = new sequelize_typescript_1.Sequelize(database, username, password, {
    dialect,
    host,
    models: [Product_model_1.default],
});
exports.default = db;
