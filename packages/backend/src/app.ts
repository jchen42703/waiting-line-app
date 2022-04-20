import express from "express";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import router from "./controllers";
import cookieValidator from "./middlewares/cookieValidator";
import errorMiddleware from "./middlewares/error";
import { oneDay, oneMinute, oneWeek } from "./lib/time";

const allowedOrigin = ["https://waitinglyne.org", "http://localhost:3000"];
// process.env.NODE_ENV === "production"
//   ? "https://waitinglyne.org"
//   : "http://localhost:3000";

export function createMainServer() {
  const app = express();
  app.use(express.json());
  app.use(
    cors({
      origin: allowedOrigin,
      methods: "GET,POST,PUT,DELETE",
      credentials: true,
    }),
  );

  app.use(
    session({
      secret: process.env.COOKIE_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: oneDay,
      },
      store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        dbName: "csds393",
        collectionName: "sessions",
        ttl: oneDay,
        autoRemove: "interval",
        autoRemoveInterval: 10,
        touchAfter: process.env.NODE_ENV === "production" ? oneMinute : oneWeek,
      }),
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(cookieValidator);

  app.use("/api", router);

  app.use(errorMiddleware); // catch-all for server errors
  return app;
}
