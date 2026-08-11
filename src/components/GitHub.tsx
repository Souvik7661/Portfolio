import React from 'react';
import { motion } from 'framer-motion';
import { Github, Code, ExternalLink } from 'lucide-react';
import { Button } from './ui/Button';

export const GitHubSection: React.FC = () => {
  return (
    <section id="github" className="py-28 sm:py-36 bg-[#0A0A0A] text-white relative border-t border-neutral-900">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="space-y-4 mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-[#E8702A]">
            06 — OPEN SOURCE
          </span>
          <h2 className="text-4xl sm:text-5xl font-playfair italic font-normal text-white">
            Code in the wild.
          </h2>
          <p className="text-neutral-400 text-base max-w-xl">
            Explore my public repositories, project codebase implementations, and GitHub activities.
          </p>
        </div>

        {/* GitHub Premium Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#141414] to-[#0D0D0D] border border-neutral-800 hover:border-neutral-700 transition-all max-w-4xl space-y-8 shadow-2xl relative overflow-hidden"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 text-white">
                <Github className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white font-mono">
                  Souvik7661
                </h3>
                <p className="text-xs font-mono text-neutral-400 mt-1">
                  github.com/Souvik7661
                </p>
              </div>
            </div>

            <a
              href="https://github.com/Souvik7661"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="accent"
                size="md"
                icon={<ExternalLink className="w-4 h-4" />}
                iconPosition="right"
              >
                View GitHub Profile
              </Button>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-neutral-800/80">
            <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800/60">
              <p className="text-xs text-neutral-400 font-mono">PRIMARY STACK</p>
              <p className="text-sm font-semibold text-white mt-1">C, JavaScript, SQL, Web</p>
            </div>
            <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800/60">
              <p className="text-xs text-neutral-400 font-mono">PROJECT TYPE</p>
              <p className="text-sm font-semibold text-white mt-1">Full-Stack & Web Apps</p>
            </div>
            <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800/60">
              <p className="text-xs text-neutral-400 font-mono">COLLABORATION</p>
              <p className="text-sm font-semibold text-emerald-400 mt-1 flex items-center gap-1.5">
                <Code className="w-4 h-4" /> Open to PRs & Work
              </p>
            </div>
          </div>
        </motion.div>

        {/* Featured Repositories List */}
        <div className="mt-12 max-w-4xl space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-widest text-[#E8702A]">
            Featured Open Source Repositories
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Currency Converter */}
            <div className="p-6 rounded-2xl bg-[#121212] border border-neutral-800 hover:border-neutral-700 transition-all space-y-4">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-lg font-bold text-white flex items-center gap-2">
                  <Github className="w-5 h-5 text-[#E8702A]" />
                  Currency Converter
                </h4>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  Public Repo
                </span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Real-time financial converter application utilizing currency exchange APIs, rate charts, and clean state handling.
              </p>
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-neutral-800/60">
                <a
                  href="https://github.com/Souvik7661/Currency-Converter/tree/main/Currency_Cal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono font-semibold text-white hover:text-[#E8702A] inline-flex items-center gap-1 transition-colors"
                >
                  GitHub Repository <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href="https://currency-converter-liart-theta.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-[#E8702A] hover:underline inline-flex items-center gap-1"
                >
                  Vercel Live <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Rock Paper Scissors */}
            <div className="p-6 rounded-2xl bg-[#121212] border border-neutral-800 hover:border-neutral-700 transition-all space-y-4">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-lg font-bold text-white flex items-center gap-2">
                  <Github className="w-5 h-5 text-[#E8702A]" />
                  Rock Paper Scissors Game
                </h4>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Public Repo
                </span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Interactive web game with win-streak tracking, smooth DOM rendering, responsive touch support, and clean state logic.
              </p>
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-neutral-800/60">
                <a
                  href="https://github.com/Souvik7661/Rock-Paper-Scissors-game"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono font-semibold text-white hover:text-[#E8702A] inline-flex items-center gap-1 transition-colors"
                >
                  GitHub Repository <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href="https://rock-paper-scissors-game-eight-topaz.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-[#E8702A] hover:underline inline-flex items-center gap-1"
                >
                  Vercel Live <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
