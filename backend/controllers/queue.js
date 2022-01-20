const express = require("express");

const router = express.Router();

// Initializes a queue that holds the user data.
router.post("/create", async (req, res) => {
  res.json({ queueId: "queue id" });
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
