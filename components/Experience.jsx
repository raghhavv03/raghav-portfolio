'use client';

import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { experience } from '@/data/portfolio';
import SectionHeader from './SectionHeader';
import { slideInLeft, slideInRight } from '@/lib/animations';

export default function Experience() {
  return (
    <section id="experience" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader eyebrow="04 — EXPERIENCE" title="Where I've Worked" />

        <div className="relative">
          {/* Center line (left-aligned on mobile) */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-bg-tertiary md:-translate-x-px" />

          <div className="space-y-12">
            {experience.map((job, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={job.company}
                  className={`relative md:flex ${isLeft ? 'md:justify-start' : 'md:justify-end'}`}
                >
                  {/* Dot marker */}
                  <span className="absolute left-4 md:left-1/2 top-6 w-3 h-3 -translate-x-1/2 rounded-full bg-accent ring-4 ring-bg-primary z-10" />

                  <motion.div
                    {...(isLeft ? slideInLeft : slideInRight)}
                    className={`ml-10 md:ml-0 md:w-[calc(50%-2.5rem)] ${
                      isLeft ? 'md:mr-auto' : 'md:ml-auto'
                    }`}
                  >
                    <div className="rounded-xl border border-bg-tertiary bg-bg-secondary p-6 transition-all duration-300 hover:border-accent/30 hover:shadow-glow">
                      <div className="flex items-center gap-2 mb-1">
                        <Briefcase size={16} className="text-accent shrink-0" />
                        <h3 className="font-display text-lg font-bold text-text-primary">
                          {job.company}
                        </h3>
                      </div>
                      <p className="text-sm text-text-secondary mb-3">{job.role}</p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-text-secondary mb-4">
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar size={12} className="text-accent" />
                          {job.date}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin size={12} className="text-accent" />
                          {job.location}
                        </span>
                      </div>
                      <ul className="space-y-2">
                        {job.bullets.map((bullet, j) => (
                          <li key={j} className="flex gap-2 text-sm text-text-secondary">
                            <span className="text-accent shrink-0">▹</span>
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
