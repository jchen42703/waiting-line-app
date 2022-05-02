import { connect, connection } from "mongoose";
import { logger } from "../log";
import { sleep } from "../time";

// Creates and returns a mongoose.Connection
export async function initMongoConnection() {
  await connect(process.env.MONGO_URI, {
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

  let ready = connection.readyState;
  if (ready !== 1) {
    await sleep(500);
    ready = connection.readyState;
  }
}
