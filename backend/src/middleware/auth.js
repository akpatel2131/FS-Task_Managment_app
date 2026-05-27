const jwt = require("jsonwebtoken");

const env = require("../config/env");
const User = require("../models/User");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");

const protect = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization || "";

  if (!authHeader.startsWith("Bearer ")) {
    throw new ApiError(401, "Authentication required.");
  }

  const token = authHeader.replace("Bearer ", "").trim();

  try {
    const payload = jwt.verify(token, env.jwtSecret);
    const user = await User.findById(payload.sub).select("-password");

    if (!user) {
      throw new ApiError(401, "User no longer exists.");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, "Invalid or expired token.");
  }
});

module.exports = {
  protect,
};
