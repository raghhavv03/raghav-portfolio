'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { stats } from '@/data/portfolio';
import useCountUp from '@/lib/useCountUp';

function StatItem({ stat, inView }) {
  const value = useCountUp(stat.value, inView);
  return (
    <div className="text-center px-6">
      <p className="font-display text-4xl md:text-5xl font-bold text-text-primary">
        {value}
        <span className="text-accent">{stat.suffix}</span>
      </p>
      <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-text-secondary">
        {stat.label}
      </p>
    </div>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="stats" className="py-20 bg-bg-secondary border-y border-bg-tertiary">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-y-10 md:divide-x md:divide-[var(--bg-tertiary)]"
      >
        {stats.map((stat) => (
          <StatItem key={stat.label} stat={stat} inView={inView} />
        ))}
      </motion.div>
    </section>
  );
}
