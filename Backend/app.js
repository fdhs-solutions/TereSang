import dotenv from "dotenv";
import express from "express";

dotenv.config();

import appConfig from "./config/app/appConfig.js";
import routes from "./config/app/route.js";
import { connectDB } from "./config/db.js";

import errorHandler from "./middlewares/errorHandler.js";

const app = express();
connectDB();
appConfig(app);
app.use("/api", routes);

// 404 and error middleware
app.use((req, res) => res.status(404).json({ error: "Not Found" }));
app.use(errorHandler);

// Start server
const port = process.env.MYSQL_PORT || 9090;
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}/api`);
});
