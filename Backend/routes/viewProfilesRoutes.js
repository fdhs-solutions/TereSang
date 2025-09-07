import express from "express";
import {
  getAllProfiles,
  getProfileById,
  getProfileByMobileNumber,
  getProfileImageByMobileNumber,
  getAllUserDetails,
} from "../controllers/viewProfilesController.js";

const router = express.Router();

// GET /api/user/profiles?page=0&size=10&gender=male
router.get("/profiles", getAllProfiles);

// ✅ Put static route before dynamic ones
router.get("/profile-image", getProfileImageByMobileNumber);

// GET /api/user/mobile/:mobileNumber
router.get("/mobile/:mobileNumber", getProfileByMobileNumber);

// GET /api/user/get-user-all-details
router.get("/get-user-all-details", getAllUserDetails);

// GET /api/user/:userId (must always be last!)
router.get("/:userId", getProfileById);

export default router;
