import express from "express";
import {
  createFamilyDetails,
  getFamilyDetails,
  updateFamilyDetails,
} from "../controllers/services/userFamilyService.js";

const router = express.Router();

// POST /user-family
router.post("/", createFamilyDetails);

// GET /user-family/:userId
router.get("/:userId", getFamilyDetails);

// PUT /user-family/:userId
router.put("/:userId", updateFamilyDetails);

export default router;
