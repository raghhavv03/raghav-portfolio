'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, projectFilters } from '@/data/portfolio';
import SectionHeader from './SectionHeader';
import ProjectCard from './ProjectCard';

export default function Projects() {
  const [filter, setFilter] = useState('all');
  const visible = projects.filter((p) => filter === 'all' || p.category === filter);

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          eyebrow="03 — PROJECTS"
          title="Things I've Built"
          subtitle="A selection of projects — from web apps to ML experiments."
        />

        {/* Filter bar */}
        <div className="flex flex-wrap gap-2 mb-10">
          {projectFilters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`font-mono text-sm px-4 py-1.5 rounded-full border transition-all duration-200 ${
                filter === f.value
                  ? 'bg-accent text-bg-primary border-accent font-semibold'
                  : 'bg-transparent text-text-secondary border-bg-tertiary hover:border-accent/40 hover:text-text-primary'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <motion.div
                key={project.name}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="h-full"
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
