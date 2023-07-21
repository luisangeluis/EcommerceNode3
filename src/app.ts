import express from "express";
import productRoutes from "./routes/product.router";
import db from "./db/connection";
// import db from "./db/connection";

const app = express();

app.use(express.json());

(async () => {
  try {
    await db.authenticate();
    // .then(() => console.log("db authenticate"))
    // .catch(() => console.log("error authenticate"));

    if (process.env.NODE_ENV === "production") await db.sync();
    //   .then(() => console.log("db sync from production"))
    //   .catch((error) => console.log(`error:${error.message}`));
    else await db.sync({ force: true });
    //   .then(() => console.log("db sync from development"))
    //   .catch((error) => console.log(`error:${error.message}`));
    console.log("db synced");
  } catch (error: any) {
    console.log("error:", error.message);
  }
})();

app.use("/api/v1/products", productRoutes);
app.get("/", (_req, res) => res.send("hola"));

export default app;
