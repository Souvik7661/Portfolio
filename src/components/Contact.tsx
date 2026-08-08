import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { useTypewriter } from '../hooks/useTypewriter';
import { ContactForm } from './ContactForm';

export const Contact: React.FC = () => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [showForm, setShowForm] = useState(false);

  const { displayed, done } = useTypewriter("we'd love to\nhear from you!", 38, 600);

  const options = [
    'Internship',
    'Project Collaboration',
    'Freelance',
    'AI / Development',
    'Open Source',
    'Other',
  ];

  const toggleService = (option: string) => {
    if (selectedServices.includes(option)) {
      setSelectedServices(selectedServices.filter((item) => item !== option));
    } else {
      setSelectedServices([...selectedServices, option]);
    }
  };

  return (
    <section id="contact" className="py-28 sm:py-36 bg-[#FAFBF9] text-[#171717] relative border-t border-[#EAECE9]">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        
        {/* Section Label */}
        <span className="text-xs font-mono uppercase tracking-widest text-[#738273] block mb-6">
          07 — GET IN TOUCH
        </span>

        {/* Typewriter Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-5xl sm:text-7xl lg:text-8xl font-playfair italic font-normal text-[#1C2E1E] leading-[1.05] whitespace-pre-line tracking-tight">
            {displayed}
            {!done && <span className="animate-blink font-sans font-light not-italic text-[#E8702A]">|</span>}
          </h2>
        </motion.div>

        {/* Secondary Description Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-14"
        >
          <p className="text-lg md:text-xl text-[#5A635A] leading-relaxed font-normal max-w-2xl">
            Whether you have a project idea, collaboration opportunity, internship opportunity, freelance work, or simply want to connect, drop me a message and I'll get back to you as soon as possible.
          </p>
        </motion.div>

        {/* Interactive Multi-Select Service Section */}
        <div className="space-y-6 max-w-3xl">
          <div>
            <h3 className="text-2xl font-medium tracking-tight text-[#1C2E1E] mb-1">
              What sort of service?
            </h3>
            <p className="opacity-85 text-[#738273] text-sm mb-6">
              Select all that apply
            </p>
          </div>

          {/* Multi-select Pills */}
          <div className="flex flex-wrap gap-3">
            {options.map((option) => {
              const isSelected = selectedServices.includes(option);

              return (
                <motion.button
                  key={option}
                  onClick={() => toggleService(option)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  className={`px-5 py-3 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                    isSelected
                      ? 'bg-[#1C2E1E] text-white shadow-md shadow-emerald-950/5'
                      : 'bg-white text-[#1C2E1E] border border-[#F1F3F1] hover:bg-[#F1F3F1]/55'
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                      <Check className="w-4 h-4 text-emerald-400" />
                    </motion.span>
                  )}
                  <span>{option}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Contingent Feedback Status Banner */}
          <div className="pt-4">
            {selectedServices.length === 0 ? (
              <p className="opacity-50 italic text-xs text-[#5A635A]">
                Please click to select services above.
              </p>
            ) : (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className="p-5 rounded-2xl bg-[#FAFBF9] border border-[#EAECE9] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm"
                >
                  <div>
                    <span className="text-xs font-mono text-[#738273] uppercase tracking-wider block">
                      Selected Inquiry Focus:
                    </span>
                    <p className="text-sm font-semibold text-[#1C2E1E] mt-0.5">
                      {selectedServices.join(', ')}
                    </p>
                  </div>

                  <button
                    onClick={() => setShowForm(true)}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1C2E1E] text-white hover:bg-[#2A442E] text-xs font-semibold uppercase tracking-wider transition-all shadow-md shrink-0 cursor-pointer"
                  >
                    <span>Let's Go</span>
                    <ArrowRight className="w-4 h-4 text-[#E8702A]" />
                  </button>
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>

        {/* Contact Form Reveal */}
        {(showForm || selectedServices.length > 0) && (
          <ContactForm initialSubject={selectedServices.join(', ')} />
        )}

      </div>
    </section>
  );
};
