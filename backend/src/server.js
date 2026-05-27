const app = require("./app");
const env = require("./config/env");
const { connectDatabase } = require("./config/database");

const startServer = async () => {
  try {
    await connectDatabase(env.mongoUri);

    app.listen(env.port, () => {
      console.log(`Backend server is running on port ${env.port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
