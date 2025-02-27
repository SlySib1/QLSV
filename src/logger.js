const winston = require("winston");
const path = require("path");

// Định nghĩa định dạng log
const logFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
});

// Tạo logger
const logger = winston.createLogger({
  level: "info", // Mức log: debug, info, warn, error
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.colorize(),
    logFormat
  ),
  transports: [
    new winston.transports.Console(), // Log ra terminal
    new winston.transports.File({ filename: path.join(__dirname, "logs", "app.log") }), // Ghi log vào file
  ],
});

module.exports = logger;