const mongoose = require("mongoose");

/**
 *  -job description -Schema for interview report:String
 *  -resume text:String
 *  -self description:String
 *
 *  -match score:Number
 *
 *   Technical Questions:
 *   [{
 *     Question:""
 *     Intention:""
 *     Answer:""
 *    }]
 *
 *    Behavioral Questions:
 *    [{
 *      Question:""
 *      Intention:""
 *      Answer:""
 *    }]
 *
 *    -Skill gaps:[{
 *      Skills:""
 *      severity:{
 *      type:""
 *      num:["low","medium","high"]}
 *    }]
 *
 *    -Preparation plan:[{
 *       day:""
 *       focus:""
 *       tasks:"String"
 *     }]
 *
 *
 */

//sub schema for technical questions
const technicalQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "question is required"],
    },
    intention: {
      type: String,
      required: [true, "intention is required"],
    },
    answer: {
      type: String,
      required: [true, "answer is required"],
    },
  },
  {
    _id: false,
  },
);

//sub schema for behavioral questions
const behavioralQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "question is required"],
    },
    intention: {
      type: String,
      required: [true, "intention is required"],
    },
    answer: {
      type: String,
      required: [true, "answer is required"],
    },
  },
  {
    _id: false,
  },
);

//sub schema for skill gaps
const skillGapSchema = new mongoose.Schema(
  {
    skill: {
      type: String,
      required: [true, "skill is required"],
    },
    severity: {
      type: String,
      enum: ["low", "medium", "high"],
      required: [true, "severity is required"],
    },
  },
  {
    _id: false,
  },
);

//preparation plan schema for interview report
const preparationPlanSchema = new mongoose.Schema({
  day: {
    type: String,
    required: [true, "day is required"],
  },
  focus: {
    type: String,
    required: [true, "focus is required"],
  },
  tasks: [
    {
      type: String,
      required: [true, "tasks are required"],
    },
  ],
});


//main schema for interview report
const interviewReportSchema = new mongoose.Schema({
  jobDescription: {
    type: String,
    required: [true, "Job description is required"],
  },
  resume: {
    type: String,
  },
  selfDescription: {
    type: String,
  },
  matchScore: {
    type: Number,
    min: 0,
    max: 100,
  },
  technicalQuestions: [technicalQuestionSchema],
  behavioralQuestions: [behavioralQuestionSchema],
  skillGaps: [skillGapSchema],
  preparationPlan: [preparationPlanSchema],
},{
    timestamps: true,
});

const interviewReportModel = mongoose.model("InterviewReport", interviewReportSchema);

module.exports = interviewReportModel;
