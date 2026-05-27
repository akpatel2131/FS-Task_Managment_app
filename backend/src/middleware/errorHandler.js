const ApiError = require("../utils/ApiError");

const notFound = (req, res, next) => {
  next(new ApiError(404, `Route not found: ${req.originalUrl}`));
};

const errorHandler = (error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  let statusCode = error.statusCode || 500;
  let message = error.message || "Internal server error.";
  let details = error.details || null;

  if (error.name === "CastError") {
    statusCode = 400;
    message = "Invalid resource identifier.";
  }

  if (error.code === 11000) {
    statusCode = 409;
    const duplicatedField = Object.keys(error.keyPattern || {})[0] || "field";
    message = `${duplicatedField} already exists.`;
  }

  if (error.name === "ValidationError") {
    statusCode = 400;
    message = "Validation failed.";
    details = Object.values(error.errors).map((item) => item.message);
  }

  return res.status(statusCode).json({
    message,
    details,
    stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
  });
};

module.exports = {
  notFound,
  errorHandler,
};
