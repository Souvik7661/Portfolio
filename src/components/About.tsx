import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, GraduationCap, FolderGit2, Download } from 'lucide-react';

export const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'languages' | 'education' | 'projects'>('languages');

  const tabData = {
    languages: {
      title: 'LANGUAGES',
      icon: Code2,
      content: ['Hindi', 'English', 'Bengali'],
      sub: 'Multilingual Communication',
    },
    education: {
      title: 'EDUCATION',
      icon: GraduationCap,
      content: ['Sister Nivedita University', 'B.Tech CSE (2024–2028)', 'Shyamnagar, West Bengal'],
      sub: 'CGPA: 8.84 / 10',
    },
    projects: {
      title: 'PROJECTS',
      icon: FolderGit2,
      content: ['College ERP System (Spring Boot)', 'Currency Converter Web App', 'Rock Paper Scissors Game'],
      sub: '3 Featured Applications',
    },
  };

  return (
    <section id="about" className="py-24 sm:py-32 bg-[#070707] text-white relative overflow-hidden border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#E8702A] block mb-3">
            02 &bull; ABOUT ME
          </span>
          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight uppercase font-sans text-white">
            ABOUT ME<span className="text-[#E8702A]">.</span>
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Portrait Photo */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group max-w-sm w-full">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#E8702A]/40 to-cyan-500/30 blur-xl opacity-40 group-hover:opacity-80 transition duration-500" />
              <div className="relative rounded-2xl overflow-hidden border border-white/20 bg-[#0d0d0d]">
                <img
                  src="/images/profile.png"
                  alt="Souvik Kundu"
                  className="w-full h-[420px] object-cover object-center filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-white/80">
                  <span>SOUVIK KUNDU</span>
                  <span className="text-[#E8702A]">CSE &bull; 2028</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio & Interactive Cards */}
          <div className="lg:col-span-7 space-y-8">
            <p className="text-lg sm:text-xl text-white/80 font-light leading-relaxed">
              As a Computer Science student, my passion lies in crafting high-performance, scalable applications with precision and clean architecture.
            </p>

            {/* 3 Interactive Tab Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {(Object.keys(tabData) as Array<keyof typeof tabData>).map((key) => {
                const item = tabData[key];
                const Icon = item.icon;
                const isActive = activeTab === key;

                return (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`p-5 rounded-xl border text-left transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'bg-white/10 border-[#E8702A] shadow-[0_0_20px_rgba(232,112,42,0.25)] translate-y-[-2px]'
                        : 'bg-[#111] border-white/10 hover:border-white/30 text-white/70'
                    }`}
                  >
                    <Icon className={`w-6 h-6 mb-3 ${isActive ? 'text-[#E8702A]' : 'text-white/40'}`} />
                    <h3 className="text-xs font-mono tracking-widest font-bold uppercase text-white mb-1">
                      {item.title}
                    </h3>
                    <p className="text-[11px] font-mono text-white/50">{item.sub}</p>
                  </button>
                );
              })}
            </div>

            {/* Active Tab Detailed View */}
            <div className="p-6 rounded-xl bg-[#0e0e0e] border border-white/10 min-h-[100px] flex items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="w-full"
                >
                  <div className="flex flex-wrap gap-2.5">
                    {tabData[activeTab].content.map((val) => (
                      <span
                        key={val}
                        className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-white font-medium"
                      >
                        {val}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Code Your Stack & Download Resume Footer */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#E8702A] block mb-3">
                  CODE YOUR STACK
                </span>
                <div className="flex flex-wrap items-center gap-3 text-white/70">
                  {['React', 'TypeScript', 'Node.js', 'Java', 'Python', 'Tailwind', 'Git'].map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded bg-[#171717] border border-white/10 text-[11px] font-mono text-white/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Download Resume Button */}
              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-lg bg-[#E8702A] hover:bg-[#d65f1c] text-white text-xs font-bold font-mono tracking-wider uppercase shadow-lg shadow-[#E8702A]/20 transition-all hover:scale-105 shrink-0"
              >
                <Download className="w-4 h-4" />
                <span>DOWNLOAD RESUME</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
