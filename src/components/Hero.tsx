import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { SpotlightReveal } from './SpotlightReveal';

const PROFILE_IMAGE = '/images/profile.png';

export const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative h-screen w-full overflow-hidden bg-[#070707] text-white selection:bg-[#E8702A] selection:text-white"
      aria-label="Hero — Souvik Kundu Design & Engineering"
    >
      {/* ── 1. CLEAN AMBIENT RADIAL BACKGROUND GLOW ── */}
      <div 
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 45%, rgba(232, 112, 42, 0.09) 0%, rgba(10, 10, 10, 0.6) 50%, rgba(7, 7, 7, 1) 100%)',
        }}
      />

      {/* ── 2. INTERACTIVE MOUSE-CONTROLLED FEATHERED HEAD & SPOTLIGHT (NO BOX EDGES) ── */}
      <SpotlightReveal image={PROFILE_IMAGE} />

      {/* ── 3. CLEAN GRADIENT VIGNETTE ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-25 pointer-events-none bg-gradient-to-b from-black/80 via-transparent to-black/95"
      />

      {/* ── 4. MAIN CONTENT WRAPPER ── */}
      <div className="relative z-30 flex h-full flex-col px-5 sm:px-6 md:px-10 lg:px-14 max-w-7xl mx-auto w-full">
        
        {/* Top Spacer for fixed Navbar */}
        <div className="h-20 sm:h-24" />

        {/* ── 4-COLUMN META GRID (Clean, Non-Overlapping Spacing) ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 pt-2 sm:pt-4">
          
          {/* COL 1: SOUVIK KUNDU */}
          <div>
            <h2 className="text-lg md:text-xl tracking-wide leading-tight">
              <span className="block font-normal text-white/90">SOUVIK</span>
              <span className="block font-pixel text-2xl md:text-3xl text-[#E8702A] font-normal">KUNDU</span>
            </h2>
            <p className="font-pixel mt-2 text-xs text-white/60 leading-relaxed">
              Code · Create · Impact<br />
              Building software ideas<br />
              into useful digital<br />
              experiences
            </p>
          </div>

          {/* COL 2: DISCIPLINE */}
          <div className="text-right sm:text-right lg:text-left">
            <h2 className="text-lg md:text-xl tracking-wide leading-tight">
              <span className="block font-normal text-white/90">DESIGN &amp;</span>
              <span className="block font-pixel text-2xl md:text-3xl text-white font-normal">ENGINEERING</span>
            </h2>
            <p className="hidden sm:block text-xs font-mono text-white/40 mt-3">
              Sister Nivedita University · CSE
            </p>
          </div>

          {/* COL 3: WHAT I DO */}
          <div className="hidden sm:block">
            <h3 className="font-pixel text-xs tracking-widest text-[#E8702A] uppercase mb-2">
              What I Do
            </h3>
            <p className="text-xs sm:text-sm text-white/85 leading-relaxed max-w-[200px] font-light">
              Building web applications, full-stack systems, and interactive digital products
            </p>
          </div>

          {/* COL 4: SERVICES */}
          <div className="hidden lg:block text-right lg:text-left">
            <h3 className="font-pixel text-xs tracking-widest text-[#E8702A] uppercase mb-2">
              Services
            </h3>
            <ul className="text-xs text-white/80 leading-relaxed space-y-0.5 font-light">
              <li>• Full-Stack Web Development</li>
              <li>• React, TypeScript &amp; Next.js</li>
              <li>• Java &amp; Spring Boot Systems</li>
              <li>• Database &amp; RESTful APIs</li>
              <li>• AI Models &amp; Automation</li>
            </ul>
          </div>
        </div>

        {/* FLEX SPACER - Pushes bottom section to viewport bottom */}
        <div className="flex-1 min-h-[20px]" />

        {/* ── BOTTOM SECTION ── */}
        <div className="pb-5 sm:pb-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 items-end">
            
            {/* LEFT: HERO HEADLINE WITH PIXEL ACCENTS */}
            <div>
              <h1 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-[4rem] tracking-wide uppercase font-normal text-white"
                style={{ lineHeight: 0.8 }}
              >
                BUILDING THE<br />
                <span className="font-pixel font-normal text-[1.2em] inline-block leading-none align-baseline text-[#E8702A]">
                  UNEXPECTED
                </span> INTO<br />
                DIGITAL &amp; SOFTWARE<br />
                <span className="font-pixel font-normal text-[1.2em] inline-block leading-none align-baseline text-[#E8702A]">
                  EXPERIENCES
                </span>
              </h1>
            </div>

            {/* RIGHT: CTAS & ACADEMIC HIGHLIGHTS */}
            <div className="flex flex-col gap-4 sm:gap-5 justify-end">
              
              {/* ACTION BUTTONS */}
              <div className="self-start flex flex-wrap items-center gap-3">
                <motion.a
                  href="#projects"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  className="inline-flex items-center gap-2 border border-[#E8702A] bg-[#E8702A] px-6 py-3 text-white text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all hover:bg-[#D2611F] shadow-lg shadow-[#E8702A]/25 cursor-pointer"
                >
                  <span>Explore Work</span>
                  <ArrowRight size={14} />
                </motion.a>

                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  className="inline-flex items-center gap-2 border border-white/20 px-6 py-3 backdrop-blur-md bg-white/5 hover:bg-white/10 text-white text-xs sm:text-sm tracking-wider uppercase font-medium transition-all cursor-pointer"
                >
                  <span>Let's Connect</span>
                </motion.a>
              </div>

              {/* SOUVIK'S REAL STATS CHIPS */}
              <div className="self-start lg:self-end flex flex-wrap items-stretch gap-2 sm:gap-3 text-sm text-white/80">
                <div className="bg-[#0D0D0D] px-3.5 py-2 flex items-center gap-2 border border-neutral-800 rounded-md">
                  <span className="font-bold text-xs sm:text-sm tracking-tight text-white/90">CGPA</span>
                  <span className="text-[#E8702A] text-xs font-mono font-bold">8.68 / 10</span>
                </div>
                <div className="bg-[#0D0D0D] px-3.5 py-2 flex items-center gap-2 border border-neutral-800 rounded-md">
                  <span className="font-bold text-xs sm:text-sm tracking-tight text-white/90">DEGREE</span>
                  <span className="text-white/60 text-xs font-mono">B.Tech CSE</span>
                </div>
                <div className="bg-[#0D0D0D] px-3.5 py-2 flex items-center gap-2 border border-neutral-800 rounded-md">
                  <span className="font-bold text-xs sm:text-sm tracking-tight text-white/90">GRADUATION</span>
                  <span className="text-white/60 text-xs font-mono">2028</span>
                </div>
              </div>

            </div>
          </div>

          {/* FOOTER STRIP */}
          <div className="mt-4 sm:mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 pt-4 border-t border-white/10">
            <div className="text-xs text-white/60 flex items-center gap-2">
              <Sparkles size={12} className="text-[#E8702A]" />
              <span>Open for internships, project collaboration or freelance.&nbsp;</span>
              <a 
                href="#contact" 
                className="text-red-500 hover:text-red-400 transition-colors font-medium underline underline-offset-2"
              >
                Schedule a call
              </a>
            </div>
            <div className="text-xs text-white/50 sm:text-right font-mono">
              3 featured projects &bull; 17+ technologies &bull; Shyamnagar, West Bengal
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
