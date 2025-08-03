import { errorResponse } from "../utils/responseHelper.js";

const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);

  if (res.headersSent) {
    return next(err);
  }

  const statusCode = err.status || 500;
  const message = err.message || "Internal Server Error";
  const errors = err.errors || [message];

  errorResponse(res, message, errors, statusCode);
};

export default errorHandler;
