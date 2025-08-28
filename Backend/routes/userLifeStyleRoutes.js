import express from "express";
import UserLifeStyleController from "../controllers/userLifeStyleController.js";

const router = express.Router();

router.post("/:mobileNumber", UserLifeStyleController.save);
router.get("/", UserLifeStyleController.getAll);
router.get("/:id", UserLifeStyleController.getById);
router.put("/:mobileNumber", UserLifeStyleController.update);

export default router;
