import {
  errorResponse,
  notFoundResponse,
  successResponse,
  validationErrorResponse,
} from "../utils/responseHelper.js";
import {
  createPartnerPreferencesService,
  getUserPartnerPreferencesService,
  updateUserPartnerPreferencesService,
} from "./services/UserPartnerPreferencesService.js";

// Create partner preferences
export const createUserPartnerPreferences = async (req, res, next) => {
  try {
    const payload = req.body;
    const result = await createPartnerPreferencesService(payload);
    return successResponse(
      res,
      "Partner preferences created successfully",
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

// Get partner preferences
export const getUserPartnerPreferences = async (req, res, next) => {
  try {
    const { userId } = req.params; // ✅ consistent param name
    const result = await getUserPartnerPreferencesService(userId);
    if (!result) return notFoundResponse(res, "Partner preferences not found");
    return successResponse(
      res,
      "Partner preferences retrieved successfully",
      result
    );
  } catch (err) {
    return errorResponse(res, err.message || "Server error", [], 500);
  }
};

// Update partner preferences
export const updateUserPartnerPreferences = async (req, res, next) => {
  try {
    const { userId } = req.params; // ✅ consistent param name
    const payload = req.body;
    const result = await updateUserPartnerPreferencesService(userId, payload);
    if (!result) return notFoundResponse(res, "Partner preferences not found");
    return successResponse(
      res,
      "Partner preferences updated successfully",
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
