import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import messageRoutes from "./routes/message.js";
import userRoutes from "./routes/user.js";
import { v2 as cloudinary } from "cloudinary";
import { logger } from "./utils/logger.js";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
app.use(cors());
app.use(express.json({ limit: "30mb" }));
app.use(cookieParser());

// logging Middleware
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use((req, res, next) => {
  const clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  res.on("finish", () => {
    logger.info(
      `${clientIp} - ${req.method} ${req.originalUrl} - ${
        res.statusCode
      } - ${req.get("User-Agent")}`
    );
  });
  next();
});

const PORT = process.env.PORT || 5000;

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ Connected to database");
  } catch (error) {
    console.log(`❌ MongoDB connection error: ${error}`);
  }
};

app.listen(PORT, () => {
  connectDatabase();
  console.log(`🚀 Server is running on port ${PORT}`);
});
