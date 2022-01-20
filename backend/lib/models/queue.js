const mongoose = require("mongoose");
const { userSchema } = require("./user");

const queueSchema = new mongoose.Schema(
  {
    queueId: String,
    adminId: String,
    queue: [userSchema],
  },
  { collection: "queues" }
);

const Queue = mongoose.model("Queue", queueSchema);
module.exports = {
  Queue,
};
