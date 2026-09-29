import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Check } from 'lucide-react';

interface CookieConsentProps {
  onOpenPrivacy: () => void;
}

export const CookieConsent: React.FC<CookieConsentProps> = ({ onOpenPrivacy }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('souvik_cookie_consent');
    if (!saved) {
      // Delay display slightly so it doesn't collide with initial welcoming intro
      const timer = setTimeout(() => setVisible(true), 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = (type: 'all' | 'essential') => {
    localStorage.setItem('souvik_cookie_consent', type);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 sm:bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-[150] p-4 sm:p-5 rounded-2xl bg-[#0c0d12]/95 border border-white/15 shadow-[0_10px_40px_rgba(0,0,0,0.8)] backdrop-blur-xl text-white select-none"
          role="region"
          aria-label="Cookie and Privacy Consent"
        >
          <div className="flex items-start gap-3.5">
            <div className="p-2 rounded-xl bg-[#E8702A]/15 text-[#E8702A] border border-[#E8702A]/30 shrink-0 mt-0.5">
              <Shield size={18} />
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold tracking-wider uppercase text-white">
                  PRIVACY &amp; TELEMETRY
                </span>
                <span className="text-[10px] font-mono text-[#E8702A] bg-[#E8702A]/10 px-2 py-0.5 rounded-full border border-[#E8702A]/20">
                  Zero Trackers
                </span>
              </div>

              <p className="text-zinc-300 leading-relaxed font-sans">
                This portfolio operates with strict zero-tracking integrity. We use only essential cookies to preserve your preferences. Read our{' '}
                <button
                  onClick={onOpenPrivacy}
                  className="text-[#E8702A] hover:underline font-mono inline cursor-pointer"
                >
                  Privacy Policy
                </button>
                .
              </p>

              <div className="pt-2 flex items-center gap-2 font-mono">
                <button
                  onClick={() => handleAccept('all')}
                  className="flex-1 py-2 px-3 rounded-lg bg-[#E8702A] hover:bg-[#d65f1c] text-white text-[11px] font-bold tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md touch-manipulation"
                >
                  <Check size={13} />
                  <span>ACCEPT</span>
                </button>

                <button
                  onClick={() => handleAccept('essential')}
                  className="py-2 px-3 rounded-lg bg-white/10 hover:bg-white/15 text-zinc-300 hover:text-white text-[11px] tracking-wider uppercase transition-colors border border-white/10 cursor-pointer touch-manipulation"
                >
                  ESSENTIAL ONLY
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
