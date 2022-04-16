import { model, Schema } from "mongoose";

export const userSchema = new Schema({
  userId: String,
  joinQTime: Number,
  name: String,
  email: String,
  phoneNumber: String,
  exitQTime: Number,
});

export const User = model("User", userSchema);
