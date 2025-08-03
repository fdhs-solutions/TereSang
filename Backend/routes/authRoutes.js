import express from "express";
import * as authController from "../controllers/authController.js";

const router = express.Router();

router.get("/login", authController.login);
router.post("/register", authController.register);

export default router;
