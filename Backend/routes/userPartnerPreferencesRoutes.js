import express from "express";
import {
  createUserPartnerPreferences,
  getUserPartnerPreferences,
  updateUserPartnerPreferences,
} from "../controllers/userPartnerPreferencesController.js";

const router = express.Router();

// POST /user-partner-preferences
router.post("/", createUserPartnerPreferences);

// GET /user-partner-preferences/:userId
router.get("/:userId", getUserPartnerPreferences);

// PUT /user-partner-preferences/:userId
router.put("/:userId", updateUserPartnerPreferences);

export default router;
