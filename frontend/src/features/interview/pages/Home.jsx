import React, { useState } from "react";
import { UploadCloud } from "lucide-react";

export default function Home() {
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [resume, setResume] = useState(null);

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = () => {
    console.log({
      jobDescription,
      selfDescription,
      resume,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050b16] to-[#0b1324] text-white flex flex-col items-center px-6 py-12">

      {/* Heading */}
      <div className="text-center max-w-3xl mb-10">
        <h1 className="text-4xl md:text-5xl font-bold">
          Create Your Custom{" "}
          <span className="text-pink-500">Interview Plan</span>
        </h1>

        <p className="text-gray-400 mt-4 text-lg">
          Let our AI analyze the job requirements and your unique profile to
          build a winning strategy.
        </p>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-6xl bg-[#0f172a] border border-gray-700 rounded-2xl shadow-xl grid md:grid-cols-2 gap-8 p-8">

        {/* Job Description */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-lg">Target Job Description</h2>
            <span className="text-xs bg-pink-500/20 text-pink-400 px-2 py-1 rounded">
              REQUIRED
            </span>
          </div>

          <textarea
            className="bg-[#1e293b] border border-gray-700 rounded-lg p-4 h-64 resize-none focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
            placeholder="Paste the full job description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />

          <span className="text-xs text-gray-500 mt-2">
            {jobDescription.length} / 5000 chars
          </span>
        </div>

        {/* Profile Section */}
        <div className="flex flex-col space-y-6">

          {/* Upload */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-semibold text-lg">Upload Resume</h2>
              <span className="text-xs bg-pink-500/20 text-pink-400 px-2 py-1 rounded">
                BEST RESULTS
              </span>
            </div>

            <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-600 rounded-xl h-36 cursor-pointer hover:border-pink-500 transition">
              <UploadCloud size={40} className="text-pink-500 mb-2" />
              <p className="text-sm text-gray-400">
                Click to upload or drag & drop
              </p>
              <span className="text-xs text-gray-500">
                PDF or DOCX (Max 5MB)
              </span>

              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>

            {resume && (
              <p className="text-xs text-green-400 mt-2">
                Selected: {resume.name}
              </p>
            )}
          </div>

          {/* OR */}
          <div className="text-center text-gray-500 text-sm">OR</div>

          {/* Self Description */}
          <div>
            <h2 className="font-semibold mb-2">Quick Self Description</h2>

            <textarea
              className="bg-[#1e293b] border border-pink-500/40 rounded-lg p-4 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
              placeholder="Briefly describe your experience, key skills, and years of experience..."
              value={selfDescription}
              onChange={(e) => setSelfDescription(e.target.value)}
            />
          </div>

          {/* Info Box */}
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 text-sm text-blue-300">
            Either a <b>Resume</b> or a <b>Self Description</b> is required to
            generate a personalized plan.
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="flex justify-between items-center w-full max-w-6xl mt-6">
        <span className="text-gray-400 text-sm">
          AI-Powered Strategy Generation · Approx 30s
        </span>

        <button
          onClick={handleSubmit}
          className="bg-gradient-to-r from-pink-500 to-rose-500 px-6 py-3 rounded-lg font-semibold hover:scale-105 transition"
        >
          Generate My Interview Strategy
        </button>
      </div>

      {/* Footer */}
      <div className="flex gap-6 text-gray-500 text-sm mt-10">
        <span>Privacy Policy</span>
        <span>Terms of Service</span>
        <span>Help Center</span>
      </div>

    </div>
  );
}