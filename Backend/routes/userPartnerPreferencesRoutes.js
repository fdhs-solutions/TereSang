import express from "express";
import {
  createPartnerPreferences,
  getPartnerPreferences,
  updatePartnerPreferences,
} from "../controllers/services/userPartnerPreferencesService.js";

const router = express.Router();

// POST /user-partner-preferences
router.post("/", createPartnerPreferences);

// GET /user-partner-preferences/:userId
router.get("/:userId", getPartnerPreferences);

// PUT /user-partner-preferences/:userId
router.put("/:userId", updatePartnerPreferences);

export default router;
