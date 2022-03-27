import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { HttpException } from "../lib/errors";
import { stringifyReq } from "../lib/parse";
import { logger } from "../lib/log";
import { OperationalErrResp } from "@waiting-line-app/shared-dto/errors";

/**
 * Global uncaught error handler to prevent crash + catches operational errors
 *
 * @param error
 * @param req
 * @param res
 * @param _
 */
const errorMiddleware: ErrorRequestHandler = (
  error: HttpException | Error,
  req: Request,
  res: Response<OperationalErrResp, unknown>,
  _: NextFunction,
) => {
  // just in-case we accidentally send a regular error instead of an HTTPException
  const status = error instanceof HttpException ? error.status : 500;
  const message = error.message || "Something went wrong";

  // only log when server error
  if (status >= 500) {
    logger.info(`server error for req: ${stringifyReq(req)})}`);
    logger.error(error);
  }

  return res.status(status).json({
    message: message,
  });
};

export default errorMiddleware;
