import pino from 'pino';

const LOG_LEVEL = process.env.NODE_ENV === 'production' ? 'warn' : 'debug';

export const logger = pino({
  name: 'backend',
  level: LOG_LEVEL,
});
