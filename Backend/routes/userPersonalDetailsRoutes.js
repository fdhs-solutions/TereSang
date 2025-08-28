import express from "express";
import UserPersonalDetailsController from "../controllers/userPersonalDetailsController.js";

const router = express.Router();

router.post("/:mobileNumber", UserPersonalDetailsController.save);
router.get("/", UserPersonalDetailsController.getAll);
router.get("/:id", UserPersonalDetailsController.getById);
router.put("/:mobileNumber", UserPersonalDetailsController.update);

export default router;
