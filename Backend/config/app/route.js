import express from "express";
import authRoutes from "../../routes/authRoutes.js";
import searchRoutes from "../../routes/searchRoutes.js";
import userFamilyRoutes from "../../routes/userFamilyRoutes.js";
import userImageRoutes from "../../routes/userImageRoutes.js";
import userLifeStyleRoutes from "../../routes/userLifeStyleRoutes.js";
import userPartnerPreferencesRoutes from "../../routes/userPartnerPreferencesRoutes.js";
import userPersonalDetailsRoutes from "../../routes/userPersonalDetailsRoutes.js";
import viewProfilesRoutes from "../../routes/viewProfilesRoutes.js";

const router = express.Router();

// Health check
router.get("/", (req, res) => res.json({ message: "API is live ✅" }));

/**
 * Auth routes (Swagger: /auth)
 * - POST /register : Register a new user
 * - POST /login : Login user
 */
router.use("/auth", authRoutes);

/**
 * User profile & details routes (Swagger: /user*)
 * - GET /user : View all profiles
 * - GET /user/:id : View single profile
 */
router.use("/user", viewProfilesRoutes);
router.use("/user-personal-details", userPersonalDetailsRoutes);
router.use("/user-partner-preferences", userPartnerPreferencesRoutes);
router.use("/user-life-style", userLifeStyleRoutes);
router.use("/user-family", userFamilyRoutes);

/**
 * Image routes (Swagger: /images)
 * - POST /images/upload : Upload profile or gallery images
 * - GET /images/:userId : Fetch user images
 */
router.use("/images", userImageRoutes);

/**
 * Admin/search routes (Swagger: /search)
 * - GET /search/users : Search users by filters
 */
router.use("/search", searchRoutes);

export default router;
