import pino from "pino";

const LOG_LEVEL = process.env.NODE_ENV === "production" ? "warn" : "debug";

const transport = pino.transport(
  process.env.NODE_ENV === "production"
    ? {
        target: "pino/file",
        options: { destination: "dist/logs.txt", mkdir: true },
      }
    : { target: "pino-pretty" },
);
export const logger = pino(
  {
    name: "backend",
    level: LOG_LEVEL,
  },
  transport,
);
