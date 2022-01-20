const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: String,
  initQTime: Date,
});

const User = mongoose.model("User", userSchema);
module.exports = {
  User,
  userSchema,
};
