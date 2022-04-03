import { NextFunction, Request, Response, Router } from "express";
import { Queue } from "../lib/models/queue";
import { HttpException } from "../lib/errors";
import { GETQueueReq, GETQueueRes } from "@waiting-line-app/shared-dto/admin";
//import { getAdminQueue } from "../lib/models/admin";
import { IQueue } from "@waiting-line-app/shared-dto/db";

const getAdminQueue = async (adminId: string) => {
  const admin = await Queue.find({ adminId });
  if (!admin) {
    throw new Error("admin not found");
  }
  const arr = [];
  for (let i = 0; i < admin.length; i++) {
    const queueProperties = {
      queueName: admin[i].queueId,
      totalMemberInQueue: admin[i].queue.length,
      //timeCreated: admin[i].
      //liveDate:
      //closeDate:
      //repeatCycle:
    };
    arr.push(queueProperties);
  }
  return arr;
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
        console.log(qDoc.length);
        //console.log(qDoc[0].queue[0].initQTime);
        console.log(qDoc);
        return res.json({
          queues: qDoc,
        });
      } catch (e) {
        return next(new HttpException(500, `invalid queueId`));
      }
    },
  );

  return adminRouter;
}
export default createAdminRouter;
