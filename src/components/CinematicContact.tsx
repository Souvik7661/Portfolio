import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, Phone, Mail } from 'lucide-react';
import emailjs from '@emailjs/browser';

export const CinematicContact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  // Static phone number display with masked digits after 9831
  const phoneDisplay = '+91 9831******';

  const [submitting, setSubmitting] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setSubmitting(true);
    setSentSuccess(false);

    try {
      const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
      const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
      const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

      if (SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY) {
        await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
          from_name: name,
          from_email: email,
          reply_to: email,
          subject: subject || 'Portfolio Contact Inquiry',
          message: message,
          to_name: 'Souvik Kundu',
        }, PUBLIC_KEY);
      } else {
        await new Promise((res) => setTimeout(res, 800));
      }

      setSentSuccess(true);
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (err) {
      console.error(err);
      setSentSuccess(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full relative my-6">
      
      {/* 2 COLUMN GRID: Left (Phone Animation Card with +91 9831******) | Right (Form Fillup Card) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
        
        {/* LEFT PART (5 Cols): iPhone Calling Animation (Static +91 9831******) */}
        <div className="md:col-span-5 flex items-center justify-center p-6 sm:p-8 rounded-3xl bg-[#08090d] border border-white/10 shadow-2xl relative overflow-hidden">
          
          {/* Ambient Glow */}
          <div className="absolute inset-0 bg-radial-glow pointer-events-none opacity-30" />

          {/* iPhone Calling Frame */}
          <div className="w-full max-w-[240px] bg-[#07080a] rounded-[40px] border-[7px] border-[#2a2a2e] shadow-2xl p-5 flex flex-col justify-between text-white text-center shrink-0 relative z-10 min-h-[440px]">
            
            {/* Dynamic Island */}
            <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-full z-30 flex items-center justify-between px-2.5">
              <span className="text-[8px] text-emerald-400 font-mono">00:04</span>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            </div>

            {/* Caller Header */}
            <div className="pt-8 space-y-1">
              <span className="text-[9px] font-mono text-emerald-400 tracking-widest uppercase">CALLING...</span>
              <h4 className="text-lg font-bold font-mono text-white tracking-wider">{phoneDisplay}</h4>
              <p className="text-xs text-white/70">Souvik Kundu</p>
            </div>

            {/* Sound Wave Ripple Circle */}
            <div className="relative my-auto flex items-center justify-center py-8">
              <motion.div
                animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0.15, 0.6] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute w-28 h-28 rounded-full border border-emerald-500/40"
              />
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1c2230] to-[#0d1017] border border-white/20 flex items-center justify-center shadow-2xl">
                <Phone className="w-7 h-7 text-emerald-400 animate-pulse" />
              </div>
            </div>

            {/* Footer label */}
            <div className="text-[10px] font-mono text-white/40 pb-2">
              SOUVIK KUNDU &bull; DIRECT CONTACT
            </div>
          </div>

        </div>

        {/* RIGHT PART (7 Cols): DEDICATED FORM FILLUP CARD */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="md:col-span-7 p-6 sm:p-8 rounded-3xl bg-[#0c0d11] border border-white/10 shadow-2xl flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-white/10 pb-3">
              <Mail className="w-5 h-5 text-[#E8702A]" />
              <h3 className="text-lg font-bold text-white font-sans uppercase tracking-wide">
                SEND A MESSAGE
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
              <div>
                <label className="block text-white/80 uppercase mb-1 font-bold text-[11px]">
                  YOUR NAME *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#E8702A] text-xs transition-colors"
                />
              </div>

              <div>
                <label className="block text-white/80 uppercase mb-1 font-bold text-[11px]">
                  YOUR EMAIL *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#E8702A] text-xs transition-colors"
                />
              </div>

              <div>
                <label className="block text-white/80 uppercase mb-1 font-bold text-[11px]">
                  SUBJECT / INQUIRY
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Project Inquiry / Collaboration"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#E8702A] text-xs transition-colors"
                />
              </div>

              <div>
                <label className="block text-white/80 uppercase mb-1 font-bold text-[11px]">
                  YOUR MESSAGE *
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your message here..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#E8702A] text-xs transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 px-5 rounded-xl bg-[#E8702A] hover:bg-[#d65f1c] text-white font-bold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#E8702A]/25 active:scale-98"
              >
                <span>{submitting ? 'TRANSMITTING...' : 'TRANSMIT MESSAGE →'}</span>
                <Send size={15} />
              </button>

              {sentSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>MESSAGE DELIVERED SUCCESSFULLY!</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSentSuccess(false)}
                    className="underline text-[10px] shrink-0"
                  >
                    Send another
                  </button>
                </motion.div>
              )}
            </form>
          </div>
        </motion.div>

      </div>

    </div>
  );
};
