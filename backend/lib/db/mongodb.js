const mongoose = require("mongoose");
const log = require("../log")();

// Creates and returns a mongoose.Connection
async function createMongoConnection() {
  console.log("connectiong");
  const db = mongoose.createConnection(process.env.MONGO_URI);
  db.on("error", () => {
    log.error("MongoDB connection error. Please make sure MongoDB is running.");
    process.exit(1);
  });
  db.once("open", () => {
    log.info("connected to mongo");
  });
  return db;
}

module.exports = createMongoConnection;
