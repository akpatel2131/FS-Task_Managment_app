const express = require("express");
const { body } = require("express-validator");

const {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  toggleTaskStatus,
  deleteTask,
} = require("../controllers/taskController");
const { protect } = require("../middleware/auth");
const validate = require("../middleware/validate");

const router = express.Router();

const taskValidation = [
  body("title")
    .optional()
    .trim()
    .isLength({ min: 1, max: 120 })
    .withMessage("Title must be between 1 and 120 characters."),
  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description must be 500 characters or fewer."),
  body("status")
    .optional()
    .isIn(["pending", "completed"])
    .withMessage("Status must be pending or completed."),
  body("priority")
    .optional()
    .isIn(["low", "medium", "high"])
    .withMessage("Priority must be low, medium, or high."),
  body("dueDate")
    .optional({ nullable: true })
    .isISO8601()
    .withMessage("Due date must be a valid date."),
  body("tags").optional().isArray().withMessage("Tags must be an array."),
];

router.use(protect);

router.get("/", getTasks);
router.get("/:id", getTaskById);

router.post(
  "/",
  [
    body("title")
      .trim()
      .isLength({ min: 1, max: 120 })
      .withMessage("Title is required and must be 120 characters or fewer."),
    ...taskValidation.filter((rule, index) => index !== 0),
  ],
  validate,
  createTask
);

router.patch("/:id", taskValidation, validate, updateTask);
router.patch("/:id/status", toggleTaskStatus);
router.delete("/:id", deleteTask);

module.exports = router;
