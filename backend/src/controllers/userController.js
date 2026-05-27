const User = require("../models/User");
const Task = require("../models/Task");
const asyncHandler = require("../utils/asyncHandler");

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").sort({ createdAt: -1 });

  return res.status(200).json({
    users,
  });
});

const getAdminOverview = asyncHandler(async (req, res) => {
  const [userCount, taskCount, completedTasks] = await Promise.all([
    User.countDocuments(),
    Task.countDocuments(),
    Task.countDocuments({ status: "completed" }),
  ]);

  return res.status(200).json({
    overview: {
      users: userCount,
      tasks: taskCount,
      completedTasks,
      pendingTasks: taskCount - completedTasks,
    },
  });
});

module.exports = {
  getUsers,
  getAdminOverview,
};
