const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT) || 3000,
  mongoUri: process.env.MONGO_URI || "mongodb+srv://akpatel2131_db_user:S8vDygpRZK1ry6t7@cluster0.ay7xqrd.mongodb.net/?appName=Cluster0",
  jwtSecret: process.env.JWT_SECRET || "development_secret_change_me_before_deploying",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
  adminInviteCode: process.env.ADMIN_INVITE_CODE || "",
};

module.exports = env;
