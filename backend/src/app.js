require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

// 🔥 CORS Configuration
app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true, // allow cookies
  }),
);

//middleware
app.use(cookieParser());
app.use(express.json());

//import routes
const authRouter = require("./routes/auth.routes");
// mount routes
app.use("/api/auth", authRouter);

module.exports = app;
