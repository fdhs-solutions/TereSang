import {
  errorResponse,
  notFoundResponse,
  successResponse,
  validationErrorResponse,
} from "../utils/responseHelper.js";
import {
  getUserImagesService,
  uploadUserImagesService,
} from "./services/userImageService.js";

// Upload user images
export const uploadUserImages = async (req, res, next) => {
  try {
    const profileImage = req.files?.profileImage?.[0]?.buffer || null;
    const gallery = req.files?.gallery?.map((f) => f.buffer) || [];
    const payload = { ...req.body, profileImage, gallery };

    const result = await uploadUserImagesService(payload);
    return successResponse(res, "User images uploaded successfully", result);
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

// Get user images
export const getUserImages = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const result = await getUserImagesService(userId);
    if (!result) return notFoundResponse(res, "User images not found");
    return successResponse(res, "User images fetched successfully", result);
  } catch (err) {
    return errorResponse(res, err.message || "Server error", [], 500);
  }
};
