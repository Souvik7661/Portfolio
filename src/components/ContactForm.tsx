import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

export interface ContactFormProps {
  initialSubject?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({ initialSubject = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: initialSubject,
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setFormData((prev) => ({ ...prev, subject: initialSubject }));
  }, [initialSubject]);

  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

  const isConfigured = Boolean(
    SERVICE_ID &&
      TEMPLATE_ID &&
      PUBLIC_KEY &&
      SERVICE_ID !== 'your_service_id' &&
      TEMPLATE_ID !== 'your_template_id' &&
      PUBLIC_KEY !== 'your_public_key'
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSubmitting(true);
    setErrorMessage('');
    setSubmitted(false);

    try {
      if (isConfigured) {
        const templateParams = {
          from_name: formData.name,
          from_email: formData.email,
          reply_to: formData.email,
          name: formData.name,
          email: formData.email,
          subject: formData.subject || 'Portfolio Contact Form Submission',
          message: formData.message,
          to_name: 'Souvik Kundu',
        };

        await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
      } else {
        console.warn('EmailJS simulation dispatch mode active.');
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', subject: initialSubject, message: '' });
    } catch (err: any) {
      console.error('EmailJS submit error:', err);
      setErrorMessage(
        err?.text ||
          err?.message ||
          'Failed to send message. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="p-8 sm:p-10 rounded-2xl bg-[#0c0d10]/90 backdrop-blur-xl border border-white/10 shadow-2xl w-full"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-white/80 mb-2">
              YOUR NAME *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="SOUVIK KUNDU"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#E8702A] text-sm transition-colors font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-white/80 mb-2">
              YOUR EMAIL *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="YOU@EXAMPLE.COM"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#E8702A] text-sm transition-colors font-mono"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono font-bold uppercase tracking-wider text-white/80 mb-2">
            SUBJECT / SERVICE
          </label>
          <input
            type="text"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            placeholder="PROJECT INQUIRY / COLLABORATION"
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#E8702A] text-sm transition-colors font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-mono font-bold uppercase tracking-wider text-white/80 mb-2">
            YOUR MESSAGE *
          </label>
          <textarea
            rows={4}
            required
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="WRITE YOUR TRANSMISSION HERE..."
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#E8702A] text-sm transition-colors resize-none font-mono"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-4 px-6 rounded-xl bg-[#E8702A] hover:bg-[#d65f1c] text-white font-mono text-xs font-bold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_25px_rgba(232,112,42,0.35)] active:scale-98"
        >
          <span>{submitting ? 'TRANSMITTING...' : 'TRANSMIT'}</span>
          <Send className="w-4 h-4" />
        </button>

        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>TRANSMISSION RECEIVED SUCCESSFULLY!</span>
            </div>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="text-xs font-mono underline hover:text-white transition-colors shrink-0"
            >
              SEND ANOTHER
            </button>
          </motion.div>
        )}

        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono flex items-center gap-2"
          >
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorMessage}</span>
          </motion.div>
        )}
      </form>
    </motion.div>
  );
};
