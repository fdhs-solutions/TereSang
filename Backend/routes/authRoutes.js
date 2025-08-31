import express from "express";
import { loginUser, registerUser } from "../controllers/AuthController.js";
import { uploadSingle } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

// ✅ Register user (with profile image upload)
router.post("/register", uploadSingle("profileImage"), registerUser);

// ✅ Login user (use POST instead of GET)
router.post("/login", loginUser);

export default router;
