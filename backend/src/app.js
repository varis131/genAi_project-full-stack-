require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

// 🔥 CORS Configuration
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://gen-ai-project-full-stack-dnbmnpd8g-movaris85-1628s-projects.vercel.app",
    ],
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
