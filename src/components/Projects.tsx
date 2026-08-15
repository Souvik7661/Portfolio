import React from 'react';
import { Github, ExternalLink } from 'lucide-react';
import { ProjectCard } from './ProjectCard';
import { projects } from '../data/projects';

export const Projects: React.FC = () => (
  <section
    id="projects"
    className="py-24 sm:py-32 bg-[#070707] text-white border-t border-white/10 relative overflow-hidden"
    aria-labelledby="projects-heading"
  >
    <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mb-16">
        <div>
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#E8702A] block mb-3">
            PROJECT SHOWCASE
          </span>
          <h2
            id="projects-heading"
            className="text-4xl sm:text-6xl font-extrabold tracking-tight uppercase font-sans text-white"
          >
            SELECTED WORKS<span className="text-[#E8702A]">.</span>
          </h2>
        </div>

        <a
          href="https://github.com/Souvik7661"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-white hover:text-[#E8702A] transition-colors border-b border-white/30 hover:border-[#E8702A] pb-1 self-start sm:self-auto"
        >
          <Github className="w-4 h-4 text-[#E8702A]" />
          <span>VIEW ALL ON GITHUB</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Grid: 3 columns on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </div>
  </section>
);
