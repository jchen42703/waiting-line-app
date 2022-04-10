import { NextFunction, Request, Response, Router } from "express";
import { HttpException } from "../lib/errors";
import { getAllQueuesForAdmin } from "../lib/models/queue";
import { GETQueueReq, GETQueueRes } from "@lyne/shared-dto/admin";
import { IQueue } from "@lyne/shared-dto";

function createAdminRouter() {
  const adminRouter: Router = Router();
  adminRouter.get(
    "/queues",
    async (
      req: Request<unknown, GETQueueRes, unknown, GETQueueReq>,
      res: Response<GETQueueRes, unknown>,
      next: NextFunction,
    ) => {
      const { adminId } = req.query;
      try {
        const qDoc: IQueue = await getAllQueuesForAdmin(adminId);
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
