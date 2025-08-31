import {
  errorResponse,
  notFoundResponse,
  successResponse,
  validationErrorResponse,
} from "../utils/responseHelper.js";
import {
  createUserFamilyService,
  getUserFamilyService,
  updateUserFamilyService,
} from "./services/UserFamilyService.js";

// Create Family Details
export const createUserFamily = async (req, res, next) => {
  try {
    const result = await createUserFamilyService(req.body);
    return successResponse(
      res,
      "User family details created successfully",
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

// Get Family Details
export const getUserFamily = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const result = await getUserFamilyService(userId);
    if (!result) return notFoundResponse(res, "Family details not found");
    return successResponse(res, "Family details fetched successfully", result);
  } catch (err) {
    return errorResponse(res, err.message || "Server error", [], 500);
  }
};

// Update Family Details
export const updateUserFamily = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const result = await updateUserFamilyService(userId, req.body);
    if (!result) return notFoundResponse(res, "Family details not found");
    return successResponse(res, "Family details updated successfully", result);
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
