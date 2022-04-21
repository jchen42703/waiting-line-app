import { model, Schema } from "mongoose";

export const userSchema = new Schema({
  userId: String,
  joinQTime: Number,
  name: String,
  email: String,
  phoneNumber: String,
  exitQTime: Number,
  status: String,
});

export const User = model("User", userSchema);
