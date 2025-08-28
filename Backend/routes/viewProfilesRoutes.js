import express from "express";
import {
  changePassword,
  deleteUser,
  forgotPassword,
  getAllUserDetails,
  getProfileImage,
  viewAllProfiles,
} from "../controllers/viewProfilesController.js";

const router = express.Router();

router.get("/profiles", viewAllProfiles);
router.get("/profile-image", getProfileImage);
router.get("/get-user-all-details", getAllUserDetails);
router.post("/forgot-password", forgotPassword);
router.put("/:mobileNumber/change-password", changePassword);
router.delete("/:mobileNumber/delete-user", deleteUser);

export default router;
