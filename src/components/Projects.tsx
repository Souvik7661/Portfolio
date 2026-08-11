import React from 'react';
import { Github, ExternalLink } from 'lucide-react';
import { ProjectCard } from './ProjectCard';
import { projects } from '../data/projects';

export const Projects: React.FC = () => (
  <section
    id="projects"
    className="py-28 sm:py-36 bg-[#F7F7F5] text-[#171717]"
    aria-labelledby="projects-heading"
  >
    <div className="max-w-6xl mx-auto px-6 sm:px-8">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mb-14">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#738273] block mb-4">
            04 — Selected Work
          </span>
          <h2
            id="projects-heading"
            className="font-playfair italic font-normal text-[#1C2E1E]"
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)', letterSpacing: '-0.03em' }}
          >
            Things I've built.
          </h2>
        </div>

        <a
          href="https://github.com/SouvikDey-2004"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#1C2E1E] hover:text-[#E8702A] transition-colors border-b border-[#1C2E1E]/40 hover:border-[#E8702A] pb-0.5 self-start sm:self-auto"
        >
          <Github className="w-4 h-4" />
          All on GitHub
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </div>
  </section>
);
