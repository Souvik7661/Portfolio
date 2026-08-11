import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export interface AnimatedArrowProps {
  className?: string;
}

export const AnimatedArrow: React.FC<AnimatedArrowProps> = ({ className = 'w-4 h-4' }) => {
  return (
    <motion.span
      className="inline-block"
      whileHover={{ x: 4 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      <ArrowRight className={className} />
    </motion.span>
  );
};
