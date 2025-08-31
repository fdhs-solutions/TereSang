import {
  errorResponse,
  notFoundResponse,
  successResponse,
} from "../utils/responseHelper.js";
import {
  getAllProfilesService,
  getProfileByIdService,
  getProfileByMobileNumberService,
  getProfileImageByMobileNumberService, // ✅ new service
} from "./services/ViewProfilesService.js";

// Get all profiles with pagination
export const getAllProfiles = async (req, res) => {
  try {
    const { page = 0, size = 10, gender } = req.query;

    const data = await getAllProfilesService({
      page: parseInt(page),
      size: parseInt(size),
      gender,
    });

    if (!data.result.length) {
      return notFoundResponse(res, "No profiles found");
    }

    return successResponse(res, "Profiles fetched successfully", data);
  } catch (err) {
    return errorResponse(res, err.message || "Server error", [], 500);
  }
};

// Get profile by ID
export const getProfileById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await getProfileByIdService(userId);

    if (!user) return notFoundResponse(res, "Profile not found");
    return successResponse(res, "Profile fetched successfully", user);
  } catch (err) {
    return errorResponse(res, err.message || "Server error", [], 500);
  }
};

// Get profile by Mobile Number
export const getProfileByMobileNumber = async (req, res) => {
  try {
    const { mobileNumber } = req.params;
    const user = await getProfileByMobileNumberService(mobileNumber);

    if (!user) return notFoundResponse(res, "Profile not found");
    return successResponse(res, "Profile fetched successfully", user);
  } catch (err) {
    return errorResponse(res, err.message || "Server error", [], 500);
  }
};

// ✅ Get only profile image by mobile number
export const getProfileImageByMobileNumber = async (req, res) => {
  try {
    const { mobileNumber } = req.query; // query param
    if (!mobileNumber) {
      return errorResponse(
        res,
        "mobileNumber query param is required",
        [],
        400
      );
    }

    const user = await getProfileImageByMobileNumberService(mobileNumber);

    if (!user) {
      return notFoundResponse(res, "Profile not found");
    }

    return successResponse(res, "Profile image fetched successfully", user);
  } catch (err) {
    return errorResponse(res, err.message || "Server error", [], 500);
  }
};
