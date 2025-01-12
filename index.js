const express = require("express");
const helmet = require("helmet");
const compression = require("compression");
const mongoSanitize = require("express-mongo-sanitize");
const cors = require("cors");
const authRoutes = require("./src/routes/auth");
const videoRoutes = require("./src/routes/video");

const app = express();

app.use(helmet());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(mongoSanitize());

app.use(compression());

app.use(cors());
app.options("*", cors());

app.use("/auth", authRoutes);
app.use("/videos", videoRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/health", (_, res) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: "OK",
    timestamp: new Date(),
  };

  res.status(200).json(healthcheck);
});

module.exports = app;
