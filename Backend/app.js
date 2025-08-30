import dotenv from "dotenv";
import express from "express";

dotenv.config();

import appConfig from "./config/app/appConfig.js";
import routes from "./config/app/route.js";
import { connectDB, sequelize } from "./config/db.js";

import errorHandler from "./middlewares/errorHandler.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();
// ⚡ Sync models with DB automatically
sequelize
  .sync({ alter: true }) // safely updates columns without dropping tables
  .then(() => console.log("✅ DB synced (alter)"))
  .catch((err) => console.error("❌ DB sync error:", err));

appConfig(app);

app.use("/api", routes);

// 404 and error middleware
app.use((req, res) => res.status(404).json({ error: "Not Found" }));
app.use(errorHandler);

// Start server
const port = process.env.PORT || 9090;
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}/api`);
});
