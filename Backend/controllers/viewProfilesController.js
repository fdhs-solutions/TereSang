import { UserRegistrationProfile } from "../models/UserRegistrationProfile.js";
import {
  errorResponse,
  notFoundResponse,
  successResponse,
} from "../utils/responseHelper.js";

// Get all user profiles
export const getAllProfiles = async (req, res, next) => {
  try {
    const users = await UserRegistrationProfile.findAll();
    if (!users.length) {
      return notFoundResponse(res, "No profiles found");
    }
    return successResponse(res, "Profiles fetched successfully", users);
  } catch (err) {
    return errorResponse(res, err.message || "Server error", [], 500);
  }
};

// Get single user profile by mobile number
export const getProfileByMobileNumber = async (req, res, next) => {
  try {
    const { mobileNumber } = req.params;
    const user = await UserRegistrationProfile.findOne({
      where: { mobileNumber },
    });
    if (!user) {
      return notFoundResponse(res, "Profile not found");
    }
    return successResponse(res, "Profile fetched successfully", user);
  } catch (err) {
    return errorResponse(res, err.message || "Server error", [], 500);
  }
};
