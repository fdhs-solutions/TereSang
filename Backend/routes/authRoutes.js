import express from "express";
import { loginUser, registerUser, updatePrimaryDetails } from "../controllers/AuthController.js";
import { uploadSingle } from "../middlewares/uploadMiddleware.js";
import { authenticateJWT } from "../middlewares/authMiddleware.js";

const router = express.Router();

// ✅ Register user (with profile image upload)
router.post("/register", uploadSingle("profileImage"), registerUser);

// ✅ Login user (use POST instead of GET)
router.post("/login", loginUser);

// PUT /auth/update-profile?mobileNumber=...
router.put("/update-profile", authenticateJWT, uploadSingle("profileImage"), updatePrimaryDetails);

export default router;
