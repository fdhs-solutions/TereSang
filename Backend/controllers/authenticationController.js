import {
  createProfile as createProfileService,
  login as loginService,
} from "../services/authenticationService.js";
import {
  errorResponse,
  notFoundResponse,
  successResponse,
  validationErrorResponse,
} from "../utils/responseHelper.js";

// Create Profile Controller
export const createProfile = async (req, res, next) => {
  try {
    const profileImage = req.files?.profileImage?.[0]?.buffer || null;
    const gallery = req.files?.gallery?.map((f) => f.buffer) || [];
    const payload = { ...req.body, profileImage, gallery };

    const result = await createProfileService(payload);

    // Assuming createProfileService returns { status: 201, user }
    return successResponse(res, "Profile created successfully", result);
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

// Login Controller
export const login = async (req, res, next) => {
  try {
    const { mobileNumber, password } = req.query;

    if (!mobileNumber || !password) {
      return validationErrorResponse(res, [
        !mobileNumber && "mobileNumber is required",
        !password && "password is required",
      ]);
    }

    const result = await loginService({ mobileNumber, password });

    // Assuming loginService returns { status: 200/401/404, user/message }
    if (result.status === 200) {
      return successResponse(res, "Login successful", result.user);
    } else if (result.status === 404) {
      return notFoundResponse(res, result.message || "User not found");
    } else if (result.status === 401) {
      return errorResponse(
        res,
        result.message || "Invalid credentials",
        [],
        401
      );
    } else {
      return errorResponse(res, "Server error", [], 500);
    }
  } catch (err) {
    return errorResponse(res, err.message || "Server error", [], 500);
  }
};
