import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, Lock, Eye, FileText } from 'lucide-react';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ isOpen, onClose }) => {
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
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h2 className="text-base font-bold font-mono tracking-wider uppercase text-white">
                    PRIVACY POLICY
                  </h2>
                  <p className="text-xs font-mono text-zinc-400">
                    Last updated: September 2026 &bull; Transparent &amp; Privacy-First
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close Privacy Policy Modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-sm text-zinc-300 font-sans leading-relaxed">
              <section className="space-y-2">
                <div className="flex items-center gap-2 text-white font-mono text-xs uppercase font-bold tracking-wider text-[#E8702A]">
                  <Lock size={14} /> 1. Commitment to Privacy
                </div>
                <p>
                  Welcome to the portfolio of <strong>Souvik Kundu</strong> (<a href="https://souvikkundu.com" className="text-[#E8702A] hover:underline">souvikkundu.com</a>). I believe that personal privacy is a fundamental right. This portfolio is engineered to minimize data footprint: there are no third-party behavioral trackers, advertising networks, or personal data sales.
                </p>
              </section>

              <section className="space-y-2">
                <div className="flex items-center gap-2 text-white font-mono text-xs uppercase font-bold tracking-wider text-[#E8702A]">
                  <Eye size={14} /> 2. Information Collected
                </div>
                <p>
                  <strong>Direct Correspondence:</strong> When you voluntarily submit a message through the contact form, we collect the details you provide (your name, email address, subject, and message content). This information is exclusively utilized to respond to your inquiry and evaluate project collaboration.
                </p>
                <p>
                  <strong>Technical Telemetry:</strong> Standard, non-identifying server logs (such as request timestamps and HTTP status codes) may be collected for security, DDoS prevention, and routing diagnostics.
                </p>
              </section>

              <section className="space-y-2">
                <div className="flex items-center gap-2 text-white font-mono text-xs uppercase font-bold tracking-wider text-[#E8702A]">
                  <FileText size={14} /> 3. Cookies &amp; Local Storage
                </div>
                <p>
                  This site does <strong>not</strong> deploy third-party advertising cookies. Standard browser <code className="px-1.5 py-0.5 rounded bg-white/10 text-white font-mono text-xs">localStorage</code> may be utilized exclusively to remember your preferences (such as cookie consent choice or audio preference) so you don't receive repetitive dialogs.
                </p>
              </section>

              <section className="space-y-2">
                <div className="flex items-center gap-2 text-white font-mono text-xs uppercase font-bold tracking-wider text-[#E8702A]">
                  <ShieldCheck size={14} /> 4. GDPR &amp; CCPA Rights
                </div>
                <p>
                  Under relevant global data protection regulations (including the EU GDPR and California CCPA), you maintain the right to:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-zinc-400">
                  <li>Request access to any personal data submitted via the contact form.</li>
                  <li>Request immediate rectification or permanent deletion of your contact records.</li>
                  <li>Withdraw consent at any point without prejudice.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <div className="flex items-center gap-2 text-white font-mono text-xs uppercase font-bold tracking-wider text-[#E8702A]">
                  <Lock size={14} /> 5. Contact Information
                </div>
                <p>
                  For any privacy inquiries, data deletion requests, or questions regarding this policy, please initiate contact via the transmission terminal at <a href="#contact" onClick={onClose} className="text-[#E8702A] hover:underline">#contact</a> or reach out through verified LinkedIn / GitHub channels.
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
                ACKNOWLEDGE &amp; CLOSE
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
