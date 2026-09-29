import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Phone, ArrowUpRight, ShieldCheck, Scale, FileText } from 'lucide-react';

interface FooterProps {
  onOpenPrivacy?: () => void;
  onOpenTerms?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacy, onOpenTerms }) => {
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
    <footer className="bg-[#050507] text-white border-t border-white/10 pt-16 pb-12 relative z-10 overflow-hidden font-mono">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 space-y-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-white/10">
          
          {/* Brand & Slogan (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/images/logo.png"
                alt="Souvik Kundu Logo"
                loading="lazy"
                decoding="async"
                className="w-10 h-10 rounded-full object-cover border border-white/30"
              />
              <span className="text-xl font-bold tracking-widest text-white uppercase font-sans">
                SOUVIK<span className="text-[#E8702A]">KUNDU</span>
              </span>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed max-w-sm font-light">
              DEVELOPING HIGH-QUALITY SCALABLE DIGITAL PRODUCTS, FULL-STACK SYSTEMS, AND REAL-TIME INFRASTRUCTURE.
            </p>

            <div className="pt-2 text-[11px] text-[#E8702A] tracking-wider uppercase font-bold">
              SISTER NIVEDITA UNIVERSITY &bull; CSE 2028
            </div>
          </div>

          {/* Control Center Links (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <h3 className="text-xs font-bold tracking-widest uppercase text-zinc-400 mb-4">
              NAVIGATION
            </h3>
            <ul className="space-y-2 text-xs text-zinc-300">
              {[
                { name: 'ABOUT', href: '#about' },
                { name: 'RESUME', href: '#resume' },
                { name: 'SERVICES', href: '#services' },
                { name: 'PORTFOLIO', href: '#projects' },
                { name: 'CONTACT', href: '#contact' },
              ].map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="hover:text-[#E8702A] transition-colors">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Neural Network Tech Stack (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <h3 className="text-xs font-bold tracking-widest uppercase text-zinc-400 mb-4">
              TECH_STACK
            </h3>
            <ul className="space-y-2 text-xs text-zinc-300">
              {['TYPESCRIPT', 'REACT', 'PYTHON', 'JAVA', 'TAILWIND'].map((tech) => (
                <li key={tech} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E8702A]" />
                  <span>{tech}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Broadcast Line & Action Button (3 cols) */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="text-xs font-bold tracking-widest uppercase text-zinc-400 mb-4">
              BROADCAST_LINE
            </h3>

            <div className="flex items-center gap-3">
              <a
                href="https://github.com/Souvik7661"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile (opens in new tab)"
                className="p-2.5 rounded-lg bg-white/5 hover:bg-[#E8702A] text-white transition-all border border-white/10"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/in/souvik-kundu-0277593b1"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile (opens in new tab)"
                className="p-2.5 rounded-lg bg-white/5 hover:bg-[#E8702A] text-white transition-all border border-white/10"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="tel:+919831906881"
                aria-label="Phone Number"
                className="p-2.5 rounded-lg bg-white/5 hover:bg-[#E8702A] text-white transition-all border border-white/10"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>

            <a
              href="#contact"
              className="inline-flex items-center justify-between w-full px-4 py-3 rounded-lg bg-[#E8702A] hover:bg-[#d65f1c] text-white text-xs font-bold tracking-wider uppercase transition-all shadow-md group cursor-pointer"
            >
              <span>GET IN TOUCH</span>
              <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

        </div>

        {/* Legal & Compliance Strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-zinc-400 pt-2 border-b border-white/5 pb-8">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <button
              onClick={onOpenPrivacy}
              className="hover:text-[#E8702A] transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <ShieldCheck size={14} />
              <span>PRIVACY POLICY</span>
            </button>
            <button
              onClick={onOpenTerms}
              className="hover:text-[#E8702A] transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Scale size={14} />
              <span>TERMS &amp; CONDITIONS</span>
            </button>
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#E8702A] transition-colors flex items-center gap-1.5"
            >
              <FileText size={14} />
              <span>SITEMAP</span>
            </a>
            <a
              href="/llms.txt"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#E8702A] transition-colors flex items-center gap-1.5"
            >
              <span>LLMS.TXT</span>
            </a>
          </div>

          <div className="text-zinc-500 text-[11px]">
            &copy; {new Date().getFullYear()} Souvik Kundu. All rights reserved.
          </div>
        </div>

        {/* Bottom Tactical Ticker Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-400 pt-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-emerald-400 font-bold">SYSTEM STATUS: OPTIMAL</span>
          </div>

          <div className="text-zinc-400">
            HTTPS ENCRYPTED &bull; ZERO TRACKERS
          </div>

          <div>
            KOLKATA TIME: <span className="text-[#E8702A] font-bold">{timeStr || '02:30:00'}</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
