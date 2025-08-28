import express from "express";
import UserPartnerPreferencesController from "../controllers/userPartnerPreferencesController.js";

const router = express.Router();

router.post("/:mobileNumber", UserPartnerPreferencesController.save);
router.get("/", UserPartnerPreferencesController.getAll);
router.get("/:id", UserPartnerPreferencesController.getById);
router.put("/:mobileNumber", UserPartnerPreferencesController.update);

export default router;
