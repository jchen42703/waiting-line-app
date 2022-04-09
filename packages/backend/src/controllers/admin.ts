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
    const queueName: string = admin[i].queueName;
    const totalMemberInQueue: Number = admin[i].queue.length;
    const timeCreated: Number = admin[i].timeCreated;
    const liveDate: Number = admin[i].liveDate;
    const closeDate: Number = admin[i].closeDate;
    const repeatCycle: Number = admin[i].repeatCycle;

    const queueProperties: IQueue = {
      queueName,
      totalMemberInQueue,
      timeCreated,
      liveDate,
      closeDate,
      repeatCycle,
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
      res: Response<GETQueueRes, unknown>,
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
