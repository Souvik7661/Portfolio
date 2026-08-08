import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SpotlightReveal } from './SpotlightReveal';

const PROFILE_IMAGE = '/images/profile.png';

export const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative h-screen w-full overflow-hidden bg-[#080808] text-white"
      aria-label="Souvik Kundu — Hero"
    >
      {/* ── Subtle ambient orange glow behind where the person stands ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 55% 60% at 50% 55%, rgba(232,112,42,0.07) 0%, transparent 70%)',
        }}
      />

      {/* ── Person cutout — full blended, no background ── */}
      <SpotlightReveal image={PROFILE_IMAGE} />

      {/* ── Gradient overlays: top fade + bottom fade to keep text readable ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, #080808 0%, transparent 22%, transparent 62%, #080808 100%)',
        }}
      />

      {/* ── LEFT edge fade ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, #080808 0%, transparent 28%, transparent 72%, #080808 100%)',
        }}
      />

      {/* ── ALL CONTENT — full viewport width, padded inside ── */}
      <div className="absolute inset-0 z-30 flex flex-col w-full h-full px-6 sm:px-10 lg:px-16">

        {/* Top spacer for navbar */}
        <div className="h-20 sm:h-24 flex-none" />

        {/* ── TOP META ROW ── */}
        <div className="flex items-start justify-between w-full flex-none">

          {/* LEFT: role tag */}
          <div>
            <p className="text-[10px] font-mono tracking-[0.25em] text-white/40 uppercase mb-1">
              Creative Developer
            </p>
            <p className="text-xs font-light text-white/60 leading-relaxed">
              Full-Stack · React · Java · AI
            </p>
          </div>

          {/* CENTER: status pill */}
          <div className="hidden sm:flex items-center gap-2 border border-white/10 bg-white/5 backdrop-blur-sm rounded-full px-4 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-mono text-white/60 tracking-wider">Available for work</span>
          </div>

          {/* RIGHT: university */}
          <div className="text-right">
            <p className="text-[10px] font-mono tracking-[0.25em] text-white/40 uppercase mb-1">
              B.Tech CSE · 2028
            </p>
            <p className="text-xs font-light text-white/60">
              Sister Nivedita University
            </p>
          </div>
        </div>

        {/* ── FLEX SPACER ── */}
        <div className="flex-1" />

        {/* ── BOTTOM CONTENT ── */}
        <div className="flex-none pb-6 sm:pb-8 w-full">

          {/* GIANT NAME — single line, fluid to screen width */}
          <h1
            className="font-black uppercase tracking-tighter leading-none text-white w-full"
            style={{ fontSize: 'clamp(3rem, 12vw, 11rem)', lineHeight: 0.88 }}
          >
            SOUVIK KUNDU
          </h1>

          {/* Thin divider */}
          <div className="w-full h-px bg-white/10 mt-4 mb-5" />

          {/* BOTTOM ROW: tagline + stats + buttons */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 w-full">

            {/* LEFT: tagline */}
            <div className="max-w-sm">
              <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed">
                Building digital experiences at the intersection of{' '}
                <span className="text-[#E8702A] font-medium">design</span> and{' '}
                <span className="text-[#E8702A] font-medium">engineering</span>.
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                {['CGPA 8.68', 'B.Tech CSE', 'Graduating 2028'].map(tag => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono tracking-widest border border-white/15 text-white/50 px-2.5 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* RIGHT: CTAs */}
            <div className="flex items-center gap-3">
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-2 bg-[#E8702A] hover:bg-[#d2611f] px-6 py-3 text-white text-xs font-bold tracking-widest uppercase transition-colors shadow-lg shadow-[#E8702A]/20 cursor-pointer"
              >
                Explore Work <ArrowRight size={13} />
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 px-6 py-3 text-white text-xs font-semibold tracking-widest uppercase transition-colors cursor-pointer"
              >
                Let's Talk
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
