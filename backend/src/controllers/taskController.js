const Task = require("../models/Task");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");

const ensureTaskAccess = (task, user) => {
  if (!task) {
    throw new ApiError(404, "Task not found.");
  }

  if (user.role !== "admin" && task.user.toString() !== user._id.toString()) {
    throw new ApiError(403, "You do not have access to this task.");
  }
};

const getTasks = asyncHandler(async (req, res) => {
  const query = req.user.role === "admin" ? {} : { user: req.user._id };
  const tasks = await Task.find(query)
    .sort({ createdAt: -1 })
    .populate("user", "name email role");

  return res.status(200).json({ tasks });
});

const getTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id).populate(
    "user",
    "name email role"
  );

  if (!task) {
    throw new ApiError(404, "Task not found.");
  }

  if (
    req.user.role !== "admin" &&
    task.user._id.toString() !== req.user._id.toString()
  ) {
    throw new ApiError(403, "You do not have access to this task.");
  }

  return res.status(200).json({ task });
});

const createTask = asyncHandler(async (req, res) => {
  const { title, description, priority, dueDate, tags, status } = req.body;

  const task = await Task.create({
    title,
    description,
    priority,
    dueDate: dueDate || null,
    tags: Array.isArray(tags) ? tags : [],
    status: status || "pending",
    completedAt: status === "completed" ? new Date() : null,
    user: req.user._id,
  });

  return res.status(201).json({
    message: "Task created successfully.",
    task: await task.populate("user", "name email role"),
  });
});

const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  ensureTaskAccess(task, req.user);

  const fields = ["title", "description", "priority", "dueDate", "status"];
  fields.forEach((field) => {
    if (typeof req.body[field] !== "undefined") {
      task[field] = req.body[field];
    }
  });

  if (typeof req.body.tags !== "undefined") {
    task.tags = Array.isArray(req.body.tags) ? req.body.tags : [];
  }

  if (typeof req.body.status !== "undefined") {
    task.completedAt = req.body.status === "completed" ? new Date() : null;
  }

  await task.save();

  return res.status(200).json({
    message: "Task updated successfully.",
    task: await task.populate("user", "name email role"),
  });
});

const toggleTaskStatus = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  ensureTaskAccess(task, req.user);

  task.status = task.status === "completed" ? "pending" : "completed";
  task.completedAt = task.status === "completed" ? new Date() : null;

  await task.save();

  return res.status(200).json({
    message: `Task marked as ${task.status}.`,
    task: await task.populate("user", "name email role"),
  });
});

const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  ensureTaskAccess(task, req.user);

  await task.deleteOne();

  return res.status(200).json({
    message: "Task deleted successfully.",
  });
});

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  toggleTaskStatus,
  deleteTask,
};
