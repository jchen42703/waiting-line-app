const { format } = require("winston");
const winston = require("winston");

const tsFormat = () => {
  let d = new Date();
  let date = d.toLocaleDateString();
  let time = d.toLocaleTimeString();
  let m = d.getMilliseconds();
  let pmam = time.slice(-2);
  time = time.slice(0, -3).trim();
  let s = `${date} ${time}.${m} ${pmam}`;
  return s;
};

module.exports = function (prefix, file) {
  const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || "debug",
    transports: [],
  });

  if (process.env.NODE_ENV !== "production") {
    logger.add(
      new winston.transports.Console({
        format: format.combine(
          format.timestamp(),
          format.printf(({ level, message, label, timestamp }) => {
            return `${timestamp} [${level}]: ${message}`;
          })
        ),
        colorize: true,
        timestamp: tsFormat,
      })
    );
  }

  return logger;
};
