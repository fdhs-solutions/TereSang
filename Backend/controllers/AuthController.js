import {
  errorResponse,
  successResponse,
  validationErrorResponse,
} from "../utils/responseHelper.js";
import {
  loginUserService,
  registerUserService,
  updatePrimaryDetailsService,
  changePasswordService,
} from "./services/AuthService.js";

// Register Controller
export const registerUser = async (req, res) => {
  try {
    const payload = {
      ...req.body,
      profileImage: req.file?.buffer || null,
      extension: req.file?.mimetype || null,
    };

    const newUser = await registerUserService(payload);

    return successResponse(res, "User registered successfully", {
      id: newUser.id,
      mobileNumber: newUser.mobileNumber,
    });
  } catch (err) {
    if (err.message.startsWith("Missing mandatory fields")) {
      return validationErrorResponse(res, [err.message]);
    }
    return errorResponse(res, err.message || "Server error");
  }
};

// Login Controller
export const loginUser = async (req, res) => {
  try {
    const { mobileNumber, password } = req.body;

    const result = await loginUserService({ mobileNumber, password });

    if (result.status !== 200)
      return errorResponse(res, result.message, [], result.status);

    return successResponse(res, "Login successful", {
      userName: result.user.firstName,
      mobileNumber: result.user.mobileNumber,
      jwtToken: result.jwtToken,
      tokenExpirationInMilis: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
    });
  } catch (err) {
    return errorResponse(res, err.message || "Server error", [], 500);
  }
};

// Update primary details
export const updatePrimaryDetails = async (req, res) => {
  try {
    // Get mobileNumber from JWT token instead of query params
    const mobileNumber = req.user.mobileNumber;
    const payload = { ...req.body };

    // Only add profileImage if a file was actually uploaded
    if (req.file?.buffer) {
      payload.profileImage = req.file.buffer;
      payload.extension = req.file.mimetype;
    }

    const result = await updatePrimaryDetailsService(mobileNumber, payload);
    if (!result) return errorResponse(res, "User not found", [], 404);

    return successResponse(
      res,
      "Primary details updated successfully",
      result
    );
  } catch (err) {
    return errorResponse(res, err.message || "Server error", [], 500);
  }
};

// Change password
export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const mobileNumber = req.user.mobileNumber; // From JWT

    if (!oldPassword || !newPassword) {
      return validationErrorResponse(res, ["Old password and new password are required"]);
    }

    const result = await changePasswordService(mobileNumber, oldPassword, newPassword);

    if (result.status !== 200) {
      return errorResponse(res, result.message, [], result.status);
    }

    return successResponse(res, result.message);
  } catch (err) {
    return errorResponse(res, err.message || "Server error", [], 500);
  }
};
