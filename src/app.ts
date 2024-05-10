import express from "express";
import productRoutes from "./routes/product.router";
import authRoutes from "./routes/auth.router";
import userRoutes from "./routes/user.router";
import cartRoutes from "./routes/cart.router";
import orderRoutes from "./routes/order.router";
import cartItemRouter from "./routes/cartItem.router";
import productImagesRoutes from "./routes/productImages.router";

import passport from "./middleware/passport.middleware";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";

dotenv.config();

const app = express();

app.use(passport.initialize());
app.use(express.json());
app.use(cors());

app.use("/api/v1/products", productRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/orders", orderRoutes);
// app.use("/api/v1/seller-products", sellerProductsRouter);
app.use("/api/v1/cartItem", cartItemRouter);
app.use("/api/v1/productImages", productImagesRoutes);

app.use(function (err: any, _req: any, res: any, _next: any) {
  if (err instanceof multer.MulterError) {
    console.log({ err });

    res.status(400).send("Error al cargar el archivo: " + err.message);
  } else {
    res.status(500).send("Error interno del servidor" + err.message);
  }
});

export default app;
