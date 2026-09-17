import React, { useState, useEffect } from 'react';
import { Menu, X, PhoneCall, FileText } from 'lucide-react';

const NAV_LINKS = [
  { name: 'HOME', href: '#hero' },
  { name: 'ABOUT', href: '#about' },
  { name: 'RESUME', href: '#resume' },
  { name: 'SERVICES', href: '#services' },
  { name: 'PORTFOLIO', href: '#projects' },
  { name: 'CONTACT', href: '#contact' },
];

interface NavbarProps {
  onOpenResume?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      {/* MAIN NAVBAR */}
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled ? 'bg-[#070707]/90 backdrop-blur-md py-3 border-b border-white/10' : 'bg-transparent py-5'
        }`}
      >
        <div className="flex items-center justify-between px-5 sm:px-8 md:px-12 max-w-7xl mx-auto w-full">

          {/* LEFT: LOGO */}
          <a
            href="#hero"
            className="flex items-center gap-3 text-white select-none group py-1"
            aria-label="Souvik Kundu — Home"
          >
            <img
              src="/images/logo.png"
              alt="Souvik Kundu Logo"
              className="w-9 h-9 rounded-full object-cover border border-white/30 shadow-md group-hover:scale-105 transition-transform"
            />
            <div className="flex items-center gap-1.5 leading-none select-none">
              <span className="font-bold tracking-widest text-xs uppercase text-white font-sans">
                SOUVIK
              </span>
              <span className="font-pixel text-sm text-[#E8702A] tracking-wider uppercase">
                KUNDU
              </span>
            </div>
          </a>

          {/* CENTER DESKTOP NAV (md+) */}
          <nav className="hidden md:flex items-center gap-8 text-xs tracking-widest font-mono font-semibold">
            {NAV_LINKS.map(({ name, href }) => (
              <a
                key={name}
                href={href}
                className="text-white/70 hover:text-[#E8702A] hover:opacity-100 transition-all uppercase"
              >
                {name}
              </a>
            ))}
          </nav>

          {/* RIGHT ACTION BUTTON */}
          <div className="hidden md:flex items-center gap-3">
            {onOpenResume && (
              <button
                type="button"
                onClick={onOpenResume}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#E8702A]/15 hover:bg-[#E8702A] text-[#E8702A] hover:text-white text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 border border-[#E8702A]/40 cursor-pointer shadow-sm active:scale-95"
                title="View Resume"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>RESUME</span>
              </button>
            )}
            <a
              href="tel:9841906881"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-[#E8702A] text-white text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 border border-white/10 cursor-pointer shadow-lg"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>GIVE ME A CALL</span>
            </a>
          </div>

          {/* RIGHT MOBILE MENU BUTTON (<md) */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden p-2.5 text-white hover:opacity-70 transition-opacity focus:outline-none cursor-pointer flex items-center justify-center"
            aria-label="Open Navigation Menu"
          >
            <Menu size={24} />
          </button>
        </div>

        {/* SUB-NAVBAR STATUS TICKER BAR */}
        <div className="hidden sm:flex items-center justify-between px-6 md:px-12 py-1.5 bg-[#050507]/80 border-t border-b border-white/5 text-[10px] font-mono text-white/50">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>SYSTEM ONLINE</span>
          </div>
          <div>
            MOTION ENGINE: FRAMER 10.16
          </div>
          <div className="text-[#E8702A]">
            NEURAL LINK: ESTABLISHED
          </div>
        </div>
      </header>

      {/* MOBILE FULLSCREEN OVERLAY MENU */}
      <div
        className={`fixed inset-0 z-[150] bg-[#070707]/98 backdrop-blur-xl flex flex-col pt-safe pb-safe pl-safe pr-safe transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Overlay"
      >
        <div className="flex items-center justify-between px-6 py-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <img src="/images/logo.png" alt="Souvik Kundu Logo" className="w-9 h-9 rounded-full object-cover border border-white/30" />
            <div className="flex items-center gap-1.5 leading-none select-none">
              <span className="font-bold tracking-widest text-xs uppercase text-white font-sans">SOUVIK</span>
              <span className="font-pixel text-sm text-[#E8702A] tracking-wider uppercase">KUNDU</span>
            </div>
          </div>

          <button
            onClick={() => setMenuOpen(false)}
            className="p-3 text-white hover:opacity-70 transition-opacity focus:outline-none cursor-pointer flex items-center justify-center"
            aria-label="Close Navigation Menu"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex flex-col items-center justify-center flex-1 gap-6 px-6 py-4 overflow-y-auto font-mono">
          {NAV_LINKS.map(({ name, href }, i) => (
            <a
              key={name}
              href={href}
              onClick={() => setMenuOpen(false)}
              style={{
                transitionDelay: menuOpen ? `${100 + i * 60}ms` : '0ms',
              }}
              className={`text-2xl tracking-widest text-white/90 hover:text-[#E8702A] py-2 transition-all duration-500 ${
                menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              {name}
            </a>
          ))}

          {onOpenResume && (
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                onOpenResume();
              }}
              className="mt-4 px-8 py-3.5 bg-white/10 hover:bg-[#E8702A] text-white border border-white/20 rounded-full font-bold text-xs tracking-widest uppercase shadow-xl transition-all font-mono flex items-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-[#E8702A]" />
              <span>VIEW RESUME</span>
            </button>
          )}

          <a
            href="tel:9841906881"
            onClick={() => setMenuOpen(false)}
            className="mt-2 px-8 py-3.5 bg-[#E8702A] text-white rounded-full font-bold text-xs tracking-widest uppercase shadow-xl hover:bg-[#d65f1c] active:scale-95 transition-all font-mono"
          >
            GIVE ME A CALL
          </a>
        </nav>

        <div className="py-4 text-center text-xs text-white/30 font-mono border-t border-white/10">
          SOUVIK KUNDU &bull; DESIGN &amp; ENGINEERING
        </div>
      </div>
    </>
  );
};
