import express from "express";
import authRoutes from "../../routes/authRoutes.js";

const router = express.Router();

// 🔧 Add this line:
router.get("/", (req, res) => {
  res.json({ message: "API is live ✅" });
});

router.use("/auth", authRoutes);

export default router;
