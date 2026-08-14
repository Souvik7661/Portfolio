import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle, Phone, Github } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { Button } from './ui/Button';

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

  // Keep subject synced when user changes selected service pills
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
        // Simulation mode for local dev before keys are added to .env
        console.warn(
          'EmailJS environment variables (VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY) are not set. Simulating message dispatch.'
        );
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', subject: initialSubject, message: '' });
    } catch (err: any) {
      console.error('EmailJS submit error:', err);
      setErrorMessage(
        err?.text ||
          err?.message ||
          'Failed to send message. Please verify your EmailJS credentials or try again later.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-8 sm:p-10 rounded-3xl bg-white border border-[#EAECE9] shadow-xl max-w-2xl mt-10"
    >
      {/* Contact Quick Details Bar */}
      <div className="mb-6 p-4 rounded-2xl bg-[#FAFBF9] border border-[#EAECE9] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono text-[#1C2E1E]">
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-[#E8702A]" />
          <span>Phone: <a href="tel:9841906881" className="font-bold hover:text-[#E8702A] transition-colors">+91 9841906881</a></span>
        </div>
        <div className="flex items-center gap-2">
          <Github className="w-4 h-4 text-[#E8702A]" />
          <span>GitHub: <a href="https://github.com/Souvik7661" target="_blank" rel="noopener noreferrer" className="font-bold hover:text-[#E8702A] transition-colors">github.com/Souvik7661</a></span>
        </div>
      </div>

      {!isConfigured && (
        <div className="mb-5 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-900 text-xs font-mono leading-relaxed">
          💡 <strong>Developer Note:</strong> EmailJS setup is ready! Add your <code className="bg-amber-100 px-1 py-0.5 rounded">VITE_EMAILJS_SERVICE_ID</code>, <code className="bg-amber-100 px-1 py-0.5 rounded">VITE_EMAILJS_TEMPLATE_ID</code>, and <code className="bg-amber-100 px-1 py-0.5 rounded">VITE_EMAILJS_PUBLIC_KEY</code> to your <code className="bg-amber-100 px-1 py-0.5 rounded">.env</code> file to enable live email delivery.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-[#1C2E1E] mb-2">
              Your Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Souvik's Guest"
              className="w-full px-4 py-3 rounded-xl bg-[#FAFBF9] border border-[#EAECE9] text-[#1C2E1E] placeholder-neutral-400 focus:outline-none focus:border-[#1C2E1E] focus:ring-1 focus:ring-[#1C2E1E] text-base sm:text-sm transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-[#1C2E1E] mb-2">
              Your Email *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl bg-[#FAFBF9] border border-[#EAECE9] text-[#1C2E1E] placeholder-neutral-400 focus:outline-none focus:border-[#1C2E1E] focus:ring-1 focus:ring-[#1C2E1E] text-base sm:text-sm transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-[#1C2E1E] mb-2">
            Subject
          </label>
          <input
            type="text"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            placeholder="Project / Internship / Discussion"
            className="w-full px-4 py-3 rounded-xl bg-[#FAFBF9] border border-[#EAECE9] text-[#1C2E1E] placeholder-neutral-400 focus:outline-none focus:border-[#1C2E1E] focus:ring-1 focus:ring-[#1C2E1E] text-base sm:text-sm transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-[#1C2E1E] mb-2">
            Message *
          </label>
          <textarea
            rows={4}
            required
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Write your message here..."
            className="w-full px-4 py-3 rounded-xl bg-[#FAFBF9] border border-[#EAECE9] text-[#1C2E1E] placeholder-neutral-400 focus:outline-none focus:border-[#1C2E1E] focus:ring-1 focus:ring-[#1C2E1E] text-base sm:text-sm transition-colors resize-none"
          />
        </div>

        <Button
          type="submit"
          variant="secondary"
          size="lg"
          className="w-full py-3.5"
          disabled={submitting}
          icon={<Send className="w-4 h-4" />}
        >
          {submitting ? 'Sending Message...' : 'Send Message →'}
        </Button>

        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-950 text-sm flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Thank you! Your message has been sent successfully.</span>
            </div>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="text-xs font-mono underline hover:text-emerald-700 transition-colors shrink-0"
            >
              Send another
            </button>
          </motion.div>
        )}

        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-950 text-sm flex items-center gap-2"
          >
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
            <span>{errorMessage}</span>
          </motion.div>
        )}
      </form>
    </motion.div>
  );
};

