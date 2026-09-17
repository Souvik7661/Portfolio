import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Download,
  ExternalLink,
  FileText,
  Eye,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  GraduationCap,
  Briefcase,
  Code2,
  Award,
  Languages,
  Printer,
  Check,
  Share2,
  Maximize2
} from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ViewTab = 'preview' | 'pdf' | 'ats';

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<ViewTab>('preview');
  const [pageNumber, setPageNumber] = useState<1 | 2>(1);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [copied, setCopied] = useState(false);

  // Close on Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  const handleShare = async () => {
    const shareUrl = window.location.origin + '/resume.pdf';
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    const printWindow = window.open('/resume.pdf', '_blank');
    if (printWindow) {
      printWindow.focus();
      printWindow.print();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="resume-modal-title"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative z-10 w-full max-w-5xl h-[92vh] max-h-[920px] bg-[#0A0A0C] border border-white/15 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-white font-sans"
          >
            {/* Top Bar Header */}
            <header className="px-4 sm:px-6 py-3.5 border-b border-white/10 bg-[#0E0E12] flex flex-wrap items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#E8702A]/15 border border-[#E8702A]/30 flex items-center justify-center text-[#E8702A]">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h2
                    id="resume-modal-title"
                    className="text-sm sm:text-base font-bold tracking-tight text-white flex items-center gap-2"
                  >
                    Souvik Kundu — Resume
                    <span className="hidden sm:inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-neutral-300 font-medium">
                      PDF &bull; 2 Pages
                    </span>
                  </h2>
                  <p className="text-[11px] font-mono text-white/50">
                    B.Tech CSE &bull; Full-Stack &amp; AI Software Engineer
                  </p>
                </div>
              </div>

              {/* View Mode Switcher Pills */}
              <div className="flex items-center gap-1 bg-black/40 border border-white/10 p-1 rounded-lg text-xs font-mono">
                <button
                  onClick={() => setActiveTab('preview')}
                  className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'preview'
                      ? 'bg-[#E8702A] text-white font-bold shadow'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Visual Document</span>
                  <span className="sm:hidden">Visual</span>
                </button>
                <button
                  onClick={() => setActiveTab('pdf')}
                  className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'pdf'
                      ? 'bg-[#E8702A] text-white font-bold shadow'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">PDF Reader</span>
                  <span className="sm:hidden">PDF</span>
                </button>
                <button
                  onClick={() => setActiveTab('ats')}
                  className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'ats'
                      ? 'bg-[#E8702A] text-white font-bold shadow'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">ATS / Text View</span>
                  <span className="sm:hidden">ATS</span>
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <a
                  href="/Souvik_Kundu_Resume.pdf"
                  download="Souvik_Kundu_Resume.pdf"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#E8702A] hover:bg-[#d65f1c] text-white text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-md active:scale-95 cursor-pointer"
                  title="Download Resume PDF"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">DOWNLOAD PDF</span>
                </a>

                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/10 transition-colors cursor-pointer"
                  title="Open PDF in New Window"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>

                <button
                  onClick={onClose}
                  className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-white/80 hover:text-red-400 border border-white/10 transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </header>

            {/* Sub-toolbar for Visual Document view */}
            {activeTab === 'preview' && (
              <div className="px-4 py-2 bg-[#08080A] border-b border-white/10 flex items-center justify-between text-xs font-mono text-white/70 shrink-0">
                {/* Page Navigation */}
                <div className="flex items-center gap-2">
                  <span className="text-white/50">PAGE</span>
                  <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-md p-0.5">
                    <button
                      onClick={() => setPageNumber(1)}
                      disabled={pageNumber === 1}
                      className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                        pageNumber === 1 ? 'bg-white/20 text-white font-bold' : 'hover:text-white disabled:opacity-30'
                      }`}
                    >
                      1
                    </button>
                    <button
                      onClick={() => setPageNumber(2)}
                      disabled={pageNumber === 2}
                      className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                        pageNumber === 2 ? 'bg-white/20 text-white font-bold' : 'hover:text-white disabled:opacity-30'
                      }`}
                    >
                      2
                    </button>
                  </div>
                  <span className="text-white/40">OF 2</span>

                  <div className="hidden sm:flex items-center gap-1 ml-2">
                    <button
                      onClick={() => setPageNumber(1)}
                      disabled={pageNumber === 1}
                      className="p-1 rounded hover:bg-white/10 disabled:opacity-30 cursor-pointer"
                      title="Previous Page"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setPageNumber(2)}
                      disabled={pageNumber === 2}
                      className="p-1 rounded hover:bg-white/10 disabled:opacity-30 cursor-pointer"
                      title="Next Page"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Zoom Controls */}
                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-md px-2 py-0.5">
                    <button
                      onClick={() => setZoomLevel((z) => Math.max(z - 15, 70))}
                      disabled={zoomLevel <= 70}
                      className="p-1 hover:text-white disabled:opacity-30 cursor-pointer"
                      title="Zoom Out"
                    >
                      <ZoomOut className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-12 text-center text-[11px]">{zoomLevel}%</span>
                    <button
                      onClick={() => setZoomLevel((z) => Math.min(z + 15, 145))}
                      disabled={zoomLevel >= 145}
                      className="p-1 hover:text-white disabled:opacity-30 cursor-pointer"
                      title="Zoom In"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setZoomLevel(100)}
                      className="text-[10px] uppercase text-[#E8702A] ml-1 hover:underline cursor-pointer"
                    >
                      Reset
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={handlePrint}
                      className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white text-xs transition-colors cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print</span>
                    </button>
                    <button
                      onClick={handleShare}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white text-xs transition-colors cursor-pointer"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied' : 'Share'}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Modal Content Body */}
            <div className="flex-1 overflow-y-auto bg-[#070709] p-3 sm:p-6 flex flex-col items-center">
              {/* TAB 1: VISUAL DOCUMENT PREVIEW */}
              {activeTab === 'preview' && (
                <div className="w-full flex flex-col items-center justify-start space-y-6 max-w-4xl transition-all duration-300">
                  <div
                    style={{ width: `${zoomLevel}%` }}
                    className="transition-all duration-200 flex flex-col items-center"
                  >
                    <div className="relative rounded-xl overflow-hidden shadow-2xl border border-white/20 bg-white max-w-[850px] w-full">
                      <img
                        src={`/images/resume-page-${pageNumber}.png`}
                        alt={`Souvik Kundu Resume Page ${pageNumber}`}
                        className="w-full h-auto block select-none"
                      />
                    </div>
                  </div>

                  {/* Bottom Page Switcher Floating Bar */}
                  <div className="flex items-center gap-4 bg-[#111116]/90 backdrop-blur-md px-4 py-2 rounded-full border border-white/15 text-xs font-mono shadow-xl">
                    <button
                      onClick={() => setPageNumber(1)}
                      className={`px-3 py-1 rounded-full cursor-pointer transition-colors ${
                        pageNumber === 1
                          ? 'bg-[#E8702A] text-white font-bold'
                          : 'text-white/60 hover:text-white'
                      }`}
                    >
                      PAGE 1 (Summary &bull; Experience &bull; Education &bull; Skills)
                    </button>
                    <span className="text-white/20">|</span>
                    <button
                      onClick={() => setPageNumber(2)}
                      className={`px-3 py-1 rounded-full cursor-pointer transition-colors ${
                        pageNumber === 2
                          ? 'bg-[#E8702A] text-white font-bold'
                          : 'text-white/60 hover:text-white'
                      }`}
                    >
                      PAGE 2 (Certifications &bull; Languages)
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 2: EMBEDDED NATIVE PDF */}
              {activeTab === 'pdf' && (
                <div className="w-full h-full flex flex-col items-stretch">
                  <div className="w-full flex-1 rounded-xl overflow-hidden border border-white/15 bg-neutral-900 shadow-inner">
                    <iframe
                      src="/resume.pdf#view=FitH"
                      title="Souvik Kundu Official Resume PDF"
                      className="w-full h-full min-h-[500px] border-0"
                    />
                  </div>
                  <div className="pt-2 text-center text-xs font-mono text-white/40">
                    Native browser PDF previewer &bull; If your browser does not display PDFs inline,{' '}
                    <a
                      href="/Souvik_Kundu_Resume.pdf"
                      download
                      className="text-[#E8702A] underline underline-offset-2 hover:text-white"
                    >
                      click here to download directly
                    </a>
                  </div>
                </div>
              )}

              {/* TAB 3: ATS / STRUCTURED TEXT VIEW */}
              {activeTab === 'ats' && (
                <div className="w-full max-w-4xl space-y-8 py-2 text-left">
                  {/* Bio / Summary Card */}
                  <div className="p-6 rounded-2xl bg-[#0E0E12] border border-white/10 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
                      <div>
                        <h3 className="text-2xl font-bold tracking-tight text-white">SOUVIK KUNDU</h3>
                        <p className="text-xs font-mono text-[#E8702A] mt-1">
                          Full-Stack &amp; Desktop Application Developer &bull; AI Software Engineer
                        </p>
                      </div>
                      <div className="text-xs font-mono text-white/60 sm:text-right space-y-0.5">
                        <p>souvikk075@gmail.com &bull; +91 9831906881</p>
                        <p>Shyamnagar, West Bengal, India</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-mono font-bold tracking-widest text-white/50 uppercase mb-2">
                        PROFESSIONAL SUMMARY
                      </h4>
                      <p className="text-sm text-white/80 leading-relaxed font-light">
                        Computer Science &amp; Engineering student at Sister Nivedita University with a strong interest in full-stack development, desktop application development, AI-assisted software engineering, and problem solving. Experienced in building responsive web applications using HTML, CSS, JavaScript, React.js, Node.js, and SQL. Familiar with Electron.js, REST APIs, Git &amp; GitHub, and modern development workflows. Passionate about developing practical software solutions and seeking software engineering, full-stack engineering, or AI-focused internship opportunities.
                      </p>
                    </div>
                  </div>

                  {/* Experience Grid */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-[#E8702A]" />
                      <h4 className="text-xs font-mono font-bold tracking-widest text-white/70 uppercase">
                        EXPERIENCE &amp; PRACTICAL SYSTEMS
                      </h4>
                    </div>

                    <div className="space-y-3">
                      <div className="p-5 rounded-xl bg-[#0E0E12] border border-white/10 hover:border-[#E8702A]/40 transition-colors">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                          <h5 className="text-base font-bold text-white">College ERP System</h5>
                          <span className="text-xs font-mono text-[#E8702A]">Jun 2026 – Present</span>
                        </div>
                        <p className="text-xs text-white/70 leading-relaxed font-light mb-3">
                          Engineering an enterprise academic ERP management platform for Sister Nivedita University focusing on streamlined student record management, course schedules, role-based security, and high performance.
                        </p>
                        <div className="flex flex-wrap gap-2 text-[11px] font-mono text-white/60">
                          {['React.js', 'Node.js', 'SQL', 'REST APIs', 'Spring Boot'].map((t) => (
                            <span key={t} className="px-2 py-0.5 rounded bg-white/5 border border-white/10">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="p-5 rounded-xl bg-[#0E0E12] border border-white/10 hover:border-[#E8702A]/40 transition-colors">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                          <h5 className="text-base font-bold text-white">VALAK — AI Desktop Assistant</h5>
                          <span className="text-xs font-mono text-emerald-400">Jan 2026 – Present (Active)</span>
                        </div>
                        <p className="text-xs text-white/70 leading-relaxed font-light mb-3">
                          Architecting a cross-platform intelligent desktop assistant using Electron.js, Node.js, and Ollama local LLMs. Features hands-free voice interaction, desktop workflow automation, and privacy-first local AI productivity.
                        </p>
                        <div className="flex flex-wrap gap-2 text-[11px] font-mono text-white/60">
                          {['Electron.js', 'Node.js', 'Ollama (Local LLM)', 'Voice UI', 'Automation'].map((t) => (
                            <span key={t} className="px-2 py-0.5 rounded bg-white/5 border border-white/10">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="p-5 rounded-xl bg-[#0E0E12] border border-white/10 hover:border-[#E8702A]/40 transition-colors">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                          <h5 className="text-base font-bold text-white">Currency Converter Web Application</h5>
                          <span className="text-xs font-mono text-white/50">June 2025</span>
                        </div>
                        <p className="text-xs text-white/70 leading-relaxed font-light mb-3">
                          Engineered a clean, ultra-responsive currency conversion tool integrating live financial exchange-rate REST APIs with dynamic caching and instant user input recalculation.
                        </p>
                        <div className="flex flex-wrap gap-2 text-[11px] font-mono text-white/60">
                          {['HTML5', 'CSS3', 'JavaScript', 'REST APIs', 'Real-time FX'].map((t) => (
                            <span key={t} className="px-2 py-0.5 rounded bg-white/5 border border-white/10">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Education & Academics */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-[#E8702A]" />
                      <h4 className="text-xs font-mono font-bold tracking-widest text-white/70 uppercase">
                        EDUCATION
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-5 rounded-xl bg-[#0E0E12] border border-white/10 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono text-[#E8702A]">2024 – 2028 (Expected)</span>
                          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            CGPA 8.84 / 10
                          </span>
                        </div>
                        <h5 className="text-base font-bold text-white">Sister Nivedita University</h5>
                        <p className="text-xs text-white/70">
                          Bachelor of Technology — Computer Science Engineering (5th Sem)
                        </p>
                        <p className="text-[11px] font-mono text-white/40">Kolkata, West Bengal</p>
                      </div>

                      <div className="p-5 rounded-xl bg-[#0E0E12] border border-white/10 space-y-2">
                        <span className="text-xs font-mono text-white/50">Higher Secondary &amp; Secondary</span>
                        <h5 className="text-base font-bold text-white">Authpur National Model Higher Secondary</h5>
                        <div className="space-y-1 text-xs text-white/70">
                          <p className="flex justify-between">
                            <span>ISC Class XII (2023):</span>
                            <span className="font-mono font-bold text-white">75.24%</span>
                          </p>
                          <p className="flex justify-between">
                            <span>ICSE Class X (2021):</span>
                            <span className="font-mono font-bold text-white">83.74%</span>
                          </p>
                        </div>
                        <p className="text-[11px] font-mono text-white/40">West Bengal, India</p>
                      </div>
                    </div>
                  </div>

                  {/* Skills Matrix */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Code2 className="w-4 h-4 text-[#E8702A]" />
                      <h4 className="text-xs font-mono font-bold tracking-widest text-white/70 uppercase">
                        TECHNICAL &amp; SOFT SKILLS MATRIX
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                      {[
                        {
                          tech: 'Programming: C, Java, JavaScript, SQL, Python',
                          soft: 'Problem-solving, Logical & Analytical Thinking',
                        },
                        {
                          tech: 'Frontend: HTML5, CSS3, React.js',
                          soft: 'Creativity, User-Centric Design, Visual Thinking',
                        },
                        {
                          tech: 'Backend: Node.js, Express, Spring Boot',
                          soft: 'Logical Reasoning, Debugging Mindset, Adaptability',
                        },
                        {
                          tech: 'Databases: MySQL (Academic), PostgreSQL',
                          soft: 'Data Accuracy, Structured Schema Design',
                        },
                        {
                          tech: 'Tools: Git, GitHub, VS Code, Electron.js, Ollama',
                          soft: 'Collaboration, Technical Curiosity, Continuous Learning',
                        },
                        {
                          tech: 'Core CS: DBMS, OS, Computer Org, TOC, Numerical',
                          soft: 'Systematic Reasoning, Algorithmic Foundations',
                        },
                      ].map((item, idx) => (
                        <div key={idx} className="p-4 rounded-xl bg-[#0E0E12] border border-white/10 space-y-1.5">
                          <p className="font-bold text-white">{item.tech}</p>
                          <p className="text-white/50 text-[11px]">&rarr; {item.soft}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Certifications & Languages */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-5 rounded-xl bg-[#0E0E12] border border-white/10 space-y-3">
                      <div className="flex items-center gap-2 text-[#E8702A]">
                        <Award className="w-4 h-4" />
                        <h4 className="text-xs font-mono font-bold tracking-widest uppercase text-white/70">
                          CERTIFICATIONS
                        </h4>
                      </div>
                      <ul className="space-y-2 text-xs text-white/80 font-light">
                        <li className="flex items-start gap-2">
                          <span className="text-[#E8702A]">&bull;</span>
                          <span>Java Multi-Threading Mastery: From Basics To Advance</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#E8702A]">&bull;</span>
                          <span>Created a Supermarket App using OOPs Features in Java</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#E8702A]">&bull;</span>
                          <span>Java Classes and Objects</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#E8702A]">&bull;</span>
                          <span>Advanced Software Engineering Job Simulation</span>
                        </li>
                      </ul>
                    </div>

                    <div className="p-5 rounded-xl bg-[#0E0E12] border border-white/10 space-y-3">
                      <div className="flex items-center gap-2 text-[#E8702A]">
                        <Languages className="w-4 h-4" />
                        <h4 className="text-xs font-mono font-bold tracking-widest uppercase text-white/70">
                          LANGUAGES
                        </h4>
                      </div>
                      <div className="space-y-2 text-xs font-mono">
                        <div className="flex justify-between items-center p-2 rounded bg-white/5">
                          <span className="text-white">English</span>
                          <span className="text-[#E8702A]">Professional Proficiency</span>
                        </div>
                        <div className="flex justify-between items-center p-2 rounded bg-white/5">
                          <span className="text-white">Bengali</span>
                          <span className="text-emerald-400">Native</span>
                        </div>
                        <div className="flex justify-between items-center p-2 rounded bg-white/5">
                          <span className="text-white">Hindi</span>
                          <span className="text-cyan-400">Fluent</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Footer Bar */}
            <footer className="px-6 py-3 border-t border-white/10 bg-[#0E0E12] flex items-center justify-between text-xs font-mono text-white/50 shrink-0">
              <span>SOUVIK KUNDU &bull; CURRICULUM VITAE</span>
              <div className="flex items-center gap-3">
                <a
                  href="/Souvik_Kundu_Resume.pdf"
                  download="Souvik_Kundu_Resume.pdf"
                  className="text-[#E8702A] hover:underline flex items-center gap-1 font-bold"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download .PDF (891 KB)</span>
                </a>
              </div>
            </footer>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
