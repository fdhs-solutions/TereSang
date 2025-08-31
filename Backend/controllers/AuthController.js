import {
  errorResponse,
  notFoundResponse,
  successResponse,
  validationErrorResponse,
} from "../utils/responseHelper.js";
import {
  loginUserService,
  registerUserService,
} from "./services/AuthService.js";

// Register User
export const registerUser = async (req, res, next) => {
  try {
    const result = await registerUserService(req.body);
    return successResponse(res, "User registered successfully", result);
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

// Login User
export const loginUser = async (req, res, next) => {
  try {
    const { mobileNumber, password } = req.body;
    if (!mobileNumber || !password) {
      return validationErrorResponse(res, [
        !mobileNumber && "mobileNumber is required",
        !password && "password is required",
      ]);
    }

    const result = await loginUserService({ mobileNumber, password });

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
