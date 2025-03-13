import winston from "winston";
import path from "path";
import fs from "fs";

const logDir = path.join(process.cwd(), "backend", "logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const customLevels = {
  error: 0,
  warn: 1,
  success: 2,
  info: 3,
  http: 4,
  debug: 5,
};

winston.addColors({
  error: "red",
  warn: "yellow",
  success: "green",
  info: "cyan",
  http: "magenta",
  debug: "blue",
});

const customFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

export const logger = winston.createLogger({
  levels: customLevels,
  level: "debug",
  format: winston.format.combine(winston.format.timestamp(), customFormat),
  transports: [
    new winston.transports.File({
      filename: path.join(logDir, "requests.log"),
      level: "debug",
    }),
  ],
});
