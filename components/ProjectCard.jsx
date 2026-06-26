'use client';

import { Github, ExternalLink, Folder } from 'lucide-react';
import useTilt from '@/lib/useTilt';
import TechTag from './TechTag';

export default function ProjectCard({ project }) {
  const tilt = useTilt(10);

  return (
    <div className="h-full" style={{ perspective: 800 }}>
      <div
        ref={tilt.ref}
        onMouseMove={tilt.onMouseMove}
        onMouseLeave={tilt.onMouseLeave}
        className="h-full flex flex-col rounded-xl border border-bg-tertiary bg-bg-secondary/70 backdrop-blur p-6 transition-colors duration-300 hover:border-accent/30 hover:shadow-glow"
      >
        <div className="flex items-start justify-between mb-4">
          <Folder size={28} className="text-accent" />
          {project.comingSoon && (
            <span className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-warning/10 text-warning border border-warning/30">
              Coming Soon
            </span>
          )}
        </div>

        <h3 className="font-display text-xl font-bold text-text-primary mb-2">{project.name}</h3>
        <p className="text-sm text-text-secondary leading-relaxed flex-1">{project.description}</p>

        <div className="flex flex-wrap gap-2 mt-4">
          {project.tech.map((t) => (
            <TechTag key={t}>{t}</TechTag>
          ))}
        </div>

        <div className="flex items-center gap-3 mt-5 pt-4 border-t border-bg-tertiary">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-accent transition-colors"
          >
            <Github size={15} />
            View Code
          </a>
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-accent transition-colors"
          >
            <ExternalLink size={15} />
            Live Demo
          </a>
        </div>
      </div>
    </div>
  );
}
