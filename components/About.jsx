'use client';

import { motion } from 'framer-motion';
import { User, Coffee, Terminal as TerminalIcon, Globe, Zap } from 'lucide-react';
import { personal, funFacts } from '@/data/portfolio';
import SectionHeader from './SectionHeader';
import { slideInLeft, slideInRight, staggerContainer, staggerItem } from '@/lib/animations';

const factIcons = {
  coffee: Coffee,
  terminal: TerminalIcon,
  globe: Globe,
  zap: Zap,
};

export default function About() {
  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader eyebrow="01 — ABOUT" title="Who I Am" />

        <div className="grid md:grid-cols-[320px_1fr] gap-10 items-start">
          {/* Photo box with animated rotating border */}
          <motion.div {...slideInLeft} className="mx-auto md:mx-0">
            <div className="animated-border rounded-xl p-1 w-64 h-64 md:w-72 md:h-72">
              <div className="w-full h-full rounded-lg bg-bg-secondary flex flex-col items-center justify-center gap-3 text-text-secondary">
                <User size={56} className="text-accent" />
                <span className="font-mono text-xs">[PLACEHOLDER PHOTO]</span>
                <span className="font-mono text-[10px]">/public/images/profile.jpg</span>
              </div>
            </div>
          </motion.div>

          {/* Bio + currently building + fun facts */}
          <motion.div {...slideInRight}>
            <p className="text-text-secondary leading-relaxed whitespace-pre-line">{personal.bio}</p>

            <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-bg-tertiary bg-bg-secondary px-4 py-2">
              <span className="relative flex w-2.5 h-2.5">
                <span className="pulse-dot w-2.5 h-2.5 rounded-full bg-success" />
              </span>
              <span className="font-mono text-xs text-text-secondary">
                Currently building: <span className="text-text-primary">{personal.currentlyBuilding}</span>
              </span>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              className="mt-8 grid sm:grid-cols-2 gap-4"
            >
              {funFacts.map((fact) => {
                const Icon = factIcons[fact.icon] || Zap;
                return (
                  <motion.div
                    key={fact.text}
                    variants={staggerItem}
                    className="flex items-start gap-3 rounded-xl border border-bg-tertiary bg-bg-secondary p-4 transition-all duration-300 hover:border-accent/30 hover:shadow-glow"
                  >
                    <Icon size={18} className="text-accent mt-0.5 shrink-0" />
                    <p className="text-sm text-text-secondary">{fact.text}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
