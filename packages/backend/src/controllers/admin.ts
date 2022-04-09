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
  const arrOfQueueProperties: IQueue = [];
  for (let i = 0; i < admin.length; i++) {
    const queueName: string = admin[i].queueName;
    const totalMemberInQueue: number = admin[i].queue.length;
    const timeCreated: number = admin[i].timeCreated;
    const liveDate: number = admin[i].liveDate;
    const closeDate: number = admin[i].closeDate;
    const repeatCycle: number = admin[i].repeatCycle;

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
        const qDoc: IQueue = await getAdminQueue(adminId);
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
