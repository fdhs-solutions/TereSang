import express from "express";
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

// Feature routes
router.use("/search", searchRoutes);
router.use("/user-family", userFamilyRoutes);
router.use("/user-life-style", userLifeStyleRoutes);
router.use("/user-partner-preferences", userPartnerPreferencesRoutes);
router.use("/user-personal-details", userPersonalDetailsRoutes);
router.use("/images", userImageRoutes);
router.use("/view-profiles", viewProfilesRoutes);

export default router;
