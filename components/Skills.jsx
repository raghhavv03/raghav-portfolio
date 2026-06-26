'use client';

import { motion } from 'framer-motion';
import { Database, Server, Brain, Eye, Code2 } from 'lucide-react';
import {
  SiPython, SiJavascript, SiTypescript, SiCplusplus, SiReact, SiNextdotjs,
  SiNodedotjs, SiTailwindcss, SiGit, SiDocker, SiLinux, SiMongodb,
  SiPytorch, SiTensorflow, SiPandas, SiOpenjdk,
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa6';
import { skills } from '@/data/portfolio';
import SectionHeader from './SectionHeader';
import { staggerContainer, staggerItem } from '@/lib/animations';

// Map icon keys from portfolio.js to actual icon components
const iconMap = {
  python: SiPython,
  javascript: SiJavascript,
  typescript: SiTypescript,
  java: SiOpenjdk,
  cpp: SiCplusplus,
  react: SiReact,
  nextjs: SiNextdotjs,
  nodejs: SiNodedotjs,
  tailwind: SiTailwindcss,
  git: SiGit,
  docker: SiDocker,
  aws: FaAws,
  linux: SiLinux,
  mongodb: SiMongodb,
  pytorch: SiPytorch,
  tensorflow: SiTensorflow,
  pandas: SiPandas,
  database: Database,
  server: Server,
  brain: Brain,
  eye: Eye,
};

export default function Skills() {
  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader eyebrow="02 — SKILLS" title="My Toolbox" />

        <div className="grid sm:grid-cols-2 gap-x-10 gap-y-10">
          {skills.map((group) => (
            <div key={group.category}>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-text-secondary mb-4">
                <span className="text-accent">{'> '}</span>
                {group.category}
              </p>
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-40px' }}
                className="flex flex-wrap gap-2.5"
              >
                {group.items.map((skill) => {
                  const Icon = iconMap[skill.icon] || Code2;
                  return (
                    <motion.span
                      key={skill.name}
                      variants={staggerItem}
                      className="group inline-flex items-center gap-2 font-mono text-sm px-3.5 py-2 rounded-full bg-bg-secondary text-text-secondary border border-bg-tertiary transition-all duration-300 hover:text-accent hover:border-accent/40 hover:shadow-glow cursor-default"
                    >
                      <Icon size={15} className="transition-colors group-hover:text-accent" />
                      {skill.name}
                    </motion.span>
                  );
                })}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
