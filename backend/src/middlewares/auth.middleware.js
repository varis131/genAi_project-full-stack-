const jwt = require("jsonwebtoken");
const Blacklist = require("../models/blacklist.model");

async function authUser(req, res, next) {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token not provided.",
      });
    }
    // token mil gaya par check karlo kahi ye blacklist to nahi hai
    const tokenInBlacklist = await Blacklist.findOne({ token });
    if (tokenInBlacklist) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid.",
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid token.",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}

module.exports = authUser;
