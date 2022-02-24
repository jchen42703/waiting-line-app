import express from "express";
import cors from "cors";
import { initMongoConnection } from "./lib/db/mongodb";
import "dotenv/config";
import router from "./controllers";
import cookieSession from "cookie-session";
import passport from "passport";

// initializes the db connection pool
initMongoConnection();

const app = express();
app.use(
  cookieSession({
    name: "session",
    keys: ["lama"],
    maxAge: 24 * 60 * 60 * 100,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(cors());

app.use("/api", router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
