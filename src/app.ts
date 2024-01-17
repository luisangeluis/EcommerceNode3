import express from "express";
import passport from "./middleware/passport.middleware";
import cors from "cors";
import productRoutes from "./routes/product.router";
import authRoutes from "./routes/auth.router";
import userRoutes from "./routes/user.router";
import cartRoutes from "./routes/cart.router";
import orderRoutes from "./routes/order.router";
import sellerProductsRouter from "./routes/sellerProducts.router";
import cartItemRouter from "./routes/cartItem.router";
import productImagesRoutes from "./routes/productImages.router";

const app = express();

app.use(passport.initialize());
app.use(express.json());
app.use(cors());

app.use("/api/v1/products", productRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/seller-products", sellerProductsRouter);
app.use("/api/v1/cartItem", cartItemRouter);
app.use("/api/v1/productImages", productImagesRoutes);
// app.get('/', (_req, res) => res.send('hola'));

export default app;
