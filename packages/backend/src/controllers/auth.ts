import { Request, Response, Router } from "express";
import passport from "passport";
import { setupPassport } from "../lib/passport";

const { CLIENT_URL } = process.env;

function createAuthRouter() {
  setupPassport();

  const authRouter = Router();

  authRouter.get("/login/success", (req: Request, res: Response) => {
    if (req.user) {
      const options = {
        maxAge: 1000 * 60 * 60 * 24, // would expire after 1 day
        httpOnly: true, // The cookie only accessible by the web server
        signed: true,
      };

      // eslint-disable-next-line @typescript-eslint/dot-notation
      res.cookie("adminId", req.user["_id"], options);

      res.status(200).json({
        success: true,
        message: "successfull",
        user: req.user,
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
