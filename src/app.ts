import express from "express";
import productRoutes from "./routes/product.router";
import db from "./db/connection";
// import db from "./db/connection";

const app = express();

app.use(express.json());

(async () => {
  try {
    await db.authenticate();

    if (process.env.NODE_ENV === "production") await db.sync();
    else await db.sync({ force: true });
    console.log("db synced");
  } catch (error: any) {
    console.log("error:", error.message);
  }
})();

app.use("/api/v1/products", productRoutes);
app.get("/", (_req, res) => res.send("hola"));

export default app;
