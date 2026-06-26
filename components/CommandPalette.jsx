'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Hash, Folder, Zap, CornerDownLeft } from 'lucide-react';
import { navLinks, projects, personal } from '@/data/portfolio';

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const inputRef = useRef(null);
  const { resolvedTheme, setTheme } = useTheme();

  const items = useMemo(
    () => [
      ...navLinks.map((link) => ({
        group: 'Navigation',
        icon: Hash,
        label: `Go to ${link.label}`,
        run: () => document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' }),
      })),
      ...projects.map((p) => ({
        group: 'Projects',
        icon: Folder,
        label: p.name,
        run: () => window.open(p.github, '_blank', 'noopener'),
      })),
      {
        group: 'Actions',
        icon: Zap,
        label: 'Download Resume',
        run: () => window.open(personal.resumeUrl, '_blank'),
      },
      {
        group: 'Actions',
        icon: Zap,
        label: 'Toggle Theme',
        run: () => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark'),
      },
      {
        group: 'Actions',
        icon: Zap,
        label: 'Email Me',
        run: () => (window.location.href = `mailto:${personal.email}`),
      },
    ],
    [resolvedTheme, setTheme]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? items.filter((item) => item.label.toLowerCase().includes(q)) : items;
  }, [items, query]);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
        setQuery('');
        setSelected(0);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  useEffect(() => setSelected(0), [query]);

  const runItem = (item) => {
    setOpen(false);
    item.run();
  };

  const onInputKey = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelected((s) => Math.min(s + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelected((s) => Math.max(s - 1, 0));
    } else if (e.key === 'Enter' && filtered[selected]) {
      runItem(filtered[selected]);
    }
  };

  // Group the filtered items, preserving order
  const grouped = useMemo(() => {
    const groups = [];
    filtered.forEach((item, index) => {
      const last = groups[groups.length - 1];
      if (!last || last.name !== item.group) groups.push({ name: item.group, items: [{ ...item, index }] });
      else last.items.push({ ...item, index });
    });
    return groups;
  }, [filtered]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-start justify-center pt-[18vh] px-4"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-xl border border-bg-tertiary bg-bg-secondary shadow-2xl overflow-hidden"
          >
            <div className="flex items-center gap-3 px-4 border-b border-bg-tertiary">
              <Search size={17} className="text-text-secondary shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKey}
                placeholder="Type a command or search..."
                className="w-full bg-transparent py-3.5 text-sm text-text-primary placeholder:text-text-secondary/60 outline-none"
              />
              <kbd className="font-mono text-[10px] text-text-secondary border border-bg-tertiary rounded px-1.5 py-0.5 shrink-0">
                ESC
              </kbd>
            </div>

            <div className="max-h-72 overflow-y-auto p-2">
              {filtered.length === 0 && (
                <p className="px-3 py-6 text-center font-mono text-sm text-text-secondary">
                  No results for &quot;{query}&quot;
                </p>
              )}
              {grouped.map((group) => (
                <div key={group.name}>
                  <p className="px-3 pt-3 pb-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-text-secondary">
                    {group.name}
                  </p>
                  {group.items.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => runItem(item)}
                      onMouseEnter={() => setSelected(item.index)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm transition-colors ${
                        selected === item.index
                          ? 'bg-accent/10 text-accent'
                          : 'text-text-primary hover:bg-bg-tertiary'
                      }`}
                    >
                      <item.icon size={15} className="shrink-0 opacity-70" />
                      <span className="flex-1">{item.label}</span>
                      {selected === item.index && <CornerDownLeft size={13} className="opacity-60" />}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
