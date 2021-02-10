const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
require('./mongoose-connexion');

// Import routes
const authRoute = require("./routes/auth");

// Application configuration
dotenv.config();

// Middlewares
const corsOptions = {
  exposedHeaders: "x-access-token",
};
app.use(cors(corsOptions));
app.use(express.json());

// Route Middlewares
app.use((req, res, next) => {
  console.log(`${new Date().toString()} => ${req.originalUrl}`);
  next();
});
app.use("/api/user", authRoute);

module.exports = app;
