import app from "./app";
import { initDb } from "./db/connection";

const PORT = 3000;

initDb()
  .then((_res: any) => {
    console.log("Db initialized");
  })
  .catch((error: any) => {
    console.log(`error ${error.message}`);
  });

app.listen(PORT, () => console.log(`server listen on port ${PORT}`));
