import { Request } from "express";

export const stringifyReq = (req: Request) => {
  return JSON.stringify({
    headers: req.headers,
    method: req.method,
    url: req.url,
    httpVersion: req.httpVersion,
    body: req.body,
    cookies: req.cookies,
    path: req.path,
    protocol: req.protocol,
    query: req.query,
    hostname: req.hostname,
    ip: req.ip,
    originalUrl: req.originalUrl,
    params: req.params,
  });
};
