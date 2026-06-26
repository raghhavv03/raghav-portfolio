'use client';

import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';

export default function SectionHeader({ eyebrow, title, subtitle }) {
  return (
    <motion.div {...fadeInUp} className="mb-12">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-text-secondary mb-3">
        <span className="text-accent">{'// '}</span>
        {eyebrow}
      </p>
      <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary">{title}</h2>
      {subtitle && <p className="mt-3 text-text-secondary max-w-2xl">{subtitle}</p>}
    </motion.div>
  );
}
