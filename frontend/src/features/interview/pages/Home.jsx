import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useInterview } from "../hooks/useInterview";

const Home = () => {
  const navigate = useNavigate();
  const { generateReport, loading } = useInterview();

  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [resumeFile, setResumeFile] = useState(null);

  const handleSubmit = async () => {
    try {
      const report = await generateReport({
        jobDescription,
        selfDescription,
        resumeFile,
      });

      if (report) {
        navigate(`/interview/${report._id}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="relative min-h-screen bg-[#0b0f19] px-4 py-16 text-white flex flex-col items-center">
      {/* HEADING */}
      <div className="text-center mb-12 max-w-2xl">
        <h1 className="text-4xl font-bold">
          Create Your Custom{" "}
          <span className="text-pink-500">Interview Plan</span>
        </h1>

        <p className="text-gray-400 mt-3 text-sm">
          Let our AI analyze the job requirements and your unique profile to
          build a winning strategy.
        </p>
      </div>

      {/* MAIN CONTAINER */}
      <div className="w-full max-w-6xl bg-[#111827] border border-white/10 rounded-2xl p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* LEFT SIDE */}
        <div className="flex flex-col">
          <div className="flex items-center gap-3 mb-3">
            <h2 className="font-semibold text-lg">Target Job Description</h2>

            <span className="text-xs px-2 py-1 bg-pink-500/20 text-pink-400 rounded">
              REQUIRED
            </span>
          </div>

          <textarea
            placeholder="Paste the full job description here...
e.g. Senior Frontend Engineer at Google requires proficiency in React, TypeScript..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="bg-[#0f172a] border border-white/10 rounded-xl p-4 h-80 outline-none focus:border-pink-500 transition resize-none"
          />

          <p className="text-xs text-gray-500 mt-2 text-right">
            {jobDescription.length}/5000 chars
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col gap-6">
          {/* PROFILE TITLE */}
          <div className="flex items-center gap-3">
            <h2 className="font-semibold text-lg">Your Profile</h2>

            <span className="text-xs px-2 py-1 bg-pink-500/20 text-pink-400 rounded">
              BEST RESULTS
            </span>
          </div>

          {/* RESUME BOX */}
          <label className="cursor-pointer border border-dashed border-white/20 rounded-xl p-8 flex flex-col items-center justify-center text-center bg-[#0f172a] hover:border-pink-500 transition">
            <input
              type="file"
              onChange={(e) => setResumeFile(e.target.files[0])}
              className="hidden"
            />

            <p className="text-sm text-gray-300">
              Click to upload or drag & drop
            </p>

            <p className="text-xs text-gray-500 mt-1">PDF or DOCX (Max 5MB)</p>
          </label>

          {/* OR */}
          <div className="flex items-center gap-4 text-gray-500 text-xs">
            <div className="flex-1 h-[1px] bg-white/10"></div>
            OR
            <div className="flex-1 h-[1px] bg-white/10"></div>
          </div>

          {/* SELF DESCRIPTION */}
          <div className="w-full">
            <label className="block text-sm mb-2 text-gray-300">
              Quick Self-Description
            </label>

            <textarea
              placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
              value={selfDescription}
              onChange={(e) => setSelfDescription(e.target.value)}
              className="w-full bg-[#0f172a] border border-white/10 rounded-xl p-4 h-32 outline-none focus:border-pink-500 transition resize-none"
            />
          </div>

          {/* INFO BOX */}
          <div className="bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300 p-3 rounded-lg">
            Either a <span className="font-semibold">Resume</span> or a{" "}
            <span className="font-semibold">Self Description</span> is required
            to generate a personalized plan.
          </div>

          {/* BUTTON */}
          <button
            onClick={handleSubmit}
            className="mt-4 bg-gradient-to-r cursor-pointer from-pink-500 to-orange-400 text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
          >
            ★ Generate My Interview Strategy
          </button>
        </div>
      </div>

      {/* FOOTER TEXT */}
      <p className="text-xs text-gray-500 mt-6">
        AI-Powered Strategy Generation · Approx 30s
      </p>

      {/* SPINNER */}
      {loading && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
          <div className="h-16 w-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </section>
  );
};

export default Home;
