import { Request, Response, Router } from "express";
import { Queue } from "../lib/models/queue";
import { randomUUID } from "crypto";
import {
  POSTCreateReq,
  POSTCreateRes,
  POSTJoinReq,
  POSTJoinRes,
  POSTPopReq,
  POSTPopRes,
  GETProgressReq,
  GETProgressRes,
} from "@waiting-line-app/shared-dto/queue";

function createQueueRouter() {
  const queueRouter: Router = Router();

  interface IQueue {
    queueId: string;
    adminId: string;
    canJoin: boolean;
    queue: IUser[];
  }
  interface IUser {
    userId: string;
    initQTime: Date;
  }

  // Initializes a queue that holds the user data.
  // The queue is a document inside of the mongodb database collection.
  queueRouter.post(
    "/create",
    async (
      req: Request<unknown, POSTCreateRes, POSTCreateReq, unknown>,
      res: Response<POSTCreateRes, unknown>,
    ) => {
      const qId: string = randomUUID();
      await Queue.create({
        queueId: qId,
        adminId: req.body.adminId,
        canJoin: true,
        queue: [],
      });

      res.json({ queueId: qId });
    },
  );

  // Posts user data to join a specified active queue
  queueRouter.post(
    "/join",
    async (
      req: Request<unknown, POSTJoinRes, POSTJoinReq, unknown>,
      res: Response<POSTJoinRes, unknown>,
    ) => {
      const userId: string = randomUUID();
      const user: IUser = {
        userId: userId,
        initQTime: new Date(),
      };

      await Queue.findOneAndUpdate(
        { queueId: req.body.queueId },
        { $push: { queue: user } },
      );

      res.json({ userId: userId });
    },
  );

  queueRouter.post(
    "/pop",
    async (
      req: Request<unknown, POSTPopRes, POSTPopReq, unknown>,
      res: Response<POSTPopRes, unknown>,
    ) => {
      const body = req.body;
      if (body.queueId === undefined) {
        res.status(400).json({ error: "JSON is undefined" });
      } else if (!body.queueId) {
        res.status(400).json({ error: "JSON is null" });
      } else {
        const popFirstInQueue: IQueue = await Queue.findOneAndUpdate(
          { queueId: body.queueId },
          { $pop: { queue: -1 } },
        );
        if (!popFirstInQueue) {
          res.status(400).json({ error: "queueId invalid" });
        } else if (popFirstInQueue.queue.length < 1) {
          res.status(400).json({ error: "Queue is empty" });
        } else {
          const poppedUser: IUser = popFirstInQueue.queue[0];
          res.json({ userId: poppedUser.userId });
        }
      }
    },
  );

  // Gets the users progress in queue
  queueRouter.get(
    "/progress",
    async (
      req: Request<unknown, GETProgressRes, unknown, GETProgressReq>,
      res: Response<GETProgressRes, unknown>,
    ) => {
      const query = req.query;
      // Gets the queue that the queried user should be in
      const qDoc: IQueue = await Queue.findOne({
        queueId: query.queueId,
      });

      const qLength: number = qDoc.queue.length;
      var currPlace: number = -1;
      // Get the user's current spot in line
      for (let i: number = 0; i < qLength; i++) {
        const qDocUser: IUser = qDoc.queue[i];
        if (qDocUser.userId === query.userId) {
          currPlace = i + 1; // + 1 because i is 0 indexed
          break;
        }
      }

      if (currPlace === -1) {
        res.status(400).json({
          error: `user ${query.userId} does not exist in queue ${query.queueId}`,
        });
      } else {
        res.json({
          userId: query.userId,
          queueId: query.queueId,
          currPlace: currPlace,
          total: qLength,
        });
      }
    },
  );
  return queueRouter;
}

export default createQueueRouter;
