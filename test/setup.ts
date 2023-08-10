import { initDb } from "../src/db/connection";

before(async () => {
  await initDb();
});
