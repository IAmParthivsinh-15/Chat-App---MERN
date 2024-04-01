import express from "express";
import protectRoutes from "../middleware/protectRoutes.js";
import { sendMessage, getMessage } from "../controllers/message.js";

const router = express.Router();

router.get("/:id", protectRoutes, getMessage);

router.post("/send/:id", protectRoutes, sendMessage);

export default router;
