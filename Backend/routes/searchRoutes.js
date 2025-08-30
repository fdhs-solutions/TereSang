import express from "express";
import { searchUsers } from "../controllers/services/searchService.js";

const router = express.Router();

// GET /search/users
router.get("/users", searchUsers);

export default router;
