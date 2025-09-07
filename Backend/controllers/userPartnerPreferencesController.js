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
    const { mobileNumber } = req.params; // changed param name to mobileNumber
    const result = await getUserPartnerPreferencesService(mobileNumber);
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
    const { mobileNumber } = req.params; // changed param name to mobileNumber
    const payload = req.body;
    const result = await updateUserPartnerPreferencesService(mobileNumber, payload);
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
