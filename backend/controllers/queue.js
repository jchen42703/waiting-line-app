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

// Gets the users progress in queue
router.get("/progress", async (req, res) => {
  res.json({
    userId: "user id",
    queueId: "queue id",
    currPlace: 4,
    total: 10,
  });
});

module.exports = router;
