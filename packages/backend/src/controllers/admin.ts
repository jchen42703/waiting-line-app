import { NextFunction, Request, Response, Router } from "express";
import { Queue } from "../lib/models/queue";
import { HttpException } from "../lib/errors";
import { GETQueueReq, GETQueueRes } from "@waiting-line-app/shared-dto/admin";
import { IQueue, IAdmin } from "@waiting-line-app/shared-dto/db";

const getAdminQueue = async (adminId: string) => {
  const admin: IAdmin = await Queue.find({ adminId });
  if (!admin) {
    throw new Error("admin not found");
  }
  const arrOfQueueProperties = [];
  for (let i = 0; i < admin.length; i++) {
    const queueProperties: IQueue = {
      queueName: admin[i].queueName,
      totalMemberInQueue: admin[i].queue.length,
      timeCreated: admin[i].timeCreated,
      liveDate: admin[i].liveDate,
      closeDate: admin[i].closeDate,
      repeatCycle: admin[i].repeatCycle,
    };
    arrOfQueueProperties.push(queueProperties);
  }
  return arrOfQueueProperties;
};

function createAdminRouter() {
  const adminRouter: Router = Router();
  adminRouter.get(
    "/queues",
    async (
      req: Request<unknown, GETQueueRes, unknown, GETQueueReq>,
      res: Response<unknown, unknown>,
      next: NextFunction,
    ) => {
      const { adminId } = req.query;
      try {
        const qDoc = await getAdminQueue(adminId);
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
