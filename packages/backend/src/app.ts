import express from "express";
import cors from "cors";
import router from "./controllers";
import cookieSession from "cookie-session";
import passport from "passport";
import cookieParser from "cookie-parser";
import cookieValidator from "./middlewares/cookieValidator";
import errorMiddleware from "./middlewares/error";

const allowedOrigin =
  process.env.NODE_ENV === "production" ? "N/A" : "http://localhost:3000";

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
    cookieSession({
      name: "session",
      keys: [process.env.COOKIE_SECRET],
      maxAge: 24 * 60 * 60 * 100,
    }),
  );

  app.use(cookieParser(process.env.COOKIE_SECRET));

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(cookieValidator);

  app.use("/api", router);

  app.use(errorMiddleware); // catch-all for server errors
  return app;
}
