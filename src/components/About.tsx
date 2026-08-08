import React from 'react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.15 } },
};

export const About: React.FC = () => (
  <section id="about" className="py-28 sm:py-36 bg-[#F7F7F5] text-[#171717] relative overflow-hidden">
    {/* Subtle background accent */}
    <div
      aria-hidden="true"
      className="absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl opacity-30 pointer-events-none"
      style={{ background: 'radial-gradient(circle, #d4e8d4 0%, transparent 70%)' }}
    />

    <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start"
      >
        {/* Left: Section label + editorial headline */}
        <div className="lg:col-span-5">
          <motion.span
            variants={fadeUp}
            className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#738273] block mb-5"
          >
            02 — About Me
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="font-playfair italic font-normal text-[#1C2E1E] leading-tight"
            style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', letterSpacing: '-0.03em' }}
          >
            I'm Souvik.
          </motion.h2>
        </div>

        {/* Right: Bio + stats */}
        <div className="lg:col-span-7 space-y-8 pt-1 lg:pt-12">
          <motion.p
            variants={fadeUp}
            className="text-xl sm:text-2xl font-light leading-relaxed text-[#1C2E1E]"
            style={{ letterSpacing: '-0.01em' }}
          >
            I'm a B.Tech CSE student at{' '}
            <strong className="font-semibold">Sister Nivedita University</strong>{' '}
            building my skills across software development, web technologies, AI and automation.
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="text-base sm:text-lg text-neutral-600 leading-relaxed"
          >
            I learn by building. My focus is on creating clean, thoughtful digital interfaces and writing maintainable code that solves real problems. I care deeply about the details — typography, spacing, interaction, performance.
          </motion.p>

          {/* Key stats */}
          <motion.div
            variants={fadeUp}
            className="grid grid-cols-3 gap-6 pt-6 border-t border-[#E2E2DF]"
          >
            {[
              { value: '8.68', label: 'CGPA' },
              { value: '2028', label: 'Graduation' },
              { value: 'CSE',  label: 'Degree' },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-3xl sm:text-4xl font-bold font-mono text-[#1C2E1E] leading-none mb-1">
                  {value}
                </p>
                <p className="text-[11px] uppercase tracking-widest text-[#738273] font-medium">
                  {label}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Quick chips */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-2 pt-2">
            {['Web Development', 'Full-Stack', 'AI & Automation', 'Problem Solving', 'UI/UX Experiments'].map(tag => (
              <span
                key={tag}
                className="px-3.5 py-1.5 text-xs rounded-full bg-white border border-[#DEDBD6] text-[#1C2E1E] font-medium"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  </section>
);
