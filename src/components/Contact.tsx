import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Github } from 'lucide-react';
import { LocationMapModal } from './LocationMapModal';
import { CinematicContact } from './CinematicContact';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 sm:py-32 bg-[#070707] text-white relative border-t border-white/10 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Section Label */}
        <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#E8702A] block mb-4">
          07 &bull; GET IN TOUCH
        </span>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <h2 className="text-5xl sm:text-7xl lg:text-8xl font-playfair italic font-normal text-white leading-[1.05] tracking-tight">
            we'd love to<br />hear from you!
          </h2>
        </motion.div>

        {/* Secondary Description Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <p className="text-base sm:text-xl text-white/70 leading-relaxed font-light max-w-2xl">
            Whether you have a project idea, collaboration opportunity, internship opportunity, freelance work, or simply want to connect, drop me a message and I'll get back to you as soon as possible.
          </p>
        </motion.div>

        {/* Contact Quick Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10"
        >
          {/* Phone Card with updated number 9831906881 */}
          <a
            href="tel:9831906881"
            className="p-5 rounded-2xl bg-[#0d0d11] border border-white/10 hover:border-[#E8702A]/60 transition-all flex items-center gap-4 group"
          >
            <div className="p-3 rounded-xl bg-white/5 text-white group-hover:bg-[#E8702A] transition-colors shrink-0">
              <Phone className="w-5 h-5 text-[#E8702A] group-hover:text-white transition-colors" />
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-mono uppercase tracking-wider text-white/50">PHONE</p>
              <p className="text-sm font-semibold text-white mt-0.5 group-hover:text-[#E8702A] transition-colors truncate font-mono">
                +91 9831906881
              </p>
            </div>
          </a>

          {/* Interactive Google Maps & Real-time Location Card */}
          <LocationMapModal />

          {/* GitHub Card */}
          <a
            href="https://github.com/Souvik7661"
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-2xl bg-[#0d0d11] border border-white/10 hover:border-[#E8702A]/60 transition-all flex items-center gap-4 group"
          >
            <div className="p-3 rounded-xl bg-white/5 text-white group-hover:bg-[#E8702A] transition-colors shrink-0">
              <Github className="w-5 h-5 text-[#E8702A] group-hover:text-white transition-colors" />
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-mono uppercase tracking-wider text-white/50">GITHUB</p>
              <p className="text-sm font-semibold text-white mt-0.5 group-hover:text-[#E8702A] transition-colors truncate font-mono">
                github.com/Souvik7661
              </p>
            </div>
          </a>
        </motion.div>

        {/* Side-by-side Dual Device Showcase (iPhone Call + MacBook Encrypted Form) */}
        <CinematicContact />

      </div>
    </section>
  );
};
