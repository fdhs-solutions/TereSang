import express from "express";
import {
  createPersonalDetails,
  getPersonalDetails,
  updatePersonalDetails,
} from "../controllers/services/userPersonalDetailsService.js";

const router = express.Router();

// POST /user-personal-details
router.post("/", createPersonalDetails);

// GET /user-personal-details/:userId
router.get("/:userId", getPersonalDetails);

// PUT /user-personal-details/:userId
router.put("/:userId", updatePersonalDetails);

export default router;
