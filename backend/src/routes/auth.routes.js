const express = require("express");
const authRouter = express.Router();

//import controller
const authController = require("../controllers/auth.controller");
const authUser = require("../middlewares/auth.middleware");

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

/**
 * Logout a user by blacklisting their token
 * @route POST /api/auth/logout
 * @description Logout a user by blacklisting their token
 * @access Public
 */
authRouter.post("/logout", authController.logoutUserController);

/**
 * get me endpoint to get current user details
 * @route GET /api/auth/get-me
 * @description Get current user details using the token from cookies
 * @access Private
 *  */  
authRouter.get("/get-me",authUser,authController.getMeController);

module.exports = authRouter;
  