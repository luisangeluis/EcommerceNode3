import express from "express";
import productRoutes from "./routes/product.router";
// import { initDb } from "./db/connection";

const app = express();

app.use(express.json());
// initDb()
//   .then((_res) => {
//     console.log("Db initialized");
//   })
//   .catch((error) => {
//     console.log(`error ${error.message}`);
//   });
app.use("/api/v1/products", productRoutes);

app.get("/", (_req, res) => res.send("hola"));

export default app;
