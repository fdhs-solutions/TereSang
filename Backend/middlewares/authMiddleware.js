import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized. No token provided.",
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.userId, username: decoded.username, deviceId: decoded.deviceId };
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized. Invalid token.",
    });
  }
};

export default authMiddleware;
