import { NextFunction, Request, Response, Router } from "express";
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
import { IUser } from "@waiting-line-app/shared-dto/db";
import { HttpException } from "../lib/errors";
import {
  addUserToQueue,
  getUserProgress,
  popFirstFromQueue,
  Queue,
} from "../lib/models/queue";

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

      const qId: string = `q-${randomUUID()}`;
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
      const { queueId, name, email, phoneNumber } = req.body;
      if (!queueId || typeof queueId !== "string") {
        return next(new HttpException(400, "queueId must be a string"));
      }

      const userId = `u-${randomUUID()}`;
      const user: IUser = {
        userId,
        joinQTime: Date.now(),
        name,
        email,
        phoneNumber,
      };

      try {
        const qDoc = await addUserToQueue({ queueId, user });
        if (!qDoc) {
          return next(new HttpException(400, "could not find queue"));
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

      const adminId: string = req.signedCookies["adminId"];
      try {
        const poppedFromQ = await popFirstFromQueue(queueId, adminId);
        if (!poppedFromQ) {
          return next(new HttpException(400, "queueId invalid"));
        }

        if (poppedFromQ.queue.length < 1) {
          return next(new HttpException(400, "Queue is empty"));
        }

        // sucess
        const poppedUser = poppedFromQ.queue[0];
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
      next: NextFunction,
    ) => {
      const { queueId, userId } = req.query;
      // Gets the queue that the queried user should be in
      try {
        const { currPlace, qLength } = await getUserProgress(queueId, userId);

        if (currPlace === -1) {
          return next(
            new HttpException(
              400,
              `user ${userId} does not exist in queue ${queueId}`,
            ),
          );
        }

        return res.json({
          userId,
          queueId,
          currPlace,
          total: qLength,
        });
      } catch (e) {
        return next(new HttpException(500, `invalid queueId`));
      }
    },
  );
  return queueRouter;
}

export default createQueueRouter;
