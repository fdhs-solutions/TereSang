import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserRegistrationProfile from "../models/UserRegistrationProfile.js";
import {
  errorResponse,
  notFoundResponse,
  successResponse,
  validationErrorResponse,
} from "../utils/responseHelper.js";

// Register User
export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, mobileNumber, password, confirmPassword } =
      req.body;

    if (!mobileNumber || !password || !confirmPassword)
      return validationErrorResponse(res, ["All fields are required"]);

    if (password !== confirmPassword)
      return validationErrorResponse(res, ["Passwords do not match"]);

    const existingUser = await UserRegistrationProfile.findOne({
      where: { mobileNumber },
    });
    if (existingUser)
      return errorResponse(
        res,
        "User with this mobile number already exists",
        [],
        400
      );

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserRegistrationProfile.create({
      firstName,
      lastName,
      mobileNumber,
      password: hashedPassword,
      createdTime: new Date(),
      updatedTime: new Date(),
    });

    return successResponse(res, "User registered successfully", {
      id: newUser.id,
      mobileNumber,
    });
  } catch (err) {
    return errorResponse(res, err.message || "Server error", [], 500);
  }
};

// Login User
export const loginUser = async (req, res) => {
  try {
    const { mobileNumber, password } = req.body;

    if (!mobileNumber || !password)
      return validationErrorResponse(res, [
        "Mobile number and password are required",
      ]);

    const user = await UserRegistrationProfile.findOne({
      where: { mobileNumber },
    });
    if (!user) return notFoundResponse(res, "User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return errorResponse(res, "Invalid credentials", [], 401);

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, mobileNumber: user.mobileNumber },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const responseData = {
      userName: user.firstName,
      mobileNumber: user.mobileNumber,
      jwtToken: token,
      tokenExpirationInMilis: Date.now() + 3600 * 1000, // 1 hour
    };

    return successResponse(res, "Login successful", responseData);
  } catch (err) {
    return errorResponse(res, err.message || "Server error", [], 500);
  }
};
