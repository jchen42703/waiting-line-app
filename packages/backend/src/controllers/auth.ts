import { Request, Response, Router } from "express";
import passport from "passport";
import { setupPassport } from "../lib/passport";

const CLIENT_URL = process.env.CLIENT_URL;

function createAuthRouter() {
  setupPassport();

  const authRouter = Router();

  authRouter.get("/login/success", (req: Request, res: Response) => {
    if (req.user) {
      res.status(200).json({
        success: true,
        message: "successfull",
        user: req.user,
        //   cookies: req.cookies
      });
    }
  });

  authRouter.get("/login/failed", (req: Request, res: Response) => {
    res.status(401).json({
      success: false,
      message: "failure",
    });
  });

  authRouter.get("/logout", (req: Request, res: Response) => {
    req.logout();
    res.redirect(CLIENT_URL);
  });

  authRouter.get(
    "/google",
    passport.authenticate("google", { scope: ["profile"] }),
  );

  authRouter.get(
    "/google/callback",
    passport.authenticate("google", {
      successRedirect: CLIENT_URL,
      failureRedirect: "/login/failed",
    }),
  );

  authRouter.get(
    "/github",
    passport.authenticate("github", { scope: ["profile"] }),
  );

  authRouter.get(
    "/github/callback",
    passport.authenticate("github", {
      successRedirect: CLIENT_URL,
      failureRedirect: "/login/failed",
    }),
  );

  authRouter.get(
    "/facebook",
    passport.authenticate("facebook", { scope: ["profile"] }),
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
