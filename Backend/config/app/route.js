import express from "express";
import { authenticateJWT } from "../../middlewares/authMiddleware.js"; // Import JWT middleware
import authRoutes from "../../routes/authRoutes.js";
import searchRoutes from "../../routes/searchRoutes.js";
import userFamilyRoutes from "../../routes/userFamilyRoutes.js";
import userImageRoutes from "../../routes/userImageRoutes.js";
import userLifeStyleRoutes from "../../routes/userLifeStyleRoutes.js";
import userPersonalDetailsRoutes from "../../routes/userPersonalDetailsRoutes.js";
import viewProfilesRoutes from "../../routes/viewProfilesRoutes.js";

const router = express.Router();

// Health check
router.get("/", (req, res) => res.json({ message: "API is live ✅" }));

/**
 * Auth routes (Swagger: /auth)
 * - POST /register : Register a new user
 * - POST /login : Login user
 * No JWT required here
 */
router.use("/auth", authRoutes);

/**
 * User profile & details routes (Swagger: /user*)
 * - JWT protected routes
 */
router.use("/user", authenticateJWT, viewProfilesRoutes);
router.use(
  "/update-user-personal-details",
  authenticateJWT,
  userPersonalDetailsRoutes
);

router.use("/update-user-life-style-details", authenticateJWT, userLifeStyleRoutes);
router.use("/user-family", authenticateJWT, userFamilyRoutes);

/**
 * Image routes (Swagger: /images)
 * - JWT protected
 */
router.use("/images", authenticateJWT, userImageRoutes);

/**
 * Admin/search routes (Swagger: /search)
 * - JWT protected (add roles later if needed)
 */
router.use("/search", authenticateJWT, searchRoutes);

export default router;
