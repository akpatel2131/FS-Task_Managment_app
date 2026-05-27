const express = require("express");

const { getUsers, getAdminOverview } = require("../controllers/userController");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router.use(protect, authorize("admin"));
router.get("/", getUsers);
router.get("/overview", getAdminOverview);

module.exports = router;
