import {
  createUserPersonalDetails as createUserPersonalDetailsService,
  getUserPersonalDetails as getUserPersonalDetailsService,
  updateUserPersonalDetails as updateUserPersonalDetailsService,
} from "../services/UserPersonalDetailsService.js";
import {
  errorResponse,
  notFoundResponse,
  successResponse,
  validationErrorResponse,
} from "../utils/responseHelper.js";

export const createUserPersonalDetails = async (req, res, next) => {
  try {
    const payload = req.body;
    const result = await createUserPersonalDetailsService(payload);
    return successResponse(
      res,
      "Personal details created successfully",
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

export const updateUserPersonalDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const result = await updateUserPersonalDetailsService(id, payload);
    if (!result) {
      return notFoundResponse(res, "Personal details not found");
    }
    return successResponse(
      res,
      "Personal details updated successfully",
      result
    );
  } catch (err) {
    return errorResponse(res, err.message || "Server error", [], 500);
  }
};

export const getUserPersonalDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getUserPersonalDetailsService(id);
    if (!result) {
      return notFoundResponse(res, "Personal details not found");
    }
    return successResponse(
      res,
      "Personal details retrieved successfully",
      result
    );
  } catch (err) {
    return errorResponse(res, err.message || "Server error", [], 500);
  }
};
