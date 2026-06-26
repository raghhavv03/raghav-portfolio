'use client';

import { Mail } from 'lucide-react';
import { FaLinkedin, FaGithub } from 'react-icons/fa6';
import { personal } from '@/data/portfolio';

const socials = [
  { icon: FaGithub, href: personal.github, label: 'GitHub' },
  { icon: FaLinkedin, href: personal.linkedin, label: 'LinkedIn' },
  { icon: Mail, href: `mailto:${personal.email}`, label: 'Email' },
];

export default function Footer() {
  return (
    <footer className="border-t border-bg-tertiary py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <p className="font-display font-bold text-text-primary">{personal.name}</p>
          <p className="font-mono text-xs text-text-secondary mt-1">{personal.title}</p>
        </div>

        <p className="font-mono text-xs text-text-secondary text-center">
          Designed &amp; built by {personal.name} · Powered by Claude Code
        </p>

        <div className="flex items-center gap-3">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target={social.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              aria-label={social.label}
              className="p-2.5 rounded-lg text-text-secondary border border-bg-tertiary transition-all duration-300 hover:text-accent hover:border-accent/40 hover:-translate-y-1 hover:shadow-glow"
            >
              <social.icon size={17} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
