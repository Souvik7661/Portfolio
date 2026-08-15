import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Phone, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="bg-[#050507] text-white border-t border-white/10 pt-20 pb-10 relative z-10 overflow-hidden font-mono">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 space-y-16">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          
          {/* Brand & Slogan (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img src="/images/logo.png" alt="Souvik Kundu Logo" className="w-10 h-10 rounded-full object-cover border border-white/30" />
              <span className="text-xl font-bold tracking-widest text-white uppercase font-sans">
                SOUVIK<span className="text-[#E8702A]">KUNDU</span>
              </span>
            </div>

            <p className="text-xs text-white/60 leading-relaxed max-w-sm font-light">
              DEVELOPING HIGH QUALITY SCALABLE DIGITAL PRODUCTS, FULL-STACK SYSTEMS, AND REAL-TIME INFRASTRUCTURE.
            </p>

            <div className="pt-2 text-[11px] text-[#E8702A] tracking-wider uppercase">
              SISTER NIVEDITA UNIVERSITY &bull; CSE 2028
            </div>
          </div>

          {/* Control Center Links (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold tracking-widest uppercase text-white/40 mb-4">
              CONTROL_CENTER
            </h4>
            <ul className="space-y-2 text-xs text-white/80">
              {['ABOUT', 'SERVICES', 'PORTFOLIO', 'CONTACT'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="hover:text-[#E8702A] transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Neural Network Tech Stack (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold tracking-widest uppercase text-white/40 mb-4">
              NEURAL_NETWORK
            </h4>
            <ul className="space-y-2 text-xs text-white/70">
              {['VITE', 'REACT', 'JAVA', 'SPRING BOOT', 'TAILWIND'].map((tech) => (
                <li key={tech} className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-[#E8702A]" />
                  <span>{tech}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Broadcast Line & Action Button (3 cols) */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-bold tracking-widest uppercase text-white/40 mb-4">
              BROADCAST_LINE
            </h4>

            <div className="flex items-center gap-3">
              <a
                href="https://github.com/Souvik7661"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="p-2.5 rounded-lg bg-white/5 hover:bg-[#E8702A] text-white transition-all border border-white/10"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/in/souvik-kundu-0277593b1"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="p-2.5 rounded-lg bg-white/5 hover:bg-[#E8702A] text-white transition-all border border-white/10"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="tel:9841906881"
                aria-label="Phone"
                className="p-2.5 rounded-lg bg-white/5 hover:bg-[#E8702A] text-white transition-all border border-white/10"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>

            <a
              href="#contact"
              className="inline-flex items-center justify-between w-full px-4 py-3 rounded-lg bg-white/10 hover:bg-[#E8702A] text-white text-xs font-bold tracking-wider uppercase transition-all border border-white/10 group cursor-pointer"
            >
              <span>INITIATE TRANSMISSION</span>
              <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

        </div>

        {/* Bottom Tactical Ticker Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-white/40 border-t border-white/5 pt-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>PULSE LOG: ALL SYSTEMS GO</span>
          </div>

          <div className="text-white/60">
            TO: 2026 || BRIGHT_FUT
          </div>

          <div>
            LOCAL_TIME: <span className="text-[#E8702A] font-bold">{timeStr || '19:42:00'}</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
