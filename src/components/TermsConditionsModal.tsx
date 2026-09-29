import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Scale, FileCode, CheckCircle, AlertTriangle } from 'lucide-react';

interface TermsConditionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsConditionsModal: React.FC<TermsConditionsModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-3xl max-h-[85vh] bg-[#0c0d10] border border-white/15 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-white"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-[#09090c]">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#E8702A]/15 text-[#E8702A] border border-[#E8702A]/30">
                  <Scale size={20} />
                </div>
                <div>
                  <h2 className="text-base font-bold font-mono tracking-wider uppercase text-white">
                    TERMS &amp; CONDITIONS
                  </h2>
                  <p className="text-xs font-mono text-zinc-400">
                    Last updated: September 2026 &bull; Professional Portfolio Standard
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close Terms and Conditions Modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-sm text-zinc-300 font-sans leading-relaxed">
              <section className="space-y-2">
                <div className="flex items-center gap-2 text-white font-mono text-xs uppercase font-bold tracking-wider text-[#E8702A]">
                  <CheckCircle size={14} /> 1. Acceptance of Terms
                </div>
                <p>
                  By accessing and browsing this portfolio website (<a href="https://souvikkundu.com" className="text-[#E8702A] hover:underline">souvikkundu.com</a>), you agree to be bound by these Terms and Conditions and applicable laws and regulations. If you do not agree with any part of these terms, you are advised to refrain from accessing the site.
                </p>
              </section>

              <section className="space-y-2">
                <div className="flex items-center gap-2 text-white font-mono text-xs uppercase font-bold tracking-wider text-[#E8702A]">
                  <FileCode size={14} /> 2. Intellectual Property &amp; Code Usage
                </div>
                <p>
                  All custom interface designs, brand marks, photography, videos, animations, and proprietary content displayed on this website are the intellectual property of <strong>Souvik Kundu</strong> unless otherwise indicated.
                </p>
                <p>
                  Open-source projects, demonstrations, and software repositories featured herein are licensed under their respective open-source licenses (typically MIT or Apache 2.0) on GitHub (<a href="https://github.com/Souvik7661" target="_blank" rel="noopener noreferrer" className="text-[#E8702A] hover:underline">github.com/Souvik7661</a>).
                </p>
              </section>

              <section className="space-y-2">
                <div className="flex items-center gap-2 text-white font-mono text-xs uppercase font-bold tracking-wider text-[#E8702A]">
                  <Scale size={14} /> 3. Permitted Use &amp; Conduct
                </div>
                <p>
                  You are permitted to view, bookmark, and review code samples for evaluation, hiring, contract discussions, and educational purposes. You agree not to attempt to breach security, overwhelm infrastructure with automated scrapers or flood attacks, or misrepresent Souvik Kundu's original engineering work as your own.
                </p>
              </section>

              <section className="space-y-2">
                <div className="flex items-center gap-2 text-white font-mono text-xs uppercase font-bold tracking-wider text-[#E8702A]">
                  <AlertTriangle size={14} /> 4. Disclaimer of Warranty
                </div>
                <p>
                  This portfolio and all showcased materials are provided on an "as is" and "as available" basis without warranties of any kind. While every effort is made to maintain accurate project descriptions and uptime, Souvik Kundu shall not be liable for any damages resulting from site downtime or technical inaccuracies.
                </p>
              </section>

              <section className="space-y-2">
                <div className="flex items-center gap-2 text-white font-mono text-xs uppercase font-bold tracking-wider text-[#E8702A]">
                  <Scale size={14} /> 5. Modifications &amp; Governing Law
                </div>
                <p>
                  These terms may be updated periodically to reflect architectural or legal modifications. The laws of India shall govern any dispute arising from the use of this website.
                </p>
              </section>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-white/10 bg-[#09090c] flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-400">
                &copy; {new Date().getFullYear()} SOUVIK KUNDU ARCHITECTURE
              </span>
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-full bg-[#E8702A] hover:bg-[#d65f1c] text-white font-mono text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer"
              >
                ACCEPT &amp; CLOSE
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
