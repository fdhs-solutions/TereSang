const successResponse = (res, message, data) => {
  res.status(200).json({
    message,
    success: true,
    data,
  });
};

const errorResponse = (res, message, errors = [], statusCode = 400) => {
  res.status(statusCode).json({
    message,
    success: false,
    errors,
  });
};

export {
  errorResponse,
  successResponse,
};
