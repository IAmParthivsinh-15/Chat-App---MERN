import express from "express";
import { login, signup, logout } from "../controllers/auth.js";
import protectRoutes from "../middleware/protectRoutes.js";

const router = express.Router();

router.post("/login", login);
router.post("/logout", logout);
router.post("/signup", signup);

export default router;
