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
import { setupPassport } from "../lib/passport";

const { CLIENT_URL } = process.env;

function createAuthRouter() {
  setupPassport();

  const authRouter = Router();

  authRouter.get(
    "/login/success",
    (req: Request, res: Response, next: NextFunction) => {
      if (req.user) {
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
    req.logout();
    res.json({ success: true });
  });

  // Controls /api/auth/google --> opens up the login prompt
  // When successful, it hits /api/auth/google/callback
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
