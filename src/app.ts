import express from "express";
import productRoutes from "./routes/product.router";
// import userRoutes from "./routes/user.router";
import authRoutes from "./routes/auth.router";

const app = express();

app.use(express.json());

app.use("/api/v1/products", productRoutes);
// app.use("/api/v1/users", userRoutes);
app.use("/api/v1/auth", authRoutes);
app.get("/", (_req, res) => res.send("hola"));

export default app;
