import app from "./app";
import { initDb } from "./db/connection";

//TODO To change the main url in postman
//TODO To encrypt passwords
//TODO To make dinamycs tests

const PORT = 3000;

initDb();

app.listen(PORT, () => console.log(`server listen on port ${PORT}`));

export default app;
