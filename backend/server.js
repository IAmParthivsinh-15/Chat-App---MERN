import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import messageRoutes from "./routes/message.js";
import userRoutes from "./routes/user.js";
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const app = express();
app.use(cors());
app.use(express.json({ limit: '30mb' }));
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT;

// // FILE STORAGE

//routes

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);


const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("connected to database");
  } catch (error) {
    return console.log(`MongoDB connection error: ${error}`);
  }
};

app.listen(PORT, () => {
  connectDatabase();
  console.log(`Server is running on port ${PORT}`);
});
