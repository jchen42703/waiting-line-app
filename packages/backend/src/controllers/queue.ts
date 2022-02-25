import { Request, Response, Router } from "express";
import { Queue } from "../lib/models/queue";
import { randomUUID } from "crypto";
import { Schema } from "mongoose";
import { User } from "../lib/models/user";

export const queueRouter: Router = Router();

interface IQueue {
  queueId: string;
  adminId: string;
  canJoin: boolean;
  queue: IUser[];
}
interface IUser {
  userId: String;
  initQTime: Date;
}

interface POSTCreateReq {
  adminId: string;
}
interface POSTCreateRes {
  queueId: string;
}
interface POSTJoinReq {
  queueId: string;
}
interface POSTJoinRes {
  userId: string;
}
interface POSTPopReq {
  queueId: string;
  userId: string;
}
interface POSTPopRes {
  userId: string;
  error: string;
}
interface POSTProgressReq {
  queueId: string;
  userId: string;
}
interface POSTProgressRes {
  error: string;
  queueId: string;
  userId: string;
  currPlace: number;
  total: number;
}
// Initializes a queue that holds the user data.
// The queue is a document inside of the mongodb database collection.
queueRouter.post("/create", async (req: Request, res: Response) => {
  const body: POSTCreateReq = req.body;

  const qId: string = randomUUID();
  await Queue.create({
    queueId: qId,
    adminId: body.adminId,
    canJoin: true,
    queue: [],
  });

  res.json({ queueId: qId } as POSTCreateRes);
});

// Posts user data to join a specified active queue
queueRouter.post("/join", async (req: Request, res: Response) => {
  const userId: string = randomUUID();
  const user: IUser = {
    userId: userId,
    initQTime: new Date(),
  };

  const body: POSTJoinReq = req.body;
  await Queue.findOneAndUpdate(
    { queueId: body.queueId },
    { $push: { queue: user } },
  );

  res.json({ userId: userId } as POSTJoinRes);
});

queueRouter.post("/pop", async (req: Request, res: Response) => {
  const body: POSTPopReq = req.body;
  if (body.queueId === undefined) {
    res.status(400).json({ error: "JSON is undefined" } as POSTPopRes);
  } else if (!body.queueId) {
    res.status(400).json({ error: "JSON is null" } as POSTPopRes);
  } else {
    const popFirstInQueue: IQueue = await Queue.findOneAndUpdate(
      { queueId: body.queueId },
      { $pop: { queue: -1 } },
    );
    if (!popFirstInQueue) {
      res.status(400).json({ error: "queueId invalid" } as POSTPopRes);
    } else if (popFirstInQueue.queue.length < 1) {
      res.status(400).json({ error: "Queue is empty" } as POSTPopRes);
    } else {
      const poppedUser: IUser = popFirstInQueue.queue[0];
      res.json({ userId: poppedUser.userId } as POSTPopRes);
    }
  }
});

// Gets the users progress in queue
queueRouter.get(
  "/progress",
  async (
    req: Request<unknown, unknown, unknown, POSTProgressReq>,
    res: Response,
  ) => {
    const query: POSTProgressReq = req.query;
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
      } as POSTProgressRes);
    } else {
      res.json({
        userId: query.userId,
        queueId: query.queueId,
        currPlace: currPlace,
        total: qLength,
      } as POSTProgressRes);
    }
  },
);
