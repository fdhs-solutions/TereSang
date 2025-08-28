// middlewares/authMiddleware.js
import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;

  if (!token) {
    return res.status(401).json({
      statusCode: 401,
      status: "Unauthorized",
      timeStamp: new Date().toISOString(),
      statusMessage: "Token is missing",
      description: req.originalUrl,
    });
  }

  try {
    // Verify JWT and decode payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info (you can add role, email, etc. depending on your payload)
    req.user = {
      id: decoded.userId || decoded.id || null,
      mobileNumber: decoded.mobileNumber || null,
      username: decoded.username || null,
      deviceId: decoded.deviceId || null,
    };

    next(); // continue to the next middleware/route
  } catch (err) {
    return res.status(401).json({
      statusCode: 401,
      status: "Unauthorized",
      timeStamp: new Date().toISOString(),
      statusMessage: err.message || "Invalid token",
      description: req.originalUrl,
    });
  }
};

export default authMiddleware;
