const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

const env = require("./config/env");
const authRoutes = require("./routes/authRoutes");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const app = express();

app.use(
  cors({
    origin: env.clientUrl.split(",").map((origin) => origin.trim()),
    credentials: true,
  })
);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(env.nodeEnv === "production" ? "combined" : "dev"));

app.use("/api/auth", authRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
