import { model, Schema } from "mongoose";

import { userSchema } from "../user";

export const queueSchema = new Schema(
  {
    queueId: String,
    queueName: String,
    description: String,
    timeCreated: Number,
    liveTime: Number,
    closeTime: Number,
    repeatCycle: String,
    adminId: String,
    queue: [userSchema],
    poppedUsers: [userSchema],
    bannedUsers: [userSchema],
  },
  { collection: "queues" },
);

export const Queue = model("Queue", queueSchema);
