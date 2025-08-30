import {
  createUserPartnerPreferences as createUserPartnerPreferencesService,
  getUserPartnerPreferences as getUserPartnerPreferencesService,
  updateUserPartnerPreferences as updateUserPartnerPreferencesService,
} from "../services/UserPartnerPreferencesService.js";
import {
  errorResponse,
  notFoundResponse,
  successResponse,
  validationErrorResponse,
} from "../utils/responseHelper.js";

export const createUserPartnerPreferences = async (req, res, next) => {
  try {
    const payload = req.body;
    const result = await createUserPartnerPreferencesService(payload);
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

export const updateUserPartnerPreferences = async (req, res, next) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const result = await updateUserPartnerPreferencesService(id, payload);
    if (!result) {
      return notFoundResponse(res, "Partner preferences not found");
    }
    return successResponse(
      res,
      "Partner preferences updated successfully",
      result
    );
  } catch (err) {
    return errorResponse(res, err.message || "Server error", [], 500);
  }
};

export const getUserPartnerPreferences = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getUserPartnerPreferencesService(id);
    if (!result) {
      return notFoundResponse(res, "Partner preferences not found");
    }
    return successResponse(
      res,
      "Partner preferences retrieved successfully",
      result
    );
  } catch (err) {
    return errorResponse(res, err.message || "Server error", [], 500);
  }
};
