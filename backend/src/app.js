require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

//middleware
app.use(cookieParser());
app.use(express.json());

//import routes 
const authRouter = require("./routes/auth.routes");
// mount routes
app.use("/api/auth", authRouter);

module.exports = app;
