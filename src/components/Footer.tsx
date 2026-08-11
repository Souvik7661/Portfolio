import React from 'react';
import { ArrowUp, Github, Linkedin, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0A0A0A] text-white border-t border-neutral-900 py-16 relative z-10">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 space-y-12">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-neutral-900">
          {/* Logo & Subtitle */}
          <div className="space-y-3">
            <a href="#hero" className="flex items-center gap-3 text-2xl font-bold tracking-tight text-white group">
              <img src="/images/logo.png" alt="Souvik Kundu Logo" className="w-9 h-9 rounded-full object-cover border border-white/30" />
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" fill="none">
                <path d="M 160 88 L 194 34 L 216 0 L 256 0 L 256 40 L 221.5 93.5 L 200 128 L 256 128 L 256 256 L 96 256 L 96 168 L 64.246 220 L 40 256 L 0 256 L 0 216 L 34 162 L 56 128 L 0 128 L 0 0 L 160 0 Z" fill="white" />
              </svg>
              <span>SOUVIK KUNDU</span>
            </a>
            <p className="text-xs text-neutral-400 font-mono">
              Computer Science &amp; Engineering Student · Sister Nivedita University
            </p>
            <p className="text-xs text-neutral-500 font-mono">
              Developer · Builder · Learner · Shyamnagar, West Bengal
            </p>
          </div>

          {/* Social & Contact Links */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="tel:9841906881"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#171717] hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 text-xs font-mono transition-colors"
            >
              <Phone className="w-4 h-4 text-[#E8702A]" /> +91 9841906881
            </a>
            <a
              href="https://github.com/Souvik7661"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#171717] hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 text-xs font-mono transition-colors"
            >
              <Github className="w-4 h-4" /> GitHub
            </a>
            <a
              href="https://linkedin.com/in/souvik-kundu-0277593b1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#171717] hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 text-xs font-mono transition-colors"
            >
              <Linkedin className="w-4 h-4 text-cyan-400" /> LinkedIn
            </a>
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-full bg-[#171717] hover:bg-[#E8702A] text-neutral-300 hover:text-white border border-neutral-800 transition-colors cursor-pointer"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <p>© 2026 Souvik Kundu. All rights reserved.</p>
          <p className="flex items-center gap-1 text-neutral-400">
            Designed &amp; Engineered by Souvik Kundu · B.Tech CSE 2028
          </p>
        </div>

      </div>
    </footer>
  );
};
