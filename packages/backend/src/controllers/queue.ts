import { NextFunction, Request, Response, Router } from "express";
import { randomUUID } from "crypto";
import type {
  POSTCreateReq,
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
  DELETEQueueReq,
  POSTEditQueueRes,
  POSTEditQueueReq,
} from "@lyne/shared-dto";
import { HttpException } from "../lib/errors";
import {
  addUserToQueue,
  getUserProgress,
  popFirstFromQueue,
  Queue,
  getAllUsers,
  deleteQueue,
  editQueueMetadata,
  addToPoppedList,
  banUser,
  getQueue,
} from "../lib/models/queue";

function createQueueRouter() {
  const queueRouter = Router();

  // Initializes a queue that holds the user data.
  // The queue is a document inside of the mongodb database collection.
  queueRouter.post(
    "/create",
    async (
      req: Request<unknown, POSTCreateRes, POSTCreateReq, unknown>,
      res: Response<POSTCreateRes, unknown>,
      next: NextFunction,
    ) => {
      const adminId = req.user._id;
      // validation
      if (!adminId || typeof adminId !== "string") {
        return next(new HttpException(400, "adminId must be a string"));
      }

      const {
        queueName,
        description,
        liveTime,
        closeTime,
        repeatCycle,
        advanceNotice,
      } = req.body;

      if (typeof queueName !== "string") {
        return next(new HttpException(400, "queueName must be a string"));
      }

      if (typeof description !== "string") {
        return next(new HttpException(400, "description must be a string"));
      }

      if (typeof liveTime !== "number") {
        return next(new HttpException(400, "liveTime must be a number"));
      }

      if (closeTime !== undefined && typeof closeTime !== "number") {
        return next(new HttpException(400, "closeTime must be a number"));
      }

      if (repeatCycle !== undefined && typeof repeatCycle !== "string") {
        return next(new HttpException(400, "repeatCycle must be a string"));
      }

      const qId = `q-${randomUUID()}`;
      try {
        await Queue.create({
          queueId: qId,
          queueName,
          description,
          timeCreated: Date.now(),
          liveTime,
          closeTime,
          repeatCycle,
          adminId,
          queue: [],
          poppedUsers: [],
          bannedUsers: [],
          advanceNotice,
        });
      } catch {
        return next(new HttpException(500, `Could not create queue`));
      }

      res.json({ queueId: qId });
    },
  );

  queueRouter.delete(
    "/delete",
    async (
      req: Request<unknown, unknown, DELETEQueueReq, unknown>,
      res: Response<unknown, unknown>,
      next: NextFunction,
    ) => {
      const adminId = req.user._id;
      // validation
      if (!adminId || typeof adminId !== "string") {
        return next(new HttpException(400, "adminId must be a string"));
      }

      const { queueId } = req.body;

      if (typeof queueId !== "string") {
        return next(new HttpException(400, "queueId must be a string"));
      }

      try {
        const deletedResult = await deleteQueue({ queueId, adminId });
        if (!deletedResult) {
          throw Error("failed to delete");
        }
      } catch {
        return next(new HttpException(500, `Could not create queue`));
      }

      res.sendStatus(200);
    },
  );

  queueRouter.post(
    "/edit",
    async (
      req: Request<unknown, POSTEditQueueRes, POSTEditQueueReq, unknown>,
      res: Response<POSTEditQueueRes, unknown>,
      next: NextFunction,
    ) => {
      const adminId = req.user._id;
      // validation
      if (!adminId || typeof adminId !== "string") {
        return next(new HttpException(400, "adminId must be a string"));
      }

      const {
        queueId,
        queueName,
        description,
        liveTime,
        closeTime,
        repeatCycle,
        advanceNotice,
      } = req.body;

      if (typeof queueId !== "string") {
        return next(new HttpException(400, "queueId must be a string"));
      }

      if (queueName && typeof queueName !== "string") {
        return next(new HttpException(400, "queueName must be a string"));
      }

      if (description && typeof description !== "string") {
        return next(new HttpException(400, "description must be a string"));
      }

      if (liveTime && typeof liveTime !== "number") {
        return next(new HttpException(400, "liveTime must be a number"));
      }

      if (closeTime !== undefined && typeof closeTime !== "number") {
        return next(new HttpException(400, "closeTime must be a number"));
      }

      if (repeatCycle !== undefined && typeof repeatCycle !== "string") {
        return next(new HttpException(400, "repeatCycle must be a string"));
      }

      if (advanceNotice && typeof advanceNotice !== "number") {
        return next(new HttpException(400, "advanceNotice must be a number"));
      }
      const updateParams = {
        queueName,
        description,
        liveTime,
        closeTime,
        repeatCycle,
        advanceNotice,
      };
      try {
        const qDoc = await editQueueMetadata(
          {
            queueId,
            adminId,
          },
          updateParams,
        );
        return res.json({ queue: qDoc });
      } catch {
        return next(new HttpException(500, `Could not edit queue`));
      }
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
        status: "waiting",
      };

      // Check if user is banned
      const queue = await getQueue({ queueId });
      for (const bannedUser of queue.bannedUsers) {
        if (
          user.email === bannedUser.email ||
          user.phoneNumber === bannedUser.phoneNumber
        ) {
          return next(new HttpException(401, "user is banned"));
        }
      }

      // Check if the queue is open
      const currTime = Date.now();
      if (currTime < queue.liveTime || currTime >= queue.closeTime) {
        return next(new HttpException(401, "queue is not live"));
      }

      // Otherwise, add to queue
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
        poppedUser.status = "popped";
        // get progress will search this list
        const out = await addToPoppedList(queueId, adminId, poppedUser);
        if (!out) {
          return next(
            new HttpException(
              500,
              `Could not pop for user ${poppedUser.userId}`,
            ),
          );
        }

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
        const { currPlace, qLength, userStatus } = await getUserProgress(
          queueId,
          userId,
        );

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
          status: userStatus,
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
    "/deleteUser",
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

      // 3. Only extract queueId for the adminId
      const adminId = req.user._id;
      const newQueue: IQueue = await Queue.findOneAndUpdate(
        { queueId, adminId },
        { $pull: { queue: { userId } } },
        { new: true },
      );

      if (newQueue === null) {
        return next(new HttpException(400, "QueueId or UserId is invalid"));
      }

      res.json({ queue: newQueue });
    },
  );

  queueRouter.post(
    "/banUser",
    async (
      req: Request<unknown, { success: boolean }, DELETEDeleteUserReq, unknown>,
      res: Response<{ success: boolean }, unknown>,
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

      const adminId = req.user._id;
      try {
        await banUser({ queueId, adminId, userId });
        return res.json({ success: true });
      } catch (e) {
        return next(new HttpException(500, e.message));
      }
    },
  );
  return queueRouter;
}

export default createQueueRouter;
