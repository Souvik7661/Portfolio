import React from 'react';
import { motion } from 'framer-motion';
import { Github, Code, ExternalLink } from 'lucide-react';

export const GitHubSection: React.FC = () => {
  return (
    <section id="github" className="py-24 sm:py-32 bg-[#070707] text-white relative border-t border-white/10 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="space-y-3 mb-12">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#E8702A] block">
            06 &bull; OPEN SOURCE
          </span>
          <h2 className="text-4xl sm:text-6xl font-playfair italic font-normal text-white leading-tight">
            Code in the wild.
          </h2>
          <p className="text-white/60 text-sm sm:text-base max-w-xl font-light">
            Explore my public repositories, project codebase implementations, and GitHub activities.
          </p>
        </div>

        {/* GitHub Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-8 sm:p-10 rounded-2xl bg-[#0d0d11] border border-white/10 hover:border-white/20 transition-all max-w-5xl space-y-8 shadow-2xl relative overflow-hidden"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-white shrink-0">
                <Github className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white font-mono">
                  Souvik7661
                </h3>
                <p className="text-xs font-mono text-white/50 mt-1">
                  github.com/Souvik7661
                </p>
              </div>
            </div>

            <a
              href="https://github.com/Souvik7661"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#E8702A] hover:bg-[#d65f1c] text-white text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-lg shadow-[#E8702A]/20 cursor-pointer shrink-0"
            >
              <span>View GitHub Profile</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
            <div className="p-4 rounded-xl bg-white/5 border border-white/5">
              <p className="text-[11px] text-white/40 font-mono uppercase tracking-wider">PRIMARY STACK</p>
              <p className="text-sm font-semibold text-white mt-1">C, JavaScript, SQL, Web</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/5">
              <p className="text-[11px] text-white/40 font-mono uppercase tracking-wider">PROJECT TYPE</p>
              <p className="text-sm font-semibold text-white mt-1">Full-Stack &amp; Web Apps</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/5">
              <p className="text-[11px] text-white/40 font-mono uppercase tracking-wider">COLLABORATION</p>
              <p className="text-sm font-semibold text-emerald-400 mt-1 flex items-center gap-1.5 font-mono">
                <Code className="w-4 h-4 text-emerald-400" /> Open to PRs &amp; Work
              </p>
            </div>
          </div>
        </motion.div>

        {/* Featured Open Source Repositories */}
        <div className="mt-12 max-w-5xl space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-widest text-[#E8702A]">
            FEATURED OPEN SOURCE REPOSITORIES
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Currency Converter */}
            <div className="p-6 rounded-2xl bg-[#0d0d11] border border-white/10 hover:border-[#E8702A]/50 transition-all space-y-4">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-lg font-bold text-white flex items-center gap-2">
                  <Github className="w-5 h-5 text-[#E8702A]" />
                  Currency Converter
                </h4>
                <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  PUBLIC REPO
                </span>
              </div>
              <p className="text-xs text-white/60 leading-relaxed font-light">
                Real-time financial converter application utilizing currency exchange APIs, rate charts, and clean state handling.
              </p>
              <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-white/10">
                <a
                  href="https://github.com/Souvik7661/Currency-Converter/tree/main/Currency_Cal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono font-semibold text-white hover:text-[#E8702A] inline-flex items-center gap-1.5 transition-colors"
                >
                  GitHub Repository <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://currency-converter-liart-theta.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-[#E8702A] hover:underline inline-flex items-center gap-1.5"
                >
                  Vercel Live <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Rock Paper Scissors */}
            <div className="p-6 rounded-2xl bg-[#0d0d11] border border-white/10 hover:border-[#E8702A]/50 transition-all space-y-4">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-lg font-bold text-white flex items-center gap-2">
                  <Github className="w-5 h-5 text-[#E8702A]" />
                  Rock Paper Scissors Game
                </h4>
                <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  PUBLIC REPO
                </span>
              </div>
              <p className="text-xs text-white/60 leading-relaxed font-light">
                Interactive web game with win-streak tracking, smooth DOM rendering, responsive touch support, and clean state logic.
              </p>
              <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-white/10">
                <a
                  href="https://github.com/Souvik7661/Rock-Paper-Scissors-game"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono font-semibold text-white hover:text-[#E8702A] inline-flex items-center gap-1.5 transition-colors"
                >
                  GitHub Repository <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://rock-paper-scissors-game-eight-topaz.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-[#E8702A] hover:underline inline-flex items-center gap-1.5"
                >
                  Vercel Live <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
