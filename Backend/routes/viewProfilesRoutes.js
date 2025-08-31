import express from "express";
import {
  getAllProfiles,
  getProfileById,
} from "../controllers/ViewProfilesController.js";

const router = express.Router();

// GET /user
router.get("/", getAllProfiles);

// GET /user/:userId
router.get("/:userId", getProfileById);

export default router;
