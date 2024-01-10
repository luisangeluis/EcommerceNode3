import app from './app';
import { initDb } from './db/connection';

const PORT = 3000;

initDb();

app.listen(PORT, () => console.log(`server listen on port ${PORT}`));

export default app;
