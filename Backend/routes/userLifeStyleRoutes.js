import express from "express";
import {
  createUserLifeStyle,
  getUserLifeStyle,
  updateUserLifeStyle,
} from "../controllers/userLifeStyleController.js";

const router = express.Router();

// POST /user-life-style
router.post("/", createUserLifeStyle);

// GET /user-life-style/:userId
router.get("/:userId", getUserLifeStyle);

// PUT /user-life-style/:mobileNumber
router.put("/:mobileNumber", updateUserLifeStyle);

export default router;
