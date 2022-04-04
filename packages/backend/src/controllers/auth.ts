import { randomUUID } from "crypto";
import {
  CookieOptions,
  NextFunction,
  Request,
  Response,
  Router,
} from "express";
import passport from "passport";
import { HttpException } from "../lib/errors";
import { createSession } from "../lib/models/session";
import { setupPassport } from "../lib/passport";
import { oneDay, oneWeek } from "../lib/time";

const { CLIENT_URL } = process.env;

function createAuthRouter() {
  setupPassport();

  const authRouter = Router();

  authRouter.get(
    "/login/success",
    (req: Request, res: Response, next: NextFunction) => {
      console.log("req.user: ", req.user);
      if (req.user) {
        const options: CookieOptions = {
          maxAge: oneDay, // would expire after 1 day
          httpOnly: true, // The cookie only accessible by the web server
          signed: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
        };

        // Create session cookie
        const sessId = randomUUID();
        // eslint-disable-next-line @typescript-eslint/dot-notation
        const createdSession = createSession(sessId, req.user["_id"]);
        if (!createdSession) {
          return next(
            new HttpException(500, "server failed to create admin session"),
          );
        }

        console.log("creating session cookies");
        res.cookie("session", sessId, options);
        // eslint-disable-next-line @typescript-eslint/dot-notation
        res.cookie("adminId", req.user["_id"], options);
        return res.status(200).json({
          success: true,
          message: "successful",
          user: req.user,
        });
      }
      return next(new HttpException(401, "Unauthorized"));
    },
  );

  authRouter.get("/login/failed", (req: Request, res: Response) => {
    res.status(401).json({
      success: false,
      message: "failure",
    });
  });

  authRouter.get("/logout", (req: Request, res: Response) => {
    res.clearCookie("adminId");
    res.clearCookie("session");
    req.logout();
    res.redirect(CLIENT_URL);
  });

  authRouter.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] }),
  );

  authRouter.get(
    "/google/callback",
    passport.authenticate("google", {
      successRedirect: CLIENT_URL,
      failureRedirect: "/login/failed",
    }),
  );

  authRouter.get(
    "/facebook",
    passport.authenticate("facebook", { scope: ["email"] }),
  );

  authRouter.get(
    "/facebook/callback",
    passport.authenticate("facebook", {
      successRedirect: CLIENT_URL,
      failureRedirect: "/login/failed",
    }),
  );
  return authRouter;
}

export default createAuthRouter;
