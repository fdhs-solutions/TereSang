import express from "express";
import {
  createLifeStyle,
  getLifeStyle,
  updateLifeStyle,
} from "../controllers/services/userLifeStyleService.js";

const router = express.Router();

// POST /user-life-style
router.post("/", createLifeStyle);

// GET /user-life-style/:userId
router.get("/:userId", getLifeStyle);

// PUT /user-life-style/:userId
router.put("/:userId", updateLifeStyle);

export default router;
