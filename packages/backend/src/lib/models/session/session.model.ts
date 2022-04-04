import { model, Schema, Document } from "mongoose";
import { oneDay } from "../../time";

export interface ISession extends Document {
  sessionId: string;
  adminId: string;
  createdAt: Date;
}

export const sessionSchema = new Schema<ISession>(
  {
    // Unique doesn't work here for some reason :(
    sessionId: { type: String, unique: true },
    adminId: { type: String, unique: true },
    createdAt: { type: Date, expires: oneDay, default: Date.now },
  },
  { collection: "sessions" },
);

export const Session = model<ISession>("Session", sessionSchema);
