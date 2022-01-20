const mongoose = require("mongoose");
const log = require("../log")();

// Creates and returns a mongoose.Connection
async function initMongoConnection() {
  const db = mongoose.createConnection(process.env.MONGO_URI);
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      log.info("successfully connected to mongodb");
    })
    .catch((err) => {
      log.error(
        "MongoDB connection error. Please make sure MongoDB is running: " + err
      );
    });
}

module.exports = initMongoConnection;
