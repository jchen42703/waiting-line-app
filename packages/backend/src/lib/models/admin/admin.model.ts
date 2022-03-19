import { model, Schema } from "mongoose";

interface Admin {
  adminId: String;
  email: String;
  firstName: String;
  lastName: String;
  password: String;
  source: String;
  lastVisited: Date;
}

export const adminSchema = new Schema<Admin>(
  {
    adminId: String,
    email: {
      type: String,
      required: [true, "email required"],
      unique: true,
    },
    firstName: String,
    lastName: String,
    password: String,
    source: { type: String, required: [true, "source not specified"] },
    lastVisited: { type: Date, default: new Date() },
  },
  { collection: "admins" },
);

export const Admin = model<Admin>("Admin", adminSchema);
