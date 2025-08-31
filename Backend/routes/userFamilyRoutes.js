import express from "express";
import {
  createUserFamily,
  getUserFamily,
  updateUserFamily,
} from "../controllers/userFamilyController.js";

const router = express.Router();

// POST /user-family
router.post("/", createUserFamily);

// GET /user-family/:userId
router.get("/:userId", getUserFamily);

// PUT /user-family/:userId
router.put("/:userId", updateUserFamily);

export default router;
