import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, ArrowUpRight, Lock } from 'lucide-react';
import { Project } from '../data/projects';

interface Props { project: Project; index: number }

export const ProjectCard: React.FC<Props> = ({ project, index }) => {
  const num = String(index + 1).padStart(2, '0');

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.65, delay: (index % 2) * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col rounded-2xl bg-[#111111] border border-[#1E1E1E] hover:border-[#2E2E2E] transition-all duration-500 overflow-hidden"
    >
      {/* ── Image ── */}
      <div className="relative overflow-hidden bg-[#0D0D0D]" style={{ height: 240 }}>
        <img
          src={project.image}
          alt={`${project.title} preview`}
          loading="lazy"
          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/20 to-transparent" />

        {/* Number badge */}
        <span className="absolute top-4 left-4 text-xs font-mono font-bold text-[#E8702A] px-2.5 py-1 rounded-full bg-black/60 backdrop-blur border border-white/10">
          {num}
        </span>

        {/* Upcoming badge */}
        {project.upcoming && (
          <span className="absolute top-4 right-4 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-300 bg-emerald-950/80 backdrop-blur border border-emerald-800/60 px-3 py-1 rounded-full">
            <Lock className="w-3 h-3" />
            Upcoming
          </span>
        )}
      </div>

      {/* ── Body ── */}
      <div className="flex flex-col flex-1 p-6 sm:p-7 gap-4">
        <div>
          <p className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 mb-2">
            {project.category}
          </p>
          <h3 className="text-xl font-bold text-white leading-tight flex items-start justify-between gap-2">
            <span className="group-hover:text-[#E8702A] transition-colors duration-300">
              {project.title}
            </span>
            <ArrowUpRight className="w-5 h-5 text-neutral-600 group-hover:text-[#E8702A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0 mt-0.5" />
          </h3>
          <p className="mt-3 text-sm text-neutral-400 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
          {project.technologies.map(t => (
            <span
              key={t}
              className="px-2.5 py-1 text-[11px] font-mono rounded-md bg-[#0D0D0D] text-neutral-500 border border-[#1E1E1E]"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* ── Footer ── */}
      {(project.github || project.live) && (
        <div className="px-6 sm:px-7 pb-6 flex items-center gap-4 border-t border-[#1A1A1A] pt-4">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`GitHub — ${project.title}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/90 hover:text-[#E8702A] transition-colors"
            >
              <Github className="w-4 h-4 text-[#E8702A]" />
              GitHub Repo
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Live demo — ${project.title}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#E8702A] hover:underline ml-auto"
            >
              Live Demo
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      )}
    </motion.article>
  );
};
