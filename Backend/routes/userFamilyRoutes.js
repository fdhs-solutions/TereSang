import express from "express";
import {
  getAllUserFamilyDetails,
  getUserFamilyDetailsById,
  saveUserFamilyDetails,
  updateUserFamilyDetails,
} from "../controllers/userFamilyController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Protected routes
router.get("/user-family-details", authMiddleware, getAllUserFamilyDetails);
router.get(
  "/user-family-details/:id",
  authMiddleware,
  getUserFamilyDetailsById
);
router.post("/save-user-family-details", authMiddleware, saveUserFamilyDetails);
router.put(
  "/update-user-family-details/:mobileNumber",
  authMiddleware,
  updateUserFamilyDetails
);

export default router;
