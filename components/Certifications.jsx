'use client';

import { motion } from 'framer-motion';
import { BadgeCheck, ExternalLink } from 'lucide-react';
import { certifications } from '@/data/portfolio';
import SectionHeader from './SectionHeader';
import { staggerContainer, staggerItem } from '@/lib/animations';

export default function Certifications() {
  return (
    <section id="certifications" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader eyebrow="06 — CERTIFICATIONS" title="Credentials" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid sm:grid-cols-2 gap-6"
        >
          {certifications.map((cert) => (
            <motion.a
              key={cert.name}
              variants={staggerItem}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-4 rounded-xl border border-bg-tertiary bg-bg-secondary p-5 transition-all duration-300 hover:border-accent/30 hover:shadow-glow"
            >
              <BadgeCheck size={22} className="text-accent shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <h3 className="text-text-primary font-semibold">{cert.name}</h3>
                <p className="font-mono text-xs text-text-secondary mt-1">
                  {cert.issuer} · {cert.date}
                </p>
              </div>
              <ExternalLink
                size={15}
                className="text-text-secondary group-hover:text-accent transition-colors shrink-0 mt-1"
              />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
