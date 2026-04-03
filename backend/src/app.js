require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

// 🔥 CORS Configuration
app.use(
  cors({
    origin: "https://your-vercel-url.vercel.app",
    credentials: true,
  }),
);

//middleware
app.use(cookieParser());
app.use(express.json());

//import routers
const authRouter = require("./routes/auth.routes");
const interviewRouter = require("./routes/interview.routes");
// mount routes
app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);

module.exports = app;
