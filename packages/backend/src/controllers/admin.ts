import { GETQueueReq, GETQueueRes } from "@lyne/shared-dto";
import { NextFunction, Request, Response, Router } from "express";
import { HttpException } from "../lib/errors";
import { getAllQueuesForAdmin } from "../lib/models/queue";

function createAdminRouter() {
  const adminRouter = Router();
  adminRouter.get(
    "/queues",
    async (
      req: Request<unknown, GETQueueRes, unknown, GETQueueReq>,
      res: Response<GETQueueRes, unknown>,
      next: NextFunction,
    ) => {
      const { adminId } = req.query;
      try {
        const qDoc = await getAllQueuesForAdmin(adminId);
        return res.json({
          queues: qDoc,
        });
      } catch (e) {
        return next(new HttpException(500, `invalid adminId`));
      }
    },
  );

  return adminRouter;
}
export default createAdminRouter;
