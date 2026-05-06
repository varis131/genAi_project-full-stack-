import React from 'react';
import { useNavigate } from 'react-router';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';
import { useAuth } from '../../auth/hooks/useAuth';
import { FileText, Zap, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const AnalyzerPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleUploadClick = () => {
    if (!user) {
      navigate('/login');
    } else {
      navigate('/home');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-indigo-500/30 overflow-x-hidden flex flex-col justify-between">
      <Navbar />
      
      <div className="flex-1">
        <HeroSection onUploadClick={handleUploadClick} />
        
        {/* FEATURES SECTION */}
        <section id="features" className="py-24 relative z-10 bg-slate-900/30 border-y border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white">Why Choose IntelliView?</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                IntelliView leverages advanced AI models to provide you with actionable insights, ensuring you're perfectly prepared for your next big interview.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
                className="bg-slate-900/60 border border-white/10 rounded-3xl p-8 hover:border-indigo-500/50 transition-all hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center mb-6">
                  <FileText className="text-indigo-400 w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Deep Resume Analysis</h3>
                <p className="text-slate-400 leading-relaxed">
                  IntelliView thoroughly scans your uploaded resume to understand your background, parsing out key experiences and core competencies automatically.
                </p>
              </motion.div>

              {/* Feature 2 */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                className="bg-slate-900/60 border border-white/10 rounded-3xl p-8 hover:border-pink-500/50 transition-all hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center mb-6">
                  <ShieldAlert className="text-pink-400 w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Identify Skill Gaps</h3>
                <p className="text-slate-400 leading-relaxed">
                  We cross-reference your resume against the specific job description you provide, instantly highlighting the missing skills you need to focus on.
                </p>
              </motion.div>

              {/* Feature 3 */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                className="bg-slate-900/60 border border-white/10 rounded-3xl p-8 hover:border-emerald-500/50 transition-all hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-6">
                  <Zap className="text-emerald-400 w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Tailored Strategy</h3>
                <p className="text-slate-400 leading-relaxed">
                  Receive a custom interview roadmap featuring personalized technical and behavioral questions specifically designed for the role you want.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS SECTION */}
        <section id="how-it-works" className="py-24 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white">How It Works</h2>
              <p className="text-slate-400 max-w-xl mx-auto">
                Getting your personalized interview strategy takes just a few clicks. Follow these four simple steps.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
              {/* Connecting line for desktop */}
              <div className="hidden lg:block absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-indigo-500/0 via-indigo-500/30 to-purple-500/0 -translate-y-1/2 z-0"></div>

              {[
                { step: 1, title: 'Upload Resume', desc: 'Drag and drop your latest PDF or DOCX resume.' },
                { step: 2, title: 'Add Job Description', desc: 'Paste the requirements for the job you want.' },
                { step: 3, title: 'Add Self Description', desc: 'Briefly highlight any extra context.' },
                { step: 4, title: 'Get Strategy', desc: 'Review your AI-generated roadmap and questions.' }
              ].map((item, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: idx * 0.15, ease: "easeOut" }}
                  className="relative z-10 flex flex-col items-center text-center p-6 bg-slate-900/80 backdrop-blur-sm border border-white/10 rounded-3xl hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] transition-all"
                >
                  <div className="w-14 h-14 rounded-full bg-indigo-500/20 border-2 border-indigo-500/50 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                    <span className="text-xl font-bold text-indigo-400">{item.step}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-400">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-16 text-center"
            >
              <button 
                onClick={handleUploadClick}
                className="px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-full hover:bg-white/10 transition-all flex items-center justify-center gap-2 mx-auto"
              >
                Get Started Now <CheckCircle2 className="w-5 h-5 text-indigo-400" />
              </button>
            </motion.div>
          </div>
        </section>

      </div>

      <Footer />
    </div>
  );
};

export default AnalyzerPage;
