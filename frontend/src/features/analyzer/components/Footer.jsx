import React from 'react';
import { BrainCircuit, Twitter, Github, Linkedin } from 'lucide-react';

/**
 * Clean, minimalistic dark footer
 */
const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-slate-950 pt-16 pb-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* Branding */}
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="p-1.5 bg-indigo-500/20 rounded-lg group-hover:bg-indigo-500/30 transition-colors">
              <BrainCircuit className="text-indigo-400 w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">IntelliView</span>
          </div>
          
          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-medium text-slate-400">
            <a href="#" className="hover:text-indigo-400 transition-colors">Features</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">Contact Support</a>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-indigo-500/20 hover:border-indigo-500/30 transition-all">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-indigo-500/20 hover:border-indigo-500/30 transition-all">
              <Github className="w-4 h-4" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-indigo-500/20 hover:border-indigo-500/30 transition-all">
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="text-center text-slate-600 text-sm mt-12 flex flex-col sm:flex-row items-center justify-center gap-2">
          <span>&copy; {new Date().getFullYear()} IntelliView Inc. All rights reserved.</span>
          <span className="hidden sm:inline text-slate-700">•</span>
          <span>Built with precision and AI intelligence.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
