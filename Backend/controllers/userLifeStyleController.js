import {
  errorResponse,
  notFoundResponse,
  successResponse,
  validationErrorResponse,
} from "../utils/responseHelper.js";
import {
  createUserLifeStyleService,
  getUserLifeStyleService,
  updateUserLifeStyleService,
} from "./services/UserLifeStyleService.js";

// Create user lifestyle details
export const createUserLifeStyle = async (req, res, next) => {
  try {
    const payload = req.body;
    const result = await createUserLifeStyleService(payload);
    return successResponse(
      res,
      "User lifestyle details created successfully",
      result
    );
  } catch (err) {
    if (err.name === "SequelizeValidationError") {
      return validationErrorResponse(
        res,
        err.errors.map((e) => e.message),
        "Validation Error"
      );
    }
    return errorResponse(res, err.message || "Server error", [], 500);
  }
};

// Get user lifestyle details
export const getUserLifeStyle = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const result = await getUserLifeStyleService(userId);
    if (!result)
      return notFoundResponse(res, "User lifestyle details not found");
    return successResponse(
      res,
      "User lifestyle details fetched successfully",
      result
    );
  } catch (err) {
    return errorResponse(res, err.message || "Server error", [], 500);
  }
};

// Update user lifestyle details
export const updateUserLifeStyle = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const payload = req.body;
    const result = await updateUserLifeStyleService(userId, payload);
    if (!result)
      return notFoundResponse(res, "User lifestyle details not found");
    return successResponse(
      res,
      "User lifestyle details updated successfully",
      result
    );
  } catch (err) {
    if (err.name === "SequelizeValidationError") {
      return validationErrorResponse(
        res,
        err.errors.map((e) => e.message),
        "Validation Error"
      );
    }
    return errorResponse(res, err.message || "Server error", [], 500);
  }
};
