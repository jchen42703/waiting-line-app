import { Response, Router } from "express";

function createSessionRouter() {
  const sessionRouter = Router();
  sessionRouter.get("/verify", (_, res: Response) =>
    res.json({
      success: true,
    }),
  );

  return sessionRouter;
}

export default createSessionRouter;
