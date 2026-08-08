import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { SpotlightReveal } from './SpotlightReveal';

const PROFILE_IMAGE = '/images/profile-cutout.png';

// Reusable fade-up variant
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
});

export const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative h-screen w-full overflow-hidden bg-[#070707] text-white selection:bg-[#E8702A] selection:text-white"
      aria-label="Hero — Souvik Kundu Design & Engineering"
    >
      {/* ── Ambient glow — pulses subtly ── */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background: 'radial-gradient(circle at 50% 45%, rgba(232,112,42,0.11) 0%, rgba(10,10,10,0.6) 50%, rgba(7,7,7,1) 100%)',
        }}
      />

      {/* ── Interactive 3D portrait cutout ── */}
      <SpotlightReveal image={PROFILE_IMAGE} />

      {/* ── Top & bottom vignette ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-25 pointer-events-none bg-gradient-to-b from-black/80 via-transparent to-black/95"
      />

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-30 flex h-full flex-col w-full px-5 sm:px-6 md:px-10 lg:px-14">

        <div className="h-20 sm:h-24" />

        {/* ── 4-COLUMN META GRID ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 pt-2 sm:pt-4">

          {/* COL 1 */}
          <motion.div {...fadeUp(0.1)}>
            <p className="font-pixel text-xs text-[#E8702A] tracking-widest uppercase mb-1">
              Code · Create · Impact
            </p>
            <p className="font-pixel text-xs text-white/60 leading-relaxed">
              Building software ideas<br />
              into useful digital<br />
              experiences
            </p>
          </motion.div>

          {/* COL 2 */}
          <motion.div {...fadeUp(0.2)} className="text-right sm:text-right lg:text-left">
            <h2 className="text-lg md:text-xl tracking-wide leading-tight">
              <span className="block font-normal text-white/90">COMPUTER SCIENCE &amp;</span>
              <span className="block font-pixel text-2xl md:text-3xl text-white font-normal">ENGINEERING</span>
            </h2>
            <p className="hidden sm:block text-xs font-mono text-white/40 mt-3">
              Sister Nivedita University · CSE
            </p>
          </motion.div>

          {/* COL 3 */}
          <motion.div {...fadeUp(0.3)} className="hidden sm:block">
            <h3 className="font-pixel text-xs tracking-widest text-[#E8702A] uppercase mb-2">
              What I Do
            </h3>
            <p className="text-xs sm:text-sm text-white/85 leading-relaxed max-w-[200px] font-light">
              Building web applications, full-stack systems, and interactive digital products
            </p>
          </motion.div>

          {/* COL 4 */}
          <motion.div {...fadeUp(0.4)} className="hidden lg:block">
            <h3 className="font-pixel text-xs tracking-widest text-[#E8702A] uppercase mb-2">
              Services
            </h3>
            <ul className="text-xs text-white/80 leading-relaxed space-y-0.5 font-light">
              {[
                'Full-Stack Web Development',
                'React, TypeScript & Next.js',
                'Java & Spring Boot Systems',
                'Database & RESTful APIs',
                'AI Models & Automation',
              ].map((item) => (
                <motion.li
                  key={item}
                  whileHover={{ x: 4, color: '#fff' }}
                  transition={{ duration: 0.2 }}
                  className="cursor-default"
                >
                  • {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="flex-1 min-h-[20px]" />

        {/* ── BOTTOM SECTION ── */}
        <div className="pb-5 sm:pb-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 items-end">

            {/* LEFT: HEADLINE */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            >
              <h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-[4rem] tracking-wide uppercase font-normal text-white"
                style={{ lineHeight: 0.85 }}
              >
                BUILDING THE<br />
                <motion.span
                  className="font-pixel font-normal text-[1.2em] inline-block leading-none text-[#E8702A]"
                  whileHover={{ letterSpacing: '0.05em', textShadow: '0 0 30px rgba(232,112,42,0.6)' }}
                  transition={{ duration: 0.3 }}
                >
                  UNEXPECTED
                </motion.span>{' '}INTO<br />
                DIGITAL &amp; SOFTWARE<br />
                <motion.span
                  className="font-pixel font-normal text-[1.2em] inline-block leading-none text-[#E8702A]"
                  whileHover={{ letterSpacing: '0.05em', textShadow: '0 0 30px rgba(232,112,42,0.6)' }}
                  transition={{ duration: 0.3 }}
                >
                  EXPERIENCES
                </motion.span>
              </h1>
            </motion.div>

            {/* RIGHT: CTAs & STATS */}
            <motion.div
              {...fadeUp(0.35)}
              className="flex flex-col gap-4 sm:gap-5 justify-end"
            >
              {/* BUTTONS */}
              <div className="self-start flex flex-wrap items-center gap-3">

                {/* Primary CTA — shimmer effect */}
                <motion.a
                  href="#projects"
                  whileHover={{ scale: 1.04, boxShadow: '0 0 28px rgba(232,112,42,0.45)' }}
                  whileTap={{ scale: 0.96 }}
                  className="relative inline-flex items-center gap-2 overflow-hidden border border-[#E8702A] bg-[#E8702A] px-6 py-3 text-white text-xs sm:text-sm font-semibold tracking-wider uppercase cursor-pointer group"
                >
                  {/* Shimmer overlay */}
                  <span
                    className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)',
                    }}
                  />
                  <span className="relative">Explore Work</span>
                  <motion.span
                    className="relative"
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <ArrowRight size={14} />
                  </motion.span>
                </motion.a>

                {/* Secondary CTA */}
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.04, borderColor: 'rgba(255,255,255,0.5)', backgroundColor: 'rgba(255,255,255,0.08)' }}
                  whileTap={{ scale: 0.96 }}
                  className="inline-flex items-center gap-2 border border-white/20 px-6 py-3 backdrop-blur-md bg-white/5 text-white text-xs sm:text-sm tracking-wider uppercase font-medium transition-colors cursor-pointer"
                >
                  Let's Connect
                </motion.a>
              </div>

              {/* STATS CHIPS */}
              <div className="self-start lg:self-end flex flex-wrap items-stretch gap-2 sm:gap-3">
                {[
                  { label: 'CGPA', value: '8.68 / 10', accent: true },
                  { label: 'DEGREE', value: 'B.Tech CSE', accent: false },
                  { label: 'GRADUATION', value: '2028', accent: false },
                ].map(({ label, value, accent }) => (
                  <motion.div
                    key={label}
                    whileHover={{
                      scale: 1.06,
                      borderColor: accent ? 'rgba(232,112,42,0.6)' : 'rgba(255,255,255,0.3)',
                      boxShadow: accent
                        ? '0 0 16px rgba(232,112,42,0.25)'
                        : '0 0 12px rgba(255,255,255,0.08)',
                      y: -2,
                    }}
                    transition={{ duration: 0.2 }}
                    className="bg-[#0D0D0D] px-3.5 py-2 flex items-center gap-2 border border-neutral-800 rounded-md cursor-default"
                  >
                    <span className="font-bold text-xs sm:text-sm tracking-tight text-white/90">{label}</span>
                    <span className={`text-xs font-mono font-bold ${accent ? 'text-[#E8702A]' : 'text-white/60'}`}>
                      {value}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* FOOTER STRIP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-4 sm:mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 pt-4 border-t border-white/10"
          >
            <div className="text-xs text-white/60 flex items-center gap-2">
              <motion.span
                animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', repeatDelay: 2 }}
              >
                <Sparkles size={12} className="text-[#E8702A]" />
              </motion.span>
              <span>Open for internships, project collaboration or freelance.&nbsp;</span>
              <motion.a
                href="#contact"
                whileHover={{ color: '#ff6b6b' }}
                className="text-red-500 font-medium underline underline-offset-2 transition-colors"
              >
                Schedule a call
              </motion.a>
            </div>
            <div className="text-xs text-white/50 sm:text-right font-mono">
              3 featured projects &bull; 17+ technologies &bull; Shyamnagar, West Bengal
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
