import { NextFunction, Request, Response } from "express";
import AdminService from "../lib/models/admin/admin";

const cookieValidator = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // parse the admin id and check against the database
  const adminId = req.signedCookies["adminId"];
  const isAdmin = await AdminService.validateAdmin({ adminId });

  // call next
  if (isAdmin) {
    return next();
  }
  // otherwise unauthorized
  res.status(401).json({ error: "Invalid cookies" });
};

export default cookieValidator;
