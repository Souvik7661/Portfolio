import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { name: 'ABOUT', href: '#about' },
  { name: 'SKILLS', href: '#skills' },
  { name: 'PROJECTS', href: '#projects' },
  { name: 'EDUCATION', href: '#education' },
  { name: 'OPEN SOURCE', href: '#github' },
  { name: 'CONTACT', href: '#contact' },
];

export const Navbar: React.FC = () => {
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
      {/* ── MAIN NAVBAR ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-[100] pt-safe transition-all duration-500 ${scrolled ? 'bg-black/90 backdrop-blur-md py-3.5 border-b border-white/10' : 'bg-transparent py-5'
          }`}
      >
        <div className="relative z-10 flex items-center justify-between px-5 sm:px-6 md:px-10 lg:px-14 max-w-7xl mx-auto">

          {/* LEFT: LOGO */}
          <a
            href="#hero"
            className="flex items-center gap-3 text-white select-none group py-1"
            aria-label="Souvik Kundu — Home"
          >
            {/* User Logo Image with Full Face & SK Mark */}
            <img
              src="/images/logo.png"
              alt="Souvik Kundu Logo"
              className="w-9 h-9 rounded-full object-cover border border-white/30 shadow-md group-hover:scale-105 transition-transform"
            />

            <div className="flex items-center gap-1.5 leading-none select-none">
              <span className="font-normal tracking-wider text-xs uppercase text-white">
                SOUVIK
              </span>
              <span className="font-pixel text-sm text-[#E8702A] tracking-wider uppercase">
                KUNDU
              </span>
            </div>
          </a>

          {/* RIGHT DESKTOP NAV (md+) */}
          <nav className="hidden md:flex items-center gap-8 text-sm tracking-wide font-medium">
            {NAV_LINKS.map(({ name, href }) => (
              <a
                key={name}
                href={href}
                className="text-white/80 hover:text-white hover:opacity-100 transition-all tracking-wider text-xs font-mono"
              >
                {name}
              </a>
            ))}
          </nav>

          {/* RIGHT MOBILE MENU BUTTON (<md) */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden p-3 -mr-2 text-white hover:opacity-70 transition-opacity focus:outline-none cursor-pointer min-w-[48px] min-h-[48px] flex items-center justify-center"
            aria-label="Open Navigation Menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* ── MOBILE FULLSCREEN MENU ── */}
      <div
        className={`fixed inset-0 z-[150] bg-black/96 backdrop-blur-md flex flex-col pt-safe pb-safe pl-safe pr-safe transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Overlay"
      >
        {/* Mobile Header */}
        <div className="flex items-center justify-between px-6 py-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <img src="/images/logo.png" alt="Souvik Kundu Logo" className="w-9 h-9 rounded-full object-cover border border-white/30" />
            <div className="flex items-center gap-1.5 leading-none select-none">
              <span className="font-normal tracking-wider text-xs uppercase text-white">SOUVIK</span>
              <span className="font-pixel text-sm text-[#E8702A] tracking-wider uppercase">KUNDU</span>
            </div>
          </div>

          <button
            onClick={() => setMenuOpen(false)}
            className="p-3 -mr-2 text-white hover:opacity-70 transition-opacity focus:outline-none cursor-pointer min-w-[48px] min-h-[48px] flex items-center justify-center"
            aria-label="Close Navigation Menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Staggered Navigation Links */}
        <nav className="flex flex-col items-center justify-center flex-1 gap-6 sm:gap-8 px-6 py-4 overflow-y-auto">
          {NAV_LINKS.map(({ name, href }, i) => (
            <a
              key={name}
              href={href}
              onClick={() => setMenuOpen(false)}
              style={{
                transitionDelay: menuOpen ? `${100 + i * 60}ms` : '0ms',
              }}
              className={`text-xl sm:text-2xl tracking-widest font-mono text-white/90 hover:text-[#E8702A] py-2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
            >
              {name}
            </a>
          ))}

          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="mt-4 px-8 py-3 bg-[#E8702A] text-white rounded-full font-semibold text-sm tracking-wider uppercase shadow-xl hover:bg-[#D2611F] active:scale-95 transition-all"
          >
            Let's Talk
          </a>
        </nav>

        {/* Mobile Footer Note */}
        <div className="py-4 sm:py-6 text-center text-xs text-white/30 font-mono border-t border-white/10">
          SOUVIK KUNDU · DESIGN &amp; ENGINEERING
        </div>
      </div>
    </>
  );
};
