'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';
import { education } from '@/data/portfolio';
import SectionHeader from './SectionHeader';
import { staggerContainer, staggerItem } from '@/lib/animations';

export default function Education() {
  return (
    <section id="education" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader eyebrow="05 — EDUCATION" title="Where I've Studied" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid md:grid-cols-2 gap-6"
        >
          {education.map((edu) => (
            <motion.div
              key={edu.school}
              variants={staggerItem}
              className="rounded-xl border border-bg-tertiary bg-bg-secondary p-6 transition-all duration-300 hover:border-accent/30 hover:shadow-glow"
            >
              <div className="flex items-center gap-3 mb-2">
                <GraduationCap size={22} className="text-accent shrink-0" />
                <h3 className="font-display text-lg font-bold text-text-primary">{edu.school}</h3>
              </div>
              <p className="text-sm text-text-primary mb-2">{edu.degree}</p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-text-secondary mb-3">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar size={12} className="text-accent" />
                  {edu.date}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin size={12} className="text-accent" />
                  {edu.location}
                </span>
              </div>
              <p className="text-sm text-text-secondary">{edu.detail}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
