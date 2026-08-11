import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skillsData } from '../data/skills';

type Category = 'All' | 'Programming' | 'Web Development' | 'Tools' | 'AI' | 'Creative' | 'Core Subjects';

const CATS: Category[] = ['All', 'Programming', 'Web Development', 'Tools', 'AI', 'Creative', 'Core Subjects'];

export const Skills: React.FC = () => {
  const [active, setActive] = useState<Category>('All');

  const allSkills = skillsData.flatMap(cat =>
    cat.skills.map(name => ({ name, category: cat.category }))
  );

  const filtered = active === 'All' ? allSkills : allSkills.filter(s => s.category === active);

  return (
    <section
      id="skills"
      className="py-28 sm:py-36 bg-[#0A0A0A] text-white border-t border-[#161616]"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mb-12">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#E8702A] block mb-4">
              03 — Technical Stack
            </span>
            <h2
              className="font-playfair italic font-normal text-white"
              style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)', letterSpacing: '-0.03em' }}
            >
              Things I work with.
            </h2>
          </div>
          <p className="text-neutral-500 text-sm max-w-xs leading-relaxed sm:text-right">
            Technologies, tools, and CS foundations I apply when building.
          </p>
        </div>

        {/* Category Filter Chips */}
        <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label="Filter skills by category">
          {CATS.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              aria-pressed={active === cat}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 ${
                active === cat
                  ? 'bg-white text-black shadow'
                  : 'bg-[#141414] text-neutral-400 hover:text-white border border-[#242424] hover:border-neutral-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((skill) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25 }}
                whileHover={{ y: -3 }}
                className="group flex items-center justify-between p-4 rounded-xl bg-[#111111] border border-[#1E1E1E] hover:border-[#333333] transition-colors cursor-default"
              >
                <span className="text-sm font-medium text-neutral-200 group-hover:text-white transition-colors">
                  {skill.name}
                </span>
                <span className="text-[10px] font-mono text-neutral-600 bg-[#0D0D0D] px-2 py-1 rounded border border-[#1E1E1E] group-hover:text-[#E8702A] transition-colors">
                  {skill.category.split(' ')[0]}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Skill count */}
        <p className="text-xs text-neutral-700 font-mono mt-8">
          {filtered.length} skill{filtered.length !== 1 ? 's' : ''} shown
        </p>
      </div>
    </section>
  );
};
