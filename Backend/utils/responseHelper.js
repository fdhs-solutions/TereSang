// utils/responseHandler.js

/**
 * Send a successful response
 * @param {Object} res - Express response object
 * @param {string} message - Success message
 * @param {any} data - Response data
 * @param {number} statusCode - HTTP status code (default 200)
 */
const successResponse = (res, message, data = null, statusCode = 200) => {
  res.status(statusCode).json({
    status: true,
    message,
    data,
  });
};

/**
 * Send an error response
 * @param {Object} res - Express response object
 * @param {string} message - Error message
 * @param {Array|Object} errors - Additional error details
 * @param {number} statusCode - HTTP status code (default 400)
 */
const errorResponse = (res, message, errors = [], statusCode = 400) => {
  res.status(statusCode).json({
    status: false,
    message,
    errors,
  });
};

/**
 * Send a validation error response
 * @param {Object} res - Express response object
 * @param {Array} errors - Array of validation error messages
 * @param {string} message - Optional message
 */
const validationErrorResponse = (
  res,
  errors = [],
  message = "Validation failed"
) => {
  res.status(422).json({
    status: false,
    message,
    errors,
  });
};

/**
 * Send a not found response
 * @param {Object} res - Express response object
 * @param {string} message - Optional message
 */
const notFoundResponse = (res, message = "Resource not found") => {
  res.status(404).json({
    status: false,
    message,
  });
};

export {
  errorResponse,
  notFoundResponse,
  successResponse,
  validationErrorResponse,
};
