const express = require("express");
const { body } = require("express-validator");

const {
  signup,
  login,
  getCurrentUser,
} = require("../controllers/authController");
const { protect } = require("../middleware/auth");
const validate = require("../middleware/validate");

const router = express.Router();

router.post(
  "/signup",
  validate,
  signup
);

router.post(
  "/login",
  validate,
  login
);

router.get("/me", protect, getCurrentUser);

module.exports = router;
