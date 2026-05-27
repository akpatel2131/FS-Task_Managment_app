const User = require("../models/User");
const env = require("../config/env");
const { generateToken } = require("../services/tokenService");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");

const createAuthPayload = (user) => ({
  message: "Authentication successful.",
  token: generateToken(user),
  user: user.toJSON(),
});

const signup = asyncHandler(async (req, res) => {
  const { name, email, password, inviteCode } = req.body;

  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    throw new ApiError(409, "Email already exists.");
  }

  const role =
    inviteCode && env.adminInviteCode && inviteCode === env.adminInviteCode
      ? "admin"
      : "user";

  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  return res.status(201).json({
    ...createAuthPayload(user),
    message: "Account created successfully.",
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email.toLowerCase() }).select(
    "+password"
  );

  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, "Invalid email or password.");
  }

  return res.status(200).json(createAuthPayload(user));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  return res.status(200).json({
    user: req.user,
  });
});

module.exports = {
  signup,
  login,
  getCurrentUser,
};
