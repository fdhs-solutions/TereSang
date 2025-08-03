import express from "express";
import helmet from "helmet";
import corsConfig from "../corsConfig.js";
import rateLimit from "express-rate-limit";

// Create a function to set up shared middlewares
const appConfig = (app) => {
    app.use(helmet()); // Security headers
    app.use(corsConfig); // CORS setup
    // app.use(express.json()); // Parse JSON bodies
    app.use(express.json({ limit: '10mb' }));
    app.use(express.urlencoded({ extended: true, limit: '10mb' }));

    // API Rate Limiter
    const apiLimiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 1000, // Limit each IP to 100 requests per window
        message: "Too many requests, please try again later.",
    });
    app.use("/api", apiLimiter); // Apply only to API routes
};

export default appConfig;
