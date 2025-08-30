import express from "express";
import {
  getUserImages,
  uploadImages,
} from "../controllers/services/userImageService.js";

const router = express.Router();

// POST /images/upload
router.post("/upload", uploadImages);

// GET /images/:userId
router.get("/:userId", getUserImages);

export default router;
