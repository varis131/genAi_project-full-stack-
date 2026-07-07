const mongoose = require("mongoose");

const turnSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    type: { type: String, enum: ["technical", "behavioral"], required: true },
    answer: { type: String, default: null },
    score: { type: Number, min: 0, max: 10, default: null },
    feedback: { type: String, default: null },
  },
  { _id: false },
);

const interviewSessionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    interviewReport: { type: mongoose.Schema.Types.ObjectId, ref: "InterviewReport" },
    turns: [turnSchema],
    status: { type: String, enum: ["active", "completed"], default: "active" },
    finalReport: {
      overallScore: Number,
      strengths: [String],
      weaknesses: [String],
      summary: String,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("InterviewSession", interviewSessionSchema);
