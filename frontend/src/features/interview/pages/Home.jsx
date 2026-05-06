import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useInterview } from "../hooks/useInterview";
import { Trash2, FileText, ChevronRight, UploadCloud, Sparkles } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const { generateReport, loading, getReports, reports, deleteReport } = useInterview();

  useEffect(() => {
    getReports();
  }, []);

  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

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

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) setResumeFile(droppedFile);
  };

  return (
    <section className="relative min-h-screen bg-slate-950 px-4 pt-32 pb-12 text-white flex flex-col items-center overflow-hidden">
      {/* Background glow */}
      <div className="absolute w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] top-[-100px] left-[-100px] rounded-full pointer-events-none"></div>

      {/* HEADING */}
      <div className="text-center mb-12 max-w-2xl relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span className="text-sm text-slate-300 font-medium">AI-Powered Strategy</span>
        </div>
        <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight">
          Create Your Custom{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
            Interview Plan
          </span>
        </h1>
        <p className="text-slate-400 mt-4 text-lg">
          Let our AI analyze the job requirements and your unique profile to build a winning strategy.
        </p>
      </div>

      {/* MAIN CONTAINER */}
      <div className="relative z-10 w-full max-w-6xl bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl p-6 lg:p-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* LEFT SIDE */}
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-3 mb-4 shrink-0">
            <h2 className="font-semibold text-lg text-white">Target Job Description</h2>
            <span className="text-xs px-2 py-1 bg-indigo-500/20 text-indigo-400 border border-indigo-500/20 rounded-full font-medium tracking-wide">
              REQUIRED
            </span>
          </div>

          <textarea
            placeholder="Paste the full job description here...&#10;e.g. Senior Frontend Engineer at Google requires proficiency in React, TypeScript..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="flex-1 w-full bg-slate-950/50 border border-white/10 rounded-2xl p-5 text-slate-300 outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all shadow-inner resize-none min-h-[250px] lg:min-h-[380px]"
          />

          <p className="text-xs text-slate-500 mt-3 text-right shrink-0 font-medium">
            {jobDescription.length}/5000 chars
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col h-full justify-between gap-6">
          <div className="flex items-center gap-3">
            <h2 className="font-semibold text-lg text-white">Upload Resume</h2>
            <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-400 border border-purple-500/20 rounded-full font-medium tracking-wide">
              BEST RESULTS
            </span>
          </div>

          {/* RESUME BOX */}
          <div 
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`cursor-pointer border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-all bg-slate-950/50 ${
              isDragging ? 'border-indigo-500 bg-indigo-500/10' : 'border-white/10 hover:border-indigo-500/50 hover:bg-slate-900/80'
            }`}
          >
            <input
              type="file"
              id="resume-upload"
              onChange={(e) => setResumeFile(e.target.files[0])}
              className="hidden"
            />
            <label htmlFor="resume-upload" className="cursor-pointer w-full flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-slate-800 flex items-center justify-center mb-4 text-indigo-400">
                <UploadCloud className="w-7 h-7" />
              </div>
              {resumeFile ? (
                <p className="text-sm font-medium text-emerald-400">{resumeFile.name}</p>
              ) : (
                <p className="text-sm text-slate-300 font-medium">Click to upload or drag & drop</p>
              )}
              <p className="text-xs text-slate-500 mt-2">PDF or DOCX (Max 5MB)</p>
            </label>
          </div>

          {/* OR */}
          <div className="flex items-center gap-4 text-slate-500 text-xs font-semibold tracking-widest my-2">
            <div className="flex-1 h-[1px] bg-white/10"></div>
            OR
            <div className="flex-1 h-[1px] bg-white/10"></div>
          </div>

          {/* SELF DESCRIPTION */}
          <div className="w-full">
            <label className="block text-sm mb-3 text-slate-300 font-medium">
              Quick Self-Description
            </label>

            <textarea
              placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
              value={selfDescription}
              onChange={(e) => setSelfDescription(e.target.value)}
              className="w-full bg-slate-950/50 border border-white/10 rounded-2xl p-4 h-32 text-slate-300 outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all shadow-inner resize-none"
            />
          </div>

          {/* INFO BOX */}
          <div className="bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-300 p-4 rounded-xl flex items-start gap-2">
            <Sparkles className="w-4 h-4 shrink-0 mt-0.5" />
            <p>Either a <span className="font-semibold text-white">Resume</span> or a <span className="font-semibold text-white">Self Description</span> is required to generate a personalized plan.</p>
          </div>

          {/* BUTTON */}
          <div className="mt-2">
            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r cursor-pointer from-indigo-500 to-purple-600 text-white px-6 py-4 rounded-xl font-semibold hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" /> Generate My Interview Strategy
            </button>
          </div>
        </div>
      </div>

      <p className="text-xs text-slate-500 mt-8 mb-16 font-medium">
        AI-Powered Strategy Generation · Approx 30s
      </p>

      {/* RECENT REPORTS SECTION */}
      {reports && reports.length > 0 && (
        <div className="w-full max-w-6xl mt-4 space-y-6 mb-20 relative z-10">
          <h3 className="text-xl font-bold text-white flex items-center gap-3 border-b border-white/10 pb-4">
            <FileText className="text-indigo-400 w-6 h-6" />
            Recently Generated Strategies
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {reports.map((r) => (
              <div
                key={r._id}
                className="group relative bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-indigo-500/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all cursor-pointer flex flex-col justify-between h-36"
                onClick={() => navigate(`/interview/${r._id}`)}
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-white line-clamp-1 pr-10 text-lg">
                      {r.title || "Software Developer Strategy"}
                    </h4>
                    <span 
                      className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                        r.matchScore >= 80 ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                        r.matchScore >= 50 ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                        'bg-pink-500/10 text-pink-400 border-pink-500/20'
                      }`}
                    >
                      {r.matchScore}%
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-medium">
                    {new Date(r.createdAt).toLocaleDateString(undefined, {
                      year: 'numeric', month: 'short', day: 'numeric'
                    })}
                  </p>
                </div>

                <div className="flex justify-between items-center text-sm text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                  <span className="flex items-center gap-1">View Strategy <ChevronRight size={16} /></span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteReport(r._id);
                  }}
                  className="absolute bottom-5 right-5 p-2 rounded-xl bg-pink-500/10 text-pink-400 hover:bg-pink-500 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
                  title="Delete Report"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SPINNER */}
      {loading && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="flex flex-col items-center gap-4">
            <div className="h-16 w-16 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
            <p className="text-indigo-400 font-medium animate-pulse">Generating Strategy...</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Home;
