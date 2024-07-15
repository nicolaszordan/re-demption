import { createLogger, format, transports } from 'winston';
import fs from 'fs';
import path from 'path';

const logDir = 'logs';

// Create the logs directory if it doesn't exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`)
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'logs/queries.log' })
    ],
});

export default logger;

