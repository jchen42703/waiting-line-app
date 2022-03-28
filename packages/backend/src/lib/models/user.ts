import { model, Schema } from "mongoose";

export const userSchema = new Schema({
  userId: String,
  joinQTime: Number,
});

export const User = model("User", userSchema);
