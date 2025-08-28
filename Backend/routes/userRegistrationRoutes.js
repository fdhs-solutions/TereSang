import express from "express";
import UserRegistrationController from "../controllers/userRegistrationController.js";

const router = express.Router();

router.post("/create", UserRegistrationController.createProfile);
router.post("/login", UserRegistrationController.userLogin);
router.put("/update", UserRegistrationController.updateProfile);
router.put(
  "/change-password/:mobileNumber",
  UserRegistrationController.changePassword
);
router.delete("/:mobileNumber", UserRegistrationController.deleteUser);

export default router;
