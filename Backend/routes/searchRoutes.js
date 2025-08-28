import express from "express";
import SearchController from "../controllers/searchController.js";

const router = express.Router();

// Add new search details
router.post("/", SearchController.add);

// Get all search details
router.get("/", SearchController.get);

export default router;
