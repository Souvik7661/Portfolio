import React from 'react';
import { motion } from 'framer-motion';

export interface SkillCardProps {
  skillName: string;
  category: string;
}

export const SkillCard: React.FC<SkillCardProps> = ({ skillName, category }) => {
  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="p-4 rounded-xl bg-[#111111] border border-neutral-800/80 hover:border-neutral-600 transition-colors flex items-center justify-between group"
    >
      <span className="text-sm font-medium text-white group-hover:text-[#E8702A] transition-colors">
        {skillName}
      </span>
      <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 bg-neutral-900 px-2 py-0.5 rounded border border-neutral-800">
        {category}
      </span>
    </motion.div>
  );
};
