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
  getAllUserDetailsService,
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

export const getProfileImageByMobileNumber = async (req, res) => {
  try {
    const { mobileNumber } = req.query;
    if (!mobileNumber) {
      return res.status(400).json({
        status: false,
        message: "mobileNumber query param is required",
        errors: [],
      });
    }

    const user = await getProfileImageByMobileNumberService(mobileNumber);

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
        errors: [],
      });
    }

    if (!user.profileImage) {
      // Send default image or null
      return res.status(200).json({
        status: true,
        message: "No profile image uploaded",
        data: null,
      });
    }

    // Send raw image buffer
    res.set("Content-Type", user.extension || "image/jpeg");
    res.send(user.profileImage);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: false,
      message: "Server error",
      errors: [err.message],
    });
  }
};

// New controller function to get all user details with associated data
export const getAllUserDetails = async (req, res) => {
  try {
    const { mobileNumber } = req.query;
    if (!mobileNumber) {
      return res.status(400).json({
        status: false,
        message: "mobileNumber query param is required",
        errors: [],
      });
    }

    const userDetails = await getAllUserDetailsService(mobileNumber);

    if (!userDetails) {
      return res.status(404).json({
        status: false,
        message: "User details not found",
        errors: [],
      });
    }

    // Format the response to match frontend expectations
    const formattedResponse = {
      response: {
        ...userDetails.toJSON(), // Spread the main user details
        userFamilyDetails: userDetails.UserFamilyDetail || null,
        userPersonalDetails: userDetails.UserPersonalDetail || null,
        userLifeStyleAndEducation: userDetails.UserLifeStyleAndEducation || null,
        userPartnerPreferences: userDetails.UserPartnerPreference || null,
        userImages: userDetails.UserImage || null,
      }
    };

    return successResponse(res, "User details fetched successfully", formattedResponse);
  } catch (err) {
    return errorResponse(res, err.message || "Server error", [], 500);
  }
};
