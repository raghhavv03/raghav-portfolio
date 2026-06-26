'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { Keyboard, X } from 'lucide-react';
import { shortcuts } from '@/data/portfolio';

const sectionKeys = {
  h: '#home',
  a: '#about',
  s: '#skills',
  p: '#projects',
  e: '#experience',
  c: '#contact',
};

export default function KeyboardShortcuts() {
  const [open, setOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    const onKey = (e) => {
      // Never hijack keys while the user is typing (terminal, contact form, palette)
      const tag = e.target.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || e.target.isContentEditable) return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      const key = e.key.toLowerCase();
      if (e.key === '?') {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === 'Escape') {
        setOpen(false);
      } else if (key === 't') {
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
      } else if (sectionKeys[key]) {
        document.querySelector(sectionKeys[key])?.scrollIntoView({ behavior: 'smooth' });
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [resolvedTheme, setTheme]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-center justify-center px-4"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-xl border border-bg-tertiary bg-bg-secondary shadow-2xl p-6"
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <Keyboard size={19} className="text-accent" />
                <h3 className="font-display font-bold text-text-primary">Keyboard Shortcuts</h3>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close shortcuts"
                className="p-1.5 rounded-lg text-text-secondary hover:text-accent hover:bg-bg-tertiary transition-colors"
              >
                <X size={17} />
              </button>
            </div>

            <ul className="space-y-2.5">
              {shortcuts.map((shortcut) => (
                <li key={shortcut.action} className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">{shortcut.action}</span>
                  <span className="flex items-center gap-1">
                    {shortcut.keys.map((key) => (
                      <kbd
                        key={key}
                        className="font-mono text-xs text-text-primary bg-bg-tertiary border border-bg-tertiary rounded px-2 py-1 min-w-[1.8rem] text-center"
                      >
                        {key}
                      </kbd>
                    ))}
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-5 font-mono text-[10px] text-text-secondary text-center">
              // press ? anywhere to toggle this panel
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
