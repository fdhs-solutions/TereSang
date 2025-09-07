import express from "express";
import {
  createUserPartnerPreferences,
  getUserPartnerPreferences,
  updateUserPartnerPreferences,
} from "../controllers/userPartnerPreferencesController.js";

const router = express.Router();

// POST /user-partner-preferences
router.post("/", createUserPartnerPreferences);

// GET /user-partner-preferences/:mobileNumber
router.get("/:mobileNumber", getUserPartnerPreferences);

// PUT /user-partner-preferences/:mobileNumber
router.put("/:mobileNumber", updateUserPartnerPreferences);

export default router;
