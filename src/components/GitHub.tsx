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

      </div>
    </section>
  );
};
