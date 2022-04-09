import { User as ExpressUser } from "express";

declare global {
  namespace Express {
    interface User extends ExpressUser {
      _id: string;
      firstName: string;
      lastName: string;
      email: string;
    }
  }
}
