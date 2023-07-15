"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_router_1 = __importDefault(require("./routes/product.router"));
const app = (0, express_1.default)();
app.use("api/v1/products", product_router_1.default);
app.get("/", (_req, res) => res.send("hola"));
exports.default = app;
