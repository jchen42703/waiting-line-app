import { NextFunction, Request, Response } from "express";
import { validateAdmin } from "../lib/models/admin";

const cookieValidator = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Whitelisting urls that don't need to authenticated
  const whitelist = ["/api/queue/progress", "/api/queue/join", "/api/auth"];

  // req.url is the full requested url
  // (i.e. /api/queue/progress?queueId=db6bdf75-7ffd-4d68-ac54-74df2e2153fc&userId=4f1dab1b-028f-4233-ae31-2a84fc140758)
  for (let i = 0; i < whitelist.length; i++) {
    if (req.url.includes(whitelist[i]) || !req.url.includes("/api")) {
      return next();
    }
  }

  // parse the admin id and check against the database
  const { adminId } = req.signedCookies;
  const isAdmin = await validateAdmin({ adminId });

  // call next
  if (isAdmin) {
    return next();
  }

  // otherwise unauthorized
  return res.status(401).json({ error: "Invalid cookies" });
};

export default cookieValidator;
