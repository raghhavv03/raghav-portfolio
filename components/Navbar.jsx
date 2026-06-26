'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X, Download, TerminalSquare } from 'lucide-react';
import { navLinks, personal } from '@/data/portfolio';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Track which section is in view for the active nav highlight
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'backdrop-blur-md bg-bg-primary/80 border-b border-bg-tertiary'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="#home"
          className="flex items-center gap-2 font-mono text-sm text-text-primary hover:text-accent transition-colors"
        >
          <TerminalSquare size={18} className="text-accent" />
          <span>
            raghav<span className="text-accent">@</span>portfolio
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`relative px-3 py-2 text-sm transition-colors ${
                    isActive ? 'text-accent' : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute left-3 right-3 -bottom-0.5 h-px bg-accent"
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-lg text-text-secondary hover:text-accent hover:bg-bg-tertiary transition-all duration-200"
          >
            {mounted && (resolvedTheme === 'dark' ? <Sun size={18} /> : <Moon size={18} />)}
          </button>
          <a
            href={personal.resumeUrl}
            download
            className="hidden md:inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm border border-accent text-accent bg-transparent transition-all duration-200 hover:scale-[1.02] hover:bg-accent/10"
          >
            <Download size={14} />
            Download CV
          </a>
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="md:hidden p-2 rounded-lg text-text-secondary hover:text-accent transition-colors"
          >
            <Menu size={20} />
          </button>
        </div>
      </nav>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-bg-primary/95 backdrop-blur-lg md:hidden"
          >
            <div className="flex justify-end p-5">
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="p-2 text-text-secondary hover:text-accent"
              >
                <X size={24} />
              </button>
            </div>
            <ul className="flex flex-col items-center gap-2 mt-10">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.35 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block px-8 py-3 font-display text-2xl text-text-primary hover:text-accent transition-colors"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * navLinks.length, duration: 0.35 }}
              >
                <a
                  href={personal.resumeUrl}
                  download
                  className="mt-4 inline-flex items-center gap-2 rounded-lg px-6 py-2.5 border border-accent text-accent"
                >
                  <Download size={16} />
                  Download CV
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
