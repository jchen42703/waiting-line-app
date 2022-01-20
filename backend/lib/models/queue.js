const mongoose = require("mongoose");
const { userSchema } = require("./user");

const queueSchema = new mongoose.Schema(
  {
    queueId: String,
    adminId: String,
    canJoin: Boolean, // whether users are allowed to join the queue
    queue: [userSchema],
  },
  { collection: "queues" }
);

const Queue = mongoose.model("Queue", queueSchema);
module.exports = {
  Queue,
};
