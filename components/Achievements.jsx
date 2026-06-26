'use client';

import { motion } from 'framer-motion';
import { Trophy, Award, Star } from 'lucide-react';
import { achievements } from '@/data/portfolio';
import SectionHeader from './SectionHeader';
import { staggerContainer, staggerItem } from '@/lib/animations';

const icons = { trophy: Trophy, award: Award, star: Star };

export default function Achievements() {
  return (
    <section id="achievements" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader eyebrow="07 — ACHIEVEMENTS" title="Highlights" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid md:grid-cols-3 gap-6"
        >
          {achievements.map((item) => {
            const Icon = icons[item.icon] || Star;
            return (
              <motion.div
                key={item.title}
                variants={staggerItem}
                className="rounded-xl border border-bg-tertiary bg-bg-secondary p-6 text-center transition-all duration-300 hover:border-accent/30 hover:shadow-glow"
              >
                <div className="mx-auto w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                  <Icon size={22} className="text-accent" />
                </div>
                <h3 className="font-display font-bold text-text-primary mb-2">{item.title}</h3>
                <p className="text-sm text-text-secondary">{item.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
