import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export const LaptopShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Bind lid opening directly to user's scrolling progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Smooth out scroll progress using spring physics for realistic mechanical motion
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001,
  });

  // Map scroll progress strictly to Lid 3D rotateX angle:
  // Starts folded flat closed (88deg) -> Opens flat (0deg) at center -> Closes back (88deg) when exiting
  const lidRotate = useTransform(smoothProgress, [0.08, 0.42, 0.58, 0.92], [88, 0, 0, 88]);
  const screenGlow = useTransform(smoothProgress, [0.15, 0.42, 0.58, 0.85], [0, 1, 1, 0]);
  const textOpacity = useTransform(smoothProgress, [0.35, 0.45, 0.55, 0.65], [0, 1, 1, 0]);
  const shadowScale = useTransform(smoothProgress, [0.08, 0.42, 0.58, 0.92], [0.7, 1.1, 1.1, 0.7]);

  return (
    <section
      ref={containerRef}
      className="relative py-24 sm:py-36 bg-[#07070a] border-t border-white/10 overflow-hidden flex flex-col items-center justify-center min-h-screen"
    >
      <div className="max-w-5xl mx-auto px-4 w-full flex flex-col items-center">
        
        {/* 3D STABLE MACBOOK CONTAINER */}
        <div
          className="relative w-full max-w-[850px] aspect-[16/10] flex flex-col items-center justify-center py-6"
          style={{ perspective: '1400px' }}
        >
          {/* LAPTOP LID (SCREEN ASSEMBLY) - Opens and closes smoothly around hinge */}
          <motion.div
            style={{
              rotateX: lidRotate,
              transformOrigin: 'bottom center',
              transformStyle: 'preserve-3d',
            }}
            className="relative w-[88%] h-[80%] bg-[#0d0e12] rounded-t-2xl border-[8px] sm:border-[11px] border-[#1e1e24] border-b-[14px] shadow-[0_-15px_60px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col items-center justify-center z-20 group"
          >
            {/* Display Camera Notch */}
            <div className="absolute top-0 w-28 h-3.5 bg-[#1e1e24] rounded-b-md flex items-center justify-center gap-2 z-30">
              <motion.div
                style={{ opacity: screenGlow }}
                className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse"
              />
              <div className="w-1 h-1 rounded-full bg-purple-500/40" />
            </div>

            {/* SCREEN DISPLAY - PURPLE SILK ATMOSPHERIC WAVES */}
            <motion.div
              style={{ opacity: screenGlow }}
              className="relative inset-0 w-full h-full bg-[#05030a] flex flex-col items-center justify-center p-6 text-center overflow-hidden"
            >
              {/* Deep Purple Atmospheric Waves Backdrop */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#120724] via-[#05030a] to-[#25093e] pointer-events-none opacity-95" />
              
              {/* Animated Flowing Purple Waves SVG */}
              <svg
                className="absolute inset-0 w-full h-full opacity-70 pointer-events-none"
                viewBox="0 0 1000 600"
                fill="none"
              >
                <path
                  d="M -100 350 C 250 150, 550 480, 1100 120"
                  stroke="url(#purpleWave1)"
                  strokeWidth="8"
                  className="animate-pulse"
                />
                <path
                  d="M -100 420 C 300 220, 600 520, 1100 180"
                  stroke="url(#purpleWave2)"
                  strokeWidth="4"
                  opacity="0.8"
                />
                <defs>
                  <linearGradient id="purpleWave1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#7e22ce" />
                    <stop offset="50%" stopColor="#c084fc" />
                    <stop offset="100%" stopColor="#3b0764" />
                  </linearGradient>
                  <linearGradient id="purpleWave2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#c084fc" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Main Text: "Welcome to My Portfolio" */}
              <motion.div
                style={{ opacity: textOpacity }}
                className="relative z-10 space-y-2"
              >
                <p className="text-2xl sm:text-4xl font-light text-white font-sans tracking-wide drop-shadow-md">
                  Welcome to
                </p>
                
                <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-purple-300 via-[#c084fc] to-violet-400 bg-clip-text text-transparent font-sans tracking-tight drop-shadow-[0_0_40px_rgba(192,132,252,0.8)]">
                  My Portfolio
                </h2>
              </motion.div>

              {/* Glossy Screen Reflection */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
            </motion.div>

            {/* Back Lid Metal Cover */}
            <div
              className="absolute inset-0 bg-gradient-to-b from-[#25252b] via-[#17171d] to-[#0c0d11] rounded-t-xl flex items-center justify-center pointer-events-none"
              style={{
                transform: 'rotateY(180deg) translateZ(1px)',
                backfaceVisibility: 'hidden',
              }}
            >
              <div className="w-12 h-12 flex items-center justify-center text-[#E8702A]/30">
                <svg className="w-10 h-10 fill-current" viewBox="0 0 170 170">
                  <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.34.13-9.13-1.9-14.38-6.08-3.37-2.73-7.25-7.39-11.64-13.98-7.39-11.06-13.1-23.77-17.13-38.14-4.03-14.37-6.05-27.79-6.05-40.26 0-14.82 3.65-27.24 10.96-37.26 7.31-10.02 16.71-15.13 28.19-15.34 4.8 0 10.09 1.25 15.87 3.75 5.78 2.5 9.87 3.75 12.28 3.75 2.12 0 6.29-1.28 12.51-3.84 6.22-2.56 11.41-3.75 15.57-3.57 9.87.53 18.06 4.24 24.57 11.13-8.77 5.34-13.04 12.74-12.82 22.2.22 9.46 4.79 17.06 13.72 22.8-3.04 8.78-7.27 17.58-12.69 26.4zm-22.18-97.43c0-6.19 2.25-12.18 6.75-17.97 4.5-5.79 10.15-9.35 16.95-10.67.22 1.06.33 2.01.33 2.85 0 6.29-2.31 12.33-6.93 18.12-4.62 5.79-10.35 9.24-17.1 10.35-.11-.84-.17-1.74-.17-2.68z"/>
                </svg>
              </div>
            </div>
          </motion.div>

          {/* MACBOOK DECK & KEYBOARD BASE (STATIONARY) */}
          <div className="relative w-[98%] h-[24px] bg-gradient-to-b from-[#2a2a30] via-[#1c1c22] to-[#111116] rounded-b-2xl border-t border-white/20 shadow-2xl flex items-center justify-center z-10">
            <div className="w-28 h-2.5 bg-[#171717] rounded-b-md border-t border-neutral-700 shadow-inner" />
          </div>

          {/* Ambient Purple Table Shadow Glow */}
          <motion.div
            style={{ scale: shadowScale }}
            className="w-[85%] h-14 bg-purple-600/30 blur-3xl rounded-full mt-2 pointer-events-none"
          />
        </div>

      </div>
    </section>
  );
};
