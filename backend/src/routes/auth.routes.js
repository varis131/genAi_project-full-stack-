const express = require("express");
const authRouter = express.Router();

//import controller
const authController = require("../controllers/auth.controller");

/**
 * Register a new user
 * @route POST /api/auth/register
 * @description Register a new user with the provided details
 * @access Public
 */
authRouter.post("/register",authController.registerUserController);

/**
 * Login an existing user
 * @route POST /api/auth/login
 * @description Login an existing user with the provided email and password
 * @access Public
 */
authRouter.post("/login", authController.loginUserController);

module.exports = authRouter;
