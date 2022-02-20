import { Request, Response, Router } from "express";
import { Queue } from "../lib/models/queue";
import { randomUUID } from "crypto";

export const queueRouter = Router();

interface POSTCreateReq {
  adminId: string;
}

interface POSTCreateResp {
  queueId: string;
}

// Initializes a queue that holds the user data.
// The queue is a document inside of the mongodb database collection.
queueRouter.post("/create", async (req: Request, res: Response) => {
  const body: POSTCreateReq = req.body;

  const qId = randomUUID();
  await Queue.create({
    queueId: qId,
    adminId: body.adminId,
    canJoin: true,
    queue: [],
  });

  res.json({ queueId: qId } as POSTCreateResp);
});

// Posts user data to join a specified active queue
queueRouter.post("/join", async (req, res) => {
  const userId = randomUUID();
  const user = {
    userId: userId,
    initQTime: new Date(),
  };

  await Queue.findOneAndUpdate(
    { queueId: req.body.queueId },
    { $push: { queue: user } },
  );

  res.json({ userId: userId });
});

queueRouter.post("/pop", async (req, res) => {
  if (req.body.queueId === undefined) {
    res.status(400).json({ error: "JSON is undefined" });
  } else if (!req.body.queueId) {
    res.status(400).json({ error: "JSON is null" });
  } else {
    const poppedUser = await Queue.findOneAndUpdate(
      { queueId: req.body.queueId },
      { $pop: { queue: -1 } },
    );
    if (!poppedUser) {
      res.status(400).json({ error: "queueId invalid" });
    } else if (poppedUser.queue.length < 1) {
      res.status(400).json({ error: "Queue is empty" });
    } else {
      res.json({ userId: poppedUser.queue[0].userId });
    }
  }
});

// Gets the users progress in queue
queueRouter.get("/progress", async (req, res) => {
  // Gets the queue that the queried user should be in
  const qDoc = await Queue.findOne({ queueId: req.query.queueId });

  const qLength = qDoc.queue.length;
  var currPlace = -1;
  // Get the user's current spot in line
  for (let i = 0; i < qLength; i++) {
    if (qDoc.queue[i].userId === req.query.userId) {
      currPlace = i + 1; // + 1 because i is 0 indexed
      break;
    }
  }

  if (currPlace === -1) {
    res.status(400).json({
      error: `user ${req.query.userId} does not exist in queue ${req.query.queueId}`,
    });
  } else {
    res.json({
      userId: req.query.userId,
      queueId: req.query.queueId,
      currPlace: currPlace,
      total: qLength,
    });
  }
});
