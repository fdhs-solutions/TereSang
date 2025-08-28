import express from "express";
import multer from "multer";
import {
  createUserProfile,
  loginProfile,
  updateUserProfile,
} from "../controllers/userProfileController.js";

const router = express.Router();

// Multer setup for file uploads (profile image)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "_" + file.originalname),
});
const upload = multer({ storage });

router.post(
  "/create-profile",
  upload.single("profileImage"),
  createUserProfile
);
router.get("/login-profile", loginProfile);
router.put("/update-profile", updateUserProfile);

export default router;
