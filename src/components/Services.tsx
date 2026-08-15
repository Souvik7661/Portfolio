import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Server, Cloud, Activity, ArrowUpRight, Award } from 'lucide-react';

export const Services: React.FC = () => {
  const servicesList = [
    {
      icon: Layout,
      title: 'FRONTEND DEVELOPMENT',
      description: 'Create responsive, fast, and modern user interfaces using React, Tailwind CSS, and Framer Motion.',
    },
    {
      icon: Server,
      title: 'BACKEND & API DESIGN',
      description: 'Design and develop secure REST APIs and database integration using Node.js, Express, Spring Boot, and PostgreSQL.',
    },
    {
      icon: Cloud,
      title: 'DEPLOYMENT & HOSTING',
      description: 'Deploy web applications on cloud platforms with custom domain setup and production-ready server configurations.',
    },
    {
      icon: Activity,
      title: 'REAL-TIME SOLUTIONS',
      description: 'Develop real-time features like live chat, live tracking, and notifications using WebSockets and MQTT.',
    },
  ];

  return (
    <section id="services" className="py-24 sm:py-32 bg-[#070707] text-white relative border-t border-white/10 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#E8702A] block mb-3">
            EXPERTISE &amp; RESULTS
          </span>
          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight uppercase font-sans text-white">
            MY SERVICES<span className="text-[#E8702A]">.</span>
          </h2>
        </div>

        {/* Main Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left 4 Service Cards Grid (8 cols) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {servicesList.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -4 }}
                  className="p-7 rounded-2xl bg-[#0d0d0d] border border-white/10 hover:border-[#E8702A]/60 transition-all duration-300 flex flex-col justify-between group shadow-lg"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-[#E8702A]/10 group-hover:border-[#E8702A]/40 transition-colors">
                      <Icon className="w-6 h-6 text-[#E8702A]" />
                    </div>
                    <h3 className="text-sm font-mono tracking-wider font-bold uppercase text-white mb-3">
                      {service.title}
                    </h3>
                    <p className="text-xs text-white/60 leading-relaxed font-light">
                      {service.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-white/50 group-hover:text-[#E8702A] transition-colors">
                    <span>VIEW DETAILS</span>
                    <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Internship Case Study Card (4 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 p-8 rounded-2xl bg-gradient-to-b from-[#14151a] to-[#0a0b0e] border border-white/15 flex flex-col justify-between relative overflow-hidden group shadow-2xl"
          >
            {/* Background Glow */}
            <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-[#E8702A]/10 blur-3xl group-hover:bg-[#E8702A]/20 transition-all" />

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8702A]/10 border border-[#E8702A]/30 text-[10px] font-mono uppercase text-[#E8702A] mb-6">
                <Award className="w-3.5 h-3.5" />
                <span>INTERNSHIP HIGHLIGHT</span>
              </div>

              <h3 className="text-xl font-bold tracking-tight text-white mb-4">
                Agragami Technologies
              </h3>

              <p className="text-xs text-white/70 leading-relaxed font-light mb-6">
                Completed a 6-month internship at Agragami Technologies, delivering on-time key features and collaborating on real-time location tracker projects.
              </p>
            </div>

            {/* Case Study Image Banner */}
            <div className="relative rounded-xl overflow-hidden border border-white/10 mb-6 bg-black/60 aspect-video flex items-center justify-center">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:16px_16px]" />
              <div className="relative z-10 text-center px-4">
                <span className="text-[10px] font-mono text-cyan-400 block tracking-widest uppercase">LOCATION TRACKER</span>
                <span className="text-xs font-mono text-white/90 font-bold uppercase">AGRAGAMI REAL-TIME APP</span>
              </div>
            </div>

            <a
              href="#contact"
              className="w-full py-3.5 px-4 rounded-xl bg-white/10 hover:bg-[#E8702A] text-white text-xs font-mono font-bold tracking-wider uppercase text-center transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer group-hover:shadow-[0_0_20px_rgba(232,112,42,0.3)]"
            >
              <span>VIEW CASE STORY</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
