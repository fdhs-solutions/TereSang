import express from "express";
import {
  createProfile,
  login,
} from "../controllers/authenticationController.js";
import { uploadMixed } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

// Accept single profileImage + multiple gallery files
router.post("/register", uploadMixed, createProfile);
router.get("/login", login);

export default router;
