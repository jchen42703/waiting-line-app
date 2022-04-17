import {
  GETAdminInfoRes,
  GETQueueRes,
  GETSingleQueueReq,
  GETSingleQueueRes,
} from "@lyne/shared-dto";
import { NextFunction, Request, Response, Router } from "express";
import { HttpException } from "../lib/errors";
import { getAllQueuesForAdmin, Queue } from "../lib/models/queue";

function createAdminRouter() {
  const adminRouter = Router();
  adminRouter.get(
    "/queues",
    async (
      req: Request<unknown, GETQueueRes, unknown, unknown>,
      res: Response<GETQueueRes, unknown>,
      next: NextFunction,
    ) => {
      const adminId = req.user._id;
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

  adminRouter.get(
    "/singleQueue",
    async (
      req: Request<unknown, GETSingleQueueRes, unknown, GETSingleQueueReq>,
      res: Response<GETSingleQueueRes, unknown>,
      next: NextFunction,
    ) => {
      const { queueId } = req.query;
      if (typeof queueId !== "string") {
        return next(new HttpException(400, "queueId must be a string"));
      }

      const adminId = req.user._id;
      try {
        const qDoc = await Queue.findOne({ adminId, queueId });
        return res.json({
          queue: qDoc,
        });
      } catch (e) {
        return next(new HttpException(500, `invalid queue id for admin`));
      }
    },
  );

  adminRouter.get(
    "/info",
    async (
      req: Request<unknown, unknown, unknown, unknown>,
      res: Response<GETAdminInfoRes, unknown>,
      next: NextFunction,
    ) => {
      const { email, firstName, lastName } = req.user;
      try {
        return res.json({
          name: `${firstName} ${lastName}`,
          email,
        });
      } catch (e) {
        return next(new HttpException(500, `invalid admin session`));
      }
    },
  );

  return adminRouter;
}
export default createAdminRouter;
