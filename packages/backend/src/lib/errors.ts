/**
 * To throw operational errors
 *
 * Usage:
 *     next(new HTTPException(400, "is an operational error pls check input"))
 */
export class HttpException extends Error {
  status: number;

  message: string;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}
