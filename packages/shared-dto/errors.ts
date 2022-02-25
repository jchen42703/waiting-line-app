/**
 * Response from API Error Catching Middleware.
 *
 * Operational errors tend to be bad request bodies/queries (i.e. wrong types/format).
 *
 * Server errors will be exempt (throw 500+ for those errors).
 */
interface OperationalErrResp {
  status: number;
  message: string;
}
