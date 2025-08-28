import express from "express";
import { getAllUserDetails } from "../controllers/userController.js";

const router = express.Router();

// Endpoint to get all user details by mobile number
router.get("/:mobileNumber/all-details", getAllUserDetails);

export default router;
