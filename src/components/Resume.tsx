import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  Download,
  Eye,
  ExternalLink,
  GraduationCap,
  Briefcase,
  Award,
  ArrowRight,
  Maximize2
} from 'lucide-react';

interface ResumeProps {
  onOpenModal: () => void;
}

export const Resume: React.FC<ResumeProps> = ({ onOpenModal }) => {
  const [activePreviewPage, setActivePreviewPage] = useState<1 | 2>(1);

  return (
    <section
      id="resume"
      className="py-24 sm:py-32 bg-[#060608] text-white relative overflow-hidden border-t border-white/10"
      aria-label="Souvik Kundu Official Resume"
    >
      {/* Background ambient lighting */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#E8702A]/10 blur-[130px] rounded-full pointer-events-none"
      />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#E8702A]">
                03 &bull; CURRICULUM VITAE
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                VERIFIED &bull; 2026
              </span>
            </div>

            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight uppercase font-sans text-white">
              MY RESUME<span className="text-[#E8702A]">.</span>
            </h2>
            <p className="text-white/60 text-sm sm:text-base max-w-xl font-light mt-3 leading-relaxed">
              Official curriculum vitae detailing university academics, production full-stack systems, desktop AI tools, and technical competencies.
            </p>
          </div>

          {/* Primary Action Button Cluster */}
          <div className="flex flex-wrap items-center gap-3">
            {/* View Interactive Resume Modal Trigger */}
            <motion.button
              onClick={onOpenModal}
              whileHover={{ scale: 1.03, boxShadow: '0 0 25px rgba(232,112,42,0.35)' }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#E8702A] hover:bg-[#d65f1c] text-white text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-lg cursor-pointer group"
            >
              <Eye className="w-4 h-4 transition-transform group-hover:scale-110" />
              <span>VIEW RESUME</span>
            </motion.button>

            {/* Direct Download Button */}
            <motion.a
              href="/Souvik_Kundu_Resume.pdf"
              download="Souvik_Kundu_Resume.pdf"
              whileHover={{ scale: 1.03, borderColor: 'rgba(255,255,255,0.4)', backgroundColor: 'rgba(255,255,255,0.1)' }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-mono font-bold tracking-wider uppercase border border-white/15 backdrop-blur-md transition-all cursor-pointer group"
            >
              <Download className="w-4 h-4 text-[#E8702A] transition-transform group-hover:translate-y-0.5" />
              <span>DOWNLOAD PDF</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-white/60 font-normal">
                891 KB
              </span>
            </motion.a>

            {/* New Tab View */}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/15 transition-colors cursor-pointer"
              title="Open raw PDF in new browser tab"
              aria-label="Open raw PDF in new browser tab"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Main Content Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Realistic Interactive Document Mockup (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full max-w-md bg-[#0D0D11] border border-white/15 rounded-2xl p-4 shadow-2xl relative group">
              
              {/* Document Header Bar */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-xs font-mono text-white/60">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#E8702A]" />
                  <span className="font-bold text-white">Souvik_Kundu_CV.pdf</span>
                </div>
                
                {/* Page Switcher */}
                <div className="flex items-center gap-1 bg-white/5 rounded-lg p-0.5 border border-white/10">
                  <button
                    onClick={() => setActivePreviewPage(1)}
                    className={`px-2 py-0.5 rounded text-[10px] transition-colors cursor-pointer ${
                      activePreviewPage === 1 ? 'bg-[#E8702A] text-white font-bold' : 'text-white/50 hover:text-white'
                    }`}
                  >
                    Pg 1
                  </button>
                  <button
                    onClick={() => setActivePreviewPage(2)}
                    className={`px-2 py-0.5 rounded text-[10px] transition-colors cursor-pointer ${
                      activePreviewPage === 2 ? 'bg-[#E8702A] text-white font-bold' : 'text-white/50 hover:text-white'
                    }`}
                  >
                    Pg 2
                  </button>
                </div>
              </div>

              {/* Clickable Document Surface with Hover Reveal Overlay */}
              <div
                onClick={onOpenModal}
                className="relative rounded-xl overflow-hidden border border-white/10 bg-neutral-900 shadow-lg cursor-pointer transition-all duration-300 group-hover:border-[#E8702A]/50 group-hover:shadow-[0_0_30px_rgba(232,112,42,0.2)]"
              >
                <img
                  src={`/images/resume-page-${activePreviewPage}.png`}
                  alt={`Souvik Kundu Resume Preview Page ${activePreviewPage}`}
                  className="w-full h-auto block select-none filter contrast-[1.02] transition-transform duration-500 group-hover:scale-[1.02]"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 backdrop-blur-[2px] transition-opacity duration-300 flex flex-col items-center justify-center gap-3 text-center p-6">
                  <div className="w-14 h-14 rounded-full bg-[#E8702A] text-white flex items-center justify-center shadow-xl transform scale-75 group-hover:scale-100 transition-transform duration-300">
                    <Maximize2 className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-sm font-bold uppercase tracking-wider block text-white font-mono">
                      Click to Expand &amp; Read
                    </span>
                    <span className="text-xs text-white/70 font-mono">
                      Full Screen &bull; High Resolution &bull; ATS Breakdown
                    </span>
                  </div>
                </div>
              </div>

              {/* Document Meta Info Footer */}
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/50">
                <span>Page {activePreviewPage} of 2</span>
                <button
                  onClick={onOpenModal}
                  className="text-[#E8702A] hover:underline flex items-center gap-1 cursor-pointer font-bold"
                >
                  <span>Open Full Viewer</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

            </div>
          </div>

          {/* RIGHT: Recruiter Fast-Scan Cards (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 1. Academic & University Snapshot */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="p-6 rounded-2xl bg-[#0D0D11] border border-white/10 hover:border-white/20 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-[#E8702A]/15 text-[#E8702A] border border-[#E8702A]/25">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-mono uppercase tracking-wider font-bold text-white">
                      ACADEMIC CREDENTIALS
                    </h3>
                    <p className="text-xs text-white/50 font-mono">Sister Nivedita University &bull; Kolkata</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono font-bold text-emerald-400">
                    CGPA: 8.84 / 10
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-white/5 text-[11px] font-mono text-white/70">
                    2024–2028
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-xs text-white/80 font-light border-t border-white/5 pt-3">
                <p>
                  <strong className="text-white font-medium">B.Tech in Computer Science Engineering (5th Sem)</strong>: Specialized coursework across Database Management Systems (DBMS), Operating Systems (OS), Computer Organization, Theory of Computation (TOC), and Numerical Methods.
                </p>
                <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono text-white/50 pt-1">
                  <span>ISC Class XII: <strong className="text-white">75.24%</strong></span>
                  <span>&bull;</span>
                  <span>ICSE Class X: <strong className="text-white">83.74%</strong></span>
                </div>
              </div>
            </motion.div>

            {/* 2. Experience & Software Architecture */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="p-6 rounded-2xl bg-[#0D0D11] border border-white/10 hover:border-white/20 transition-all space-y-4"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-[#E8702A]/15 text-[#E8702A] border border-[#E8702A]/25">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-mono uppercase tracking-wider font-bold text-white">
                    PRACTICAL WORK &amp; SYSTEMS
                  </h3>
                  <p className="text-xs text-white/50 font-mono">Full-stack, Desktop &amp; AI Engineering</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-white font-mono">College ERP System</span>
                    <span className="text-[10px] font-mono text-[#E8702A]">Jun 2026–Present</span>
                  </div>
                  <p className="text-[11px] text-white/70 font-light leading-relaxed">
                    Student ERP portal, role authorization, high-performance database queries and UI workflows.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-white font-mono">VALAK AI Assistant</span>
                    <span className="text-[10px] font-mono text-emerald-400">Jan 2026–Present</span>
                  </div>
                  <p className="text-[11px] text-white/70 font-light leading-relaxed">
                    Cross-platform desktop assistant with Electron, Node.js, and Ollama offline LLMs with voice UI.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-white font-mono">Currency Converter</span>
                    <span className="text-[10px] font-mono text-white/40">June 2025</span>
                  </div>
                  <p className="text-[11px] text-white/70 font-light leading-relaxed">
                    Live currency conversion suite integrating third-party FX rate REST APIs with modern reactive UI.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-white font-mono">Agragami Internship</span>
                    <span className="text-[10px] font-mono text-cyan-400">6-Month Term</span>
                  </div>
                  <p className="text-[11px] text-white/70 font-light leading-relaxed">
                    Real-time location tracker integration, WebSocket data streaming, on-time client feature delivery.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* 3. Certifications & Soft Skills Bar */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="p-6 rounded-2xl bg-gradient-to-r from-[#0D0D11] to-[#121217] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#E8702A]" />
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                    CERTIFICATIONS &amp; PROBLEM SOLVING
                  </h4>
                </div>
                <p className="text-xs text-white/60 font-light max-w-md leading-relaxed">
                  Java Multi-Threading Mastery, Supermarket App OOPs in Java, Advanced Software Engineering Simulation &bull; English, Bengali &amp; Hindi fluent.
                </p>
              </div>

              <button
                onClick={onOpenModal}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-[#E8702A] text-white text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer shrink-0"
              >
                <span>READ COMPLETE CV</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
};
