import express from "express";
import {
  getUserImages,
  uploadUserImages,
} from "../controllers/userImageController.js";

const router = express.Router();

// POST /images/upload
router.post("/upload", uploadUserImages);

// GET /images/:userId
router.get("/:userId", getUserImages);

export default router;
