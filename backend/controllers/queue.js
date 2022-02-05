const express = require("express");
const { Queue } = require("../lib//models/queue");
const { v4: uuidv4 } = require("uuid");
const log = require("../lib/log")();

const router = express.Router();

// Initializes a queue that holds the user data.
// The queue is a document inside of the mongodb database collection.
router.post("/create", async (req, res) => {
  const qId = uuidv4();
  await Queue.create({
    queueId: qId,
    adminId: req.body.adminId,
    canJoin: true,
    queue: [],
  });

  res.json({ queueId: qId });
});

// Posts user data to join a specified active queue
router.post("/join", async (req, res) => {
  const userId = uuidv4();
  const user = {
    userId: userId,
    initQTime: new Date(),
  };

  await Queue.findOneAndUpdate(
    { queueId: req.body.queueId },
    { $push: { queue: user } }
  );

  res.json({ userId: userId });
});

// Posts user data to join a specified active queue
router.post("/pop", async (req, res) => {
  const body = req.body;
  console.log(body);
  // const userId = uuidv4();
  // const user = {
  //   userId: userId,
  //   initQTime: new Date(),
  // };

  // await Queue.findOneAndUpdate(
  //   { queueId: req.body.queueId },
  //   { $push: { queue: user } }
  // );

  res.json("hello world");
});

// Gets the users progress in queue
router.get("/progress", async (req, res) => {
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

module.exports = router;
