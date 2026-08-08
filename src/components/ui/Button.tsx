import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'accent' | 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'accent',
  size = 'md',
  icon,
  iconPosition = 'left',
  children,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-accent/50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';

  const variantStyles = {
    accent: 'bg-[#E8702A] hover:bg-[#D2611F] text-white text-sm font-medium hover:shadow-lg hover:shadow-[#E8702A]/30',
    primary: 'bg-white hover:bg-neutral-100 text-black text-sm font-semibold shadow-md',
    secondary: 'bg-[#1C2E1E] hover:bg-[#2A442E] text-white text-sm font-medium shadow-md shadow-emerald-950/20',
    outline: 'bg-transparent border border-white/30 text-white hover:bg-white/10 hover:border-white',
    ghost: 'bg-transparent text-neutral-300 hover:text-white hover:bg-neutral-800/40',
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-xs gap-1.5',
    md: 'px-6 py-2.5 text-sm gap-2',
    lg: 'px-7 py-3 text-sm font-medium gap-2.5',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </motion.button>
  );
};
