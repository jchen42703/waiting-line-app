const mongoose = require("mongoose");
const { userSchema } = require("./user");

const queueSchema = new mongoose.Schema({
  queueId: String,
  adminId: String,
  queue: [userSchema],
});

const Queue = mongoose.model("User", queueSchema);
module.exports = {
  Queue,
};
