import { NextFunction, Request, Response, Router } from "express";
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
import { HttpException } from "../lib/errors";

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

function createQueueRouter() {
  const queueRouter: Router = Router();

  // Initializes a queue that holds the user data.
  // The queue is a document inside of the mongodb database collection.
  queueRouter.post(
    "/create",
    async (
      req: Request<unknown, POSTCreateRes, POSTCreateReq, unknown>,
      res: Response<POSTCreateRes, unknown>,
      next: NextFunction,
    ) => {
      const adminId = req.body.adminId;
      // validation
      if (!adminId || typeof adminId !== "string") {
        return next(new HttpException(400, "adminId must be a string"));
      }

      // TODO: Check database that the admin id is valid
      // For now, let's assume that it is valid
      const adminExists = true;
      if (!adminExists) {
        return next(new HttpException(400, "invalid adminId"));
      }

      const qId: string = randomUUID();
      try {
        await Queue.create({
          queueId: qId,
          adminId: req.body.adminId,
          canJoin: true,
          queue: [],
        });
      } catch (e) {
        return next(
          new HttpException(500, `Could not create queue for ${adminId}`),
        );
      }

      res.json({ queueId: qId });
    },
  );

  // Posts user data to join a specified active queue
  queueRouter.post(
    "/join",
    async (
      req: Request<unknown, POSTJoinRes, POSTJoinReq, unknown>,
      res: Response<POSTJoinRes, unknown>,
      next: NextFunction,
    ) => {
      // Input validation
      const queueId = req.body.queueId;
      if (!queueId || typeof queueId !== "string") {
        return next(new HttpException(400, "queueId must be a string"));
      }

      const userId: string = randomUUID();
      const user: IUser = {
        userId: userId,
        initQTime: new Date(),
      };

      try {
        const qDoc: IQueue = await Queue.findOneAndUpdate(
          { queueId: req.body.queueId },
          { $push: { queue: user } },
        );
        if (!qDoc) {
          return next(new HttpException(400, "bad queueId"));
        }
      } catch (e) {
        return next(new HttpException(500, "join failed"));
      }

      res.json({ userId: userId });
    },
  );

  queueRouter.post(
    "/pop",
    async (
      req: Request<unknown, POSTPopRes, POSTPopReq, unknown>,
      res: Response<POSTPopRes, unknown>,
      next: NextFunction,
    ) => {
      // TODO: Add operation to pop a specific user when userId is specified
      const { queueId } = req.body;
      if (!queueId || typeof queueId !== "string") {
        // res.status(400).json({ error: "JSON is undefined" });
        return next(new HttpException(400, "queueId must be a string"));
      }

      try {
        const popFirstInQueue: IQueue = await Queue.findOneAndUpdate(
          { queueId: queueId },
          { $pop: { queue: -1 } },
        );
        if (!popFirstInQueue) {
          return next(new HttpException(400, "queueId invalid"));
        }

        if (popFirstInQueue.queue.length < 1) {
          return next(new HttpException(400, "Queue is empty"));
        }

        // sucess
        const poppedUser: IUser = popFirstInQueue.queue[0];
        return res.json({ userId: poppedUser.userId });
      } catch (e) {
        return next(new HttpException(500, `Could not pop for ${queueId}`));
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
