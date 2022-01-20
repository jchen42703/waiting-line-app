const express = require("express");
const { Queue } = require("../lib//models/queue");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();

// Initializes a queue that holds the user data.
// The queue is a document inside of the mongodb database collection.
router.post("/create", async (req, res) => {
  const qId = uuidv4();
  await Queue.create({
    queueId: qId,
    adminId: req.body.adminId,
    queue: [],
  });

  res.json({ queueId: qId });
});

// Posts user data to join a specified active queue
router.post("/join", async (req, res) => {
  res.json({ userId: "user id" });
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
