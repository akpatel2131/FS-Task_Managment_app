const dotenv = require("dotenv");

dotenv.config();

const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT) || 5000,
  mongoUri:
    process.env.MONGO_URI || "mongodb://127.0.0.1:27017/task_management_app",
  jwtSecret:
    process.env.JWT_SECRET || "development_secret_change_me_before_deploying",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
  adminInviteCode: process.env.ADMIN_INVITE_CODE || "",
};

module.exports = env;
