import {
  errorResponse,
  notFoundResponse,
  successResponse,
  validationErrorResponse,
} from "../utils/responseHelper.js";
import {
  createPersonalDetailsService,
  getPersonalDetailsService,
  updatePersonalDetailsService,
} from "./services/UserPersonalDetailsService.js";

// Create
export const createUserPersonalDetails = async (req, res) => {
  try {
    const payload = req.body;
    const result = await createPersonalDetailsService(payload);
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

// Update
export const updateUserPersonalDetails = async (req, res) => {
  try {
    const { userId } = req.params;
    const payload = req.body;
    const result = await updatePersonalDetailsService(userId, payload);
    if (!result) return notFoundResponse(res, "Personal details not found");

    return successResponse(
      res,
      "Personal details updated successfully",
      result
    );
  } catch (err) {
    return errorResponse(res, err.message || "Server error", [], 500);
  }
};

// Get
export const getUserPersonalDetails = async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await getPersonalDetailsService(userId);
    if (!result) return notFoundResponse(res, "Personal details not found");

    return successResponse(
      res,
      "Personal details retrieved successfully",
      result
    );
  } catch (err) {
    return errorResponse(res, err.message || "Server error", [], 500);
  }
};
