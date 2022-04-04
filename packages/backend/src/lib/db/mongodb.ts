import { connect } from "mongoose";
import { logger } from "../log";

// Creates and returns a mongoose.Connection
export async function initMongoConnection() {
  connect(process.env.MONGO_URI, {
    autoIndex: true,
  })
    .then(() => {
      logger.info("successfully connected to mongodb");
    })
    .catch((err) => {
      logger.error(
        `MongoDB connection error. Please make sure MongoDB is running: ${err}`,
      );
    });
}
