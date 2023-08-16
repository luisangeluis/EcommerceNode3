import express from "express";
import passport from "./middleware/passport.middleware";
import cors from "cors";
import productRoutes from "./routes/product.router";
import authRoutes from "./routes/auth.router";
import cartRoutes from "./routes/cart.router";
import orderRoutes from "./routes/order.router";
import sellerRouter from "./routes/seller.router";
import cartItemRouter from "./routes/cartItem.router";

const app = express();

app.use(passport.initialize());
app.use(express.json());
app.use(cors());

app.use("/api/v1/products", productRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/seller", sellerRouter);
app.use("/api/v1/cartItem", cartItemRouter);
// app.get('/', (_req, res) => res.send('hola'));

export default app;
