const express = require("express");
const { body } = require("express-validator");

const { signup, login, getCurrentUser } = require("../controllers/authController");
const { protect } = require("../middleware/auth");
const validate = require("../middleware/validate");

const router = express.Router();

router.post(
  "/signup",
  [
    body("name").trim().isLength({ min: 2 }).withMessage("Name must be at least 2 characters."),
    body("email").trim().isEmail().withMessage("Enter a valid email address."),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long."),
    body("inviteCode").optional().isString(),
  ],
  validate,
  signup
);

router.post(
  "/login",
  [
    body("email").trim().isEmail().withMessage("Enter a valid email address."),
    body("password").notEmpty().withMessage("Password is required."),
  ],
  validate,
  login
);

router.get("/me", protect, getCurrentUser);

module.exports = router;

