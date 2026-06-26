'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, Send } from 'lucide-react';
import { FaLinkedin, FaGithub } from 'react-icons/fa6';
import { personal } from '@/data/portfolio';
import SectionHeader from './SectionHeader';
import { slideInLeft, slideInRight } from '@/lib/animations';

const contactItems = [
  { icon: Mail, label: 'Email', value: personal.email, href: `mailto:${personal.email}` },
  { icon: Phone, label: 'Phone', value: personal.phone, href: `tel:${personal.phone.replace(/\s/g, '')}` },
  { icon: FaLinkedin, label: 'LinkedIn', value: 'linkedin.com/in/raghhavv93', href: personal.linkedin },
  { icon: FaGithub, label: 'GitHub', value: 'github.com/placeholder-github', href: personal.github },
];

export default function Contact() {
  const onSubmit = (e) => e.preventDefault();

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          eyebrow="08 — CONTACT"
          title="Get In Touch"
          subtitle="Have a project, an opportunity, or just want to talk code? My inbox is open."
        />

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact info */}
          <motion.div {...slideInLeft} className="space-y-4">
            {contactItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-xl border border-bg-tertiary bg-bg-secondary p-4 transition-all duration-300 hover:border-accent/30 hover:shadow-glow hover:-translate-y-0.5"
              >
                <span className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110">
                  <item.icon size={19} className="text-accent" />
                </span>
                <span>
                  <span className="block font-mono text-xs uppercase tracking-wider text-text-secondary">
                    {item.label}
                  </span>
                  <span className="block text-sm text-text-primary group-hover:text-accent transition-colors">
                    {item.value}
                  </span>
                </span>
              </a>
            ))}
          </motion.div>

          {/* Form UI (no backend yet) */}
          <motion.form {...slideInRight} onSubmit={onSubmit} className="space-y-4">
            <div>
              <label htmlFor="contact-name" className="block font-mono text-xs uppercase tracking-wider text-text-secondary mb-2">
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                placeholder="Your name"
                className="w-full rounded-lg bg-bg-tertiary border border-transparent px-4 py-2.5 text-sm text-text-primary placeholder:text-text-secondary/60 outline-none focus:border-accent transition-colors"
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="block font-mono text-xs uppercase tracking-wider text-text-secondary mb-2">
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-lg bg-bg-tertiary border border-transparent px-4 py-2.5 text-sm text-text-primary placeholder:text-text-secondary/60 outline-none focus:border-accent transition-colors"
              />
            </div>
            <div>
              <label htmlFor="contact-message" className="block font-mono text-xs uppercase tracking-wider text-text-secondary mb-2">
                Message
              </label>
              <textarea
                id="contact-message"
                rows={5}
                placeholder="What's on your mind?"
                className="w-full rounded-lg bg-bg-tertiary border border-transparent px-4 py-2.5 text-sm text-text-primary placeholder:text-text-secondary/60 outline-none focus:border-accent transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-lg px-6 py-2.5 bg-accent text-bg-primary font-semibold transition-all duration-200 hover:scale-[1.02] shadow-glow"
            >
              <Send size={15} />
              Send Message
            </button>
            <p className="font-mono text-xs text-text-secondary">// Form integration coming soon</p>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
