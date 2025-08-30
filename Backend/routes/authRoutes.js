import express from "express";
import {
  loginUser,
  registerUser,
} from "../controllers/services/authService.js";

const router = express.Router();

// POST /auth/register
router.post("/register", registerUser);

// POST /auth/login
router.post("/login", loginUser);

export default router;
