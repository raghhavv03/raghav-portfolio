'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { ChevronDown, Download, ArrowRight, MapPin } from 'lucide-react';
import { personal, heroRoles } from '@/data/portfolio';

const ParticleField = dynamic(() => import('./ParticleField'), { ssr: false });

function useTypewriterLoop(words, typeMs = 70, deleteMs = 35, holdMs = 1500) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIndex % words.length];
    let timeout;
    if (!deleting && text === word) {
      timeout = setTimeout(() => setDeleting(true), holdMs);
    } else if (deleting && text === '') {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
    } else {
      timeout = setTimeout(
        () => setText(word.slice(0, text.length + (deleting ? -1 : 1))),
        deleting ? deleteMs : typeMs
      );
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex, words, typeMs, deleteMs, holdMs]);

  return text;
}

export default function Hero() {
  const role = useTypewriterLoop(heroRoles);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ParticleField />
      {/* Subtle radial glow behind the name */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 40% at 50% 45%, var(--accent-dim), transparent)' }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-mono text-sm text-accent mb-4"
        >
          $ hello, world — I am
        </motion.p>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          data-text={personal.name}
          className="glitch font-display font-bold text-6xl md:text-8xl tracking-tight text-text-primary"
        >
          {personal.name}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-6 font-mono text-lg md:text-2xl text-text-secondary h-8"
        >
          <span className="text-accent">&gt;</span> {role}
          <span className="terminal-cursor ml-1" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-4 flex items-center justify-center gap-1.5 text-sm text-text-secondary"
        >
          <MapPin size={14} className="text-accent" />
          {personal.location}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-lg px-6 py-2.5 bg-accent text-bg-primary font-semibold transition-all duration-200 hover:scale-[1.02] shadow-glow"
          >
            View My Work
            <ArrowRight size={16} />
          </a>
          <a
            href={personal.resumeUrl}
            download
            className="inline-flex items-center gap-2 rounded-lg px-6 py-2.5 border border-accent text-accent bg-transparent transition-all duration-200 hover:scale-[1.02] hover:bg-accent/10"
          >
            <Download size={16} />
            Download Resume
          </a>
        </motion.div>
      </div>

      <a
        href="#terminal"
        aria-label="Scroll down"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-text-secondary hover:text-accent transition-colors"
      >
        <ChevronDown size={28} className="scroll-chevron" />
      </a>
    </section>
  );
}
