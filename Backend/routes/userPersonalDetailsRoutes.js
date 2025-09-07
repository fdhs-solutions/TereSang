import express from "express";
import {
  createUserPersonalDetails,
  getUserPersonalDetails,
  updateUserPersonalDetails,
} from "../controllers/userPersonalDetailsController.js";

const router = express.Router();

// POST /user-personal-details
router.post("/", createUserPersonalDetails);

// GET /user-personal-details/:userId
router.get("/:userId", getUserPersonalDetails);

// PUT /user-personal-details/:mobileNumber
router.put("/:mobileNumber", updateUserPersonalDetails);

export default router;
