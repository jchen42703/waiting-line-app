import { model, Schema } from "mongoose";

import { userSchema } from "../user";

export const queueSchema = new Schema(
  {
    queueId: String,
    queueName: String,
    description: String,
    adminId: String,
    canJoin: Boolean, // whether users are allowed to join the queue
    queue: [userSchema],
  },
  { collection: "queues" },
);

export const Queue = model("Queue", queueSchema);
