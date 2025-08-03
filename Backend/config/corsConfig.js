import cors from "cors";

const corsOptions = {
  origin: "*", // Allow all origins (e.g., localhost, mobile, capacitor, ionic)
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization"
  ],
  credentials: false,
};

export default cors(corsOptions);
