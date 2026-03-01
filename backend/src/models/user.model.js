const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Name is required"],
    unique: [true, "name is already taken"],
    trim: true,
    minlength: 3,
    maxlength: 50,
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "An account already exist with this eamil"],
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
  },

  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 6,
    select: false, // password normally response me nahi aayega
  },
});

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
