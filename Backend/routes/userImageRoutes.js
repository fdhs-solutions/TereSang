import express from "express";
import multer from "multer";
import UserImageController from "../controllers/userImageController.js";

const router = express.Router();
const upload = multer(); // Use memory storage

// Upload 10 images
router.post(
  "/upload",
  upload.fields(
    Array.from({ length: 10 }, (_, i) => ({ name: `image${i + 1}` }))
  ),
  UserImageController.upload
);

// Get all images by userId
router.get("/", UserImageController.get);

// Update image
router.put("/update", upload.single("image"), UserImageController.update);

// Delete image
router.delete("/delete", UserImageController.delete);

export default router;
