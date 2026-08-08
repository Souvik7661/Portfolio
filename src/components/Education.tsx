import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Calendar, Award } from 'lucide-react';
import { educationInfo } from '../data/education';

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-28 sm:py-36 bg-[#FAFBF9] text-[#171717] relative">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="space-y-4 mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-[#738273]">
            05 — ACADEMICS
          </span>
          <h2 className="text-4xl sm:text-5xl font-playfair italic font-normal text-[#1C2E1E]">
            The journey so far.
          </h2>
          <p className="text-neutral-600 text-base max-w-xl">
            Higher education and foundational computer science studies.
          </p>
        </div>

        {/* Education Timeline Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="p-8 sm:p-10 rounded-2xl bg-white border border-[#EAECE9] shadow-sm max-w-4xl space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-[#EAECE9] pb-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C2E1E]/5 text-[#1C2E1E] text-xs font-mono font-medium">
                <GraduationCap className="w-4 h-4 text-[#4D6D47]" />
                <span>UNDERGRADUATE DEGREE</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#1C2E1E]">
                {educationInfo.degree}
              </h3>
              <p className="text-base font-medium text-neutral-700">
                {educationInfo.field}
              </p>
              <p className="text-sm font-semibold text-[#4D6D47]">
                {educationInfo.university}
              </p>
            </div>

            <div className="flex flex-col sm:items-end gap-2 text-xs font-mono text-neutral-500">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F1F1EE] text-black">
                <Calendar className="w-3.5 h-3.5" />
                Exp. Graduation {educationInfo.graduationYear}
              </span>
              <span className="flex items-center gap-1.5 text-neutral-600">
                <MapPin className="w-3.5 h-3.5" />
                {educationInfo.location}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-[#F7F7F5] border border-[#EAECE9] flex items-center gap-3">
              <Award className="w-5 h-5 text-[#4D6D47] shrink-0" />
              <div>
                <p className="text-xs text-neutral-500 font-mono">CURRENT CGPA</p>
                <p className="text-lg font-bold font-mono text-[#1C2E1E]">{educationInfo.cgpa} / 10.0</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#F7F7F5] border border-[#EAECE9] flex items-center gap-3">
              <GraduationCap className="w-5 h-5 text-[#4D6D47] shrink-0" />
              <div>
                <p className="text-xs text-neutral-500 font-mono">STATUS</p>
                <p className="text-sm font-semibold text-[#1C2E1E]">Active Full-Time Student</p>
              </div>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
};
