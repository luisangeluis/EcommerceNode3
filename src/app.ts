import express from "express";
import passport from "./middleware/passport.middleware";
import productRoutes from "./routes/product.router";
import authRoutes from "./routes/auth.router";
import cartRoutes from "./routes/cart.router";
import orderRoutes from "./routes/order.router";

// setPassport(passport);

const app = express();

app.use(passport.initialize());
app.use(express.json());

app.use("/api/v1/products", productRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/orders", orderRoutes);
// app.get('/', (_req, res) => res.send('hola'));

export default app;
