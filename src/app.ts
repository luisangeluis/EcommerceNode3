import express from "express";
import productRoutes from "./routes/product.router";
import userRoutes from "./routes/user.router";

const app = express();

app.use(express.json());

app.use("/api/v1/products", productRoutes);
app.use("/api/v1/users", userRoutes);
app.get("/", (_req, res) => res.send("hola"));

export default app;
