import { NextFunction, Request, Response, Router } from "express";
import { randomUUID } from "crypto";
import type {
  POSTCreateRes,
  POSTJoinReq,
  POSTJoinRes,
  POSTPopReq,
  POSTPopRes,
  GETProgressReq,
  GETProgressRes,
  GETAllReq,
  GETAllRes,
  IQueue,
  IUser,
  DELETEDeleteUserReq,
  DELETEDeleteUserRes,
} from "@lyne/shared-dto";
import { HttpException } from "../lib/errors";
import {
  addUserToQueue,
  getUserProgress,
  popFirstFromQueue,
  Queue,
  getAllUsers,
} from "../lib/models/queue";

function createQueueRouter() {
  const queueRouter: Router = Router();

  // Initializes a queue that holds the user data.
  // The queue is a document inside of the mongodb database collection.
  queueRouter.post(
    "/create",
    async (
      req: Request<unknown, POSTCreateRes, unknown, unknown>,
      res: Response<POSTCreateRes, unknown>,
      next: NextFunction,
    ) => {
      const adminId = req.user._id;
      // validation
      if (!adminId || typeof adminId !== "string") {
        return next(new HttpException(400, "adminId must be a string"));
      }

      const qId = `q-${randomUUID()}`;
      try {
        await Queue.create({
          queueId: qId,
          adminId,
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
        const qDoc: IQueue = await addUserToQueue({ queueId, user });
        if (!qDoc) {
          return next(new HttpException(400, "could not find queue"));
        }
      } catch (e) {
        return next(new HttpException(500, "join failed"));
      }

      res.json({ userId });
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

      const adminId = req.user._id;
      try {
        const poppedFromQ: IQueue = await popFirstFromQueue(queueId, adminId);
        if (!poppedFromQ) {
          return next(new HttpException(400, "queueId invalid"));
        }

        if (poppedFromQ.queue.length < 1) {
          return next(new HttpException(400, "Queue is empty"));
        }

        // sucess
        const poppedUser: IUser = poppedFromQ.queue[0];
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

  queueRouter.get(
    "/all",
    async (
      req: Request<unknown, GETAllRes, unknown, GETAllReq>,
      res: Response<GETAllRes, unknown>,
      next: NextFunction,
    ) => {
      const { queueId } = req.query;
      const adminId = req.user._id;
      try {
        const usersInQueue: IUser[] = await getAllUsers(queueId, adminId);

        return res.json({
          users: usersInQueue,
        });
      } catch (e) {
        return next(new HttpException(500, `invalid queueId`));
      }
    },
  );

  queueRouter.delete(
    "/delete",
    async (
      req: Request<unknown, DELETEDeleteUserRes, DELETEDeleteUserReq, unknown>,
      res: Response<DELETEDeleteUserRes, unknown>,
      next: NextFunction,
    ) => {
      const { queueId, userId } = req.body;
      if (!queueId) {
        return next(new HttpException(400, "You need a queueId"));
      }

      if (!userId) {
        return next(new HttpException(400, "You need a userId"));
      }
      if (typeof queueId !== "string") {
        return next(new HttpException(400, "QueueId needs to be string"));
      }

      if (typeof userId !== "string") {
        return next(new HttpException(400, "userId needs to be string"));
      }

      const newQueue: IQueue = await Queue.findOneAndUpdate(
        { queueId },
        { $pull: { userId } },
        { new: true },
      );

      res.json({ queue: newQueue });
    },
  );
  return queueRouter;
}

export default createQueueRouter;
