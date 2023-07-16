import express from "express";
import productRoutes from "./routes/product.router";
import db from "./db/connection";

const app = express();

db.authenticate()
  .then((_res) => {
    console.log("database autenticate");
  })
  .catch((error) => {
    console.log(error);
  });

db.sync()
  .then(() => {
    console.log("database synced");
  })
  .catch((error) => console.log(error));
// }

app.use("/api/v1/products", productRoutes);

app.get("/", (_req, res) => res.send("hola"));

export default app;
