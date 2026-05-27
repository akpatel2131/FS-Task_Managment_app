const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

const connectDatabase = async (mongoUri) => {
  await mongoose.connect(mongoUri);
};

const disconnectDatabase = async () => {
  await mongoose.connection.close();
};

module.exports = {
  connectDatabase,
  disconnectDatabase,
};
