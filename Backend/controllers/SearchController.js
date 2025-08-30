import {
  errorResponse,
  successResponse,
  validationErrorResponse,
} from "../utils/responseHelper.js";
import { searchProfiles } from "./services/searchService.js";

// Search Profiles Controller
export const searchProfilesController = async (req, res, next) => {
  try {
    const { gender, fromAge, toAge, religion, motherTongue } = req.body;

    // Validate required fields
    if (!gender || !fromAge || !toAge || !religion || !motherTongue) {
      return validationErrorResponse(res, ["All search criteria are required"]);
    }

    const criteria = { gender, fromAge, toAge, religion, motherTongue };
    const results = await searchProfiles(criteria);

    return successResponse(res, "Profiles fetched successfully", results);
  } catch (error) {
    return errorResponse(res, error.message || "Server error", [], 500);
  }
};
