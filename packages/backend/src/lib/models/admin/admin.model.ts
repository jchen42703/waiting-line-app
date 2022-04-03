import { model, Schema } from "mongoose";

export interface IAdmin {
  adminId: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  source: string;
  lastVisited: Date;
}

export const adminSchema = new Schema<IAdmin>(
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

export const Admin = model<IAdmin>("Admin", adminSchema);
