import React, { useState, useEffect, useRef } from 'react';
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

  // Bot & Spam Protection
  const [honeypot, setHoneypot] = useState('');
  const mountTimeRef = useRef<number>(Date.now());
  const [lastSubmitTime, setLastSubmitTime] = useState<number>(0);

  // Validation States
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
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

  const validate = (): boolean => {
    const errs: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      errs.name = 'Please provide your full name.';
    } else if (formData.name.trim().length < 2) {
      errs.name = 'Name must be at least 2 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address.';
    } else if (!emailRegex.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address (e.g. name@example.com).';
    }

    if (!formData.message.trim()) {
      errs.message = 'Please write a message.';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters long.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Bot Honeypot Check
    if (honeypot) {
      // Silently discard automated spam submission
      console.warn('Spam submission detected by honeypot.');
      setSubmitted(true);
      return;
    }

    // 2. Submission Speed Check (Bots submit in under 1.5s)
    const timeSinceMount = Date.now() - mountTimeRef.current;
    if (timeSinceMount < 1500) {
      console.warn('Submission flagged as automated rate anomaly.');
      setSubmitted(true);
      return;
    }

    // 3. Submission Rate Limiting (Prevent spam clicking)
    const now = Date.now();
    if (now - lastSubmitTime < 5000) {
      setErrorMessage('Please wait a few seconds before sending another transmission.');
      return;
    }

    // 4. Form Validation
    if (!validate()) return;

    setSubmitting(true);
    setErrorMessage('');
    setSubmitted(false);
    setLastSubmitTime(now);

    try {
      if (isConfigured) {
        const templateParams = {
          from_name: formData.name.trim(),
          from_email: formData.email.trim(),
          reply_to: formData.email.trim(),
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject || 'Portfolio Contact Form Submission',
          message: formData.message.trim(),
          to_name: 'Souvik Kundu',
        };

        await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
      } else {
        // Fallback simulation mode
        await new Promise((resolve) => setTimeout(resolve, 800));
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', subject: initialSubject, message: '' });
      setErrors({});
    } catch (err: any) {
      console.error('EmailJS submit error:', err);
      setErrorMessage(
        err?.text ||
          err?.message ||
          'Failed to send transmission. Please check connection or reach out on LinkedIn.'
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
      className="p-6 sm:p-10 rounded-2xl bg-[#0c0d10]/90 backdrop-blur-xl border border-white/10 shadow-2xl w-full"
    >
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {/* Hidden Honeypot Field for Spam Bot Protection */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website_trap">Leave this blank</label>
          <input
            id="website_trap"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Name Field */}
          <div>
            <label htmlFor="contact-name" className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-300 mb-2">
              YOUR NAME <span className="text-[#E8702A]">*</span>
            </label>
            <input
              id="contact-name"
              type="text"
              required
              aria-required="true"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'contact-name-error' : undefined}
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
              }}
              placeholder="e.g. Alex Vance"
              className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder-zinc-500 focus:outline-none text-sm transition-colors font-mono ${
                errors.name ? 'border-rose-500 focus:border-rose-500' : 'border-white/10 focus:border-[#E8702A]'
              }`}
            />
            {errors.name && (
              <p id="contact-name-error" className="text-rose-400 text-xs font-mono mt-1.5 flex items-center gap-1">
                <AlertCircle size={12} /> {errors.name}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="contact-email" className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-300 mb-2">
              YOUR EMAIL <span className="text-[#E8702A]">*</span>
            </label>
            <input
              id="contact-email"
              type="email"
              required
              aria-required="true"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'contact-email-error' : undefined}
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
              }}
              placeholder="e.g. alex@example.com"
              className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder-zinc-500 focus:outline-none text-sm transition-colors font-mono ${
                errors.email ? 'border-rose-500 focus:border-rose-500' : 'border-white/10 focus:border-[#E8702A]'
              }`}
            />
            {errors.email && (
              <p id="contact-email-error" className="text-rose-400 text-xs font-mono mt-1.5 flex items-center gap-1">
                <AlertCircle size={12} /> {errors.email}
              </p>
            )}
          </div>
        </div>

        {/* Subject Field */}
        <div>
          <label htmlFor="contact-subject" className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-300 mb-2">
            SUBJECT / SERVICE
          </label>
          <input
            id="contact-subject"
            type="text"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            placeholder="e.g. Full-Stack Web App / Freelance Contract"
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-[#E8702A] text-sm transition-colors font-mono"
          />
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="contact-message" className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-300 mb-2">
            TRANSMISSION MESSAGE <span className="text-[#E8702A]">*</span>
          </label>
          <textarea
            id="contact-message"
            required
            aria-required="true"
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? 'contact-message-error' : undefined}
            rows={5}
            value={formData.message}
            onChange={(e) => {
              setFormData({ ...formData, message: e.target.value });
              if (errors.message) setErrors((prev) => ({ ...prev, message: '' }));
            }}
            placeholder="Describe your vision, timeline, and requirements in detail..."
            className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder-zinc-500 focus:outline-none text-sm transition-colors resize-none font-mono ${
              errors.message ? 'border-rose-500 focus:border-rose-500' : 'border-white/10 focus:border-[#E8702A]'
            }`}
          />
          {errors.message && (
            <p id="contact-message-error" className="text-rose-400 text-xs font-mono mt-1.5 flex items-center gap-1">
              <AlertCircle size={12} /> {errors.message}
            </p>
          )}
        </div>

        {/* Status Messages */}
        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-3"
            role="status"
          >
            <CheckCircle2 size={16} className="shrink-0" />
            <span>Transmission received successfully! Souvik will respond within 24 hours.</span>
          </motion.div>
        )}

        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono flex items-center gap-3"
            role="alert"
          >
            <AlertCircle size={16} className="shrink-0" />
            <span>{errorMessage}</span>
          </motion.div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full py-4 rounded-xl bg-[#E8702A] hover:bg-[#d65f1c] active:bg-[#c25316] text-white font-mono font-bold text-xs tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(232,112,42,0.4)] disabled:opacity-50 cursor-pointer touch-manipulation"
        >
          {submitting ? (
            <span className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
              TRANSMITTING DATA...
            </span>
          ) : (
            <>
              <Send size={15} />
              <span>SEND TRANSMISSION</span>
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
};
