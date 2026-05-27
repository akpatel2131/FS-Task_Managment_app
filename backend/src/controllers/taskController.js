const mongoose = require("mongoose");

const Task = require("../models/Task");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");

const allowedSortFields = new Set(["createdAt", "updatedAt", "dueDate", "title"]);

const buildBaseQuery = (req) => {
  const { status, priority, search, scope, userId } = req.query;
  const query = {};

  if (req.user.role !== "admin" || scope !== "all") {
    query.user = req.user._id;
  } else if (userId && mongoose.isValidObjectId(userId)) {
    query.user = userId;
  }

  if (status && status !== "all") {
    query.status = status;
  }

  if (priority && priority !== "all") {
    query.priority = priority;
  }

  if (search?.trim()) {
    const regex = new RegExp(search.trim(), "i");
    query.$or = [
      { title: regex },
      { description: regex },
      { tags: regex },
    ];
  }

  return query;
};

const getTaskStats = async (query) => {
  const [all, completed, pending] = await Promise.all([
    Task.countDocuments(query),
    Task.countDocuments({ ...query, status: "completed" }),
    Task.countDocuments({ ...query, status: "pending" }),
  ]);

  return {
    all,
    completed,
    pending,
  };
};

const getTasks = asyncHandler(async (req, res) => {
  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(req.query.limit) || 6, 1), 50);
  const sortBy = allowedSortFields.has(req.query.sortBy)
    ? req.query.sortBy
    : "createdAt";
  const order = req.query.order === "asc" ? 1 : -1;
  const query = buildBaseQuery(req);

  const [tasks, total, stats] = await Promise.all([
    Task.find(query)
      .sort({ [sortBy]: order })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("user", "name email role"),
    Task.countDocuments(query),
    getTaskStats(
      req.user.role === "admin" && req.query.scope === "all"
        ? userScopeQuery(req)
        : { user: req.user._id }
    ),
  ]);

  return res.status(200).json({
    tasks,
    pagination: {
      page,
      limit,
      total,
      pages: Math.max(Math.ceil(total / limit), 1),
    },
    stats,
  });
});

const userScopeQuery = (req) => {
  if (req.query.userId && mongoose.isValidObjectId(req.query.userId)) {
    return { user: req.query.userId };
  }

  return {};
};

const getTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id).populate(
    "user",
    "name email role"
  );

  if (!task) {
    throw new ApiError(404, "Task not found.");
  }

  if (req.user.role !== "admin" && task.user._id.toString() !== req.user._id.toString()) {
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

  const populatedTask = await task.populate("user", "name email role");

  return res.status(201).json({
    message: "Task created successfully.",
    task: populatedTask,
  });
});

const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    throw new ApiError(404, "Task not found.");
  }

  if (req.user.role !== "admin" && task.user.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You do not have access to this task.");
  }

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

  if (!task) {
    throw new ApiError(404, "Task not found.");
  }

  if (req.user.role !== "admin" && task.user.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You do not have access to this task.");
  }

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

  if (!task) {
    throw new ApiError(404, "Task not found.");
  }

  if (req.user.role !== "admin" && task.user.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You do not have access to this task.");
  }

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
