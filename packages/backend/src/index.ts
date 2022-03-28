import { initMongoConnection } from "./lib/db/mongodb";
import "dotenv/config";
import { createMainServer } from "./app";

// initializes the db connection pool
initMongoConnection();

const app = createMainServer();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
