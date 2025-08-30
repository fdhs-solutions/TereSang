import { errorResponse } from "../utils/responseHelper.js";

export const errorHandler = (err, req, res, next) => {
  console.error(err);
  const statusCode = err.status || 500;
  const message = err.message || "Internal Server Error";
  return errorResponse(res, message, [], statusCode);
};
