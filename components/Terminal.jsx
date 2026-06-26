'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { terminal } from '@/data/portfolio';
import SectionHeader from './SectionHeader';
import { fadeInUp } from '@/lib/animations';

const TYPE_MS = 55; // per-character typing speed for the boot sequence

export default function Terminal() {
  // lines: { type: 'command' | 'output', text }
  const [lines, setLines] = useState([]);
  const [typedCommand, setTypedCommand] = useState(null); // command currently being auto-typed
  const [booting, setBooting] = useState(true);
  const [input, setInput] = useState('');
  const [started, setStarted] = useState(false);
  const bodyRef = useRef(null);
  const inputRef = useRef(null);
  const sectionRef = useRef(null);

  // Start the boot sequence only when the terminal scrolls into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Auto-type the boot sequence, one command at a time
  useEffect(() => {
    if (!started) return;
    let cancelled = false;

    const typeCommand = (cmd) =>
      new Promise((resolve) => {
        let i = 0;
        const step = () => {
          if (cancelled) return;
          i++;
          setTypedCommand(cmd.slice(0, i));
          if (i < cmd.length) setTimeout(step, TYPE_MS);
          else setTimeout(resolve, 250);
        };
        step();
      });

    (async () => {
      await new Promise((r) => setTimeout(r, 500));
      for (const cmd of terminal.bootSequence) {
        await typeCommand(cmd);
        if (cancelled) return;
        setTypedCommand(null);
        setLines((prev) => [
          ...prev,
          { type: 'command', text: cmd },
          ...(terminal.responses[cmd] || []).map((text) => ({ type: 'output', text })),
        ]);
        await new Promise((r) => setTimeout(r, 350));
      }
      if (!cancelled) {
        setBooting(false);
        setLines((prev) => [
          ...prev,
          { type: 'output', text: "Type 'help' to see available commands." },
        ]);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [started]);

  // Keep scrolled to the bottom as lines appear
  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines, typedCommand]);

  const runCommand = (raw) => {
    const cmd = raw.trim();
    if (!cmd) return;
    if (cmd === 'clear') {
      setLines([]);
      return;
    }
    const response =
      terminal.responses[cmd] ||
      terminal.responses[cmd.toLowerCase()] || [
        `bash: ${cmd}: command not found`,
      ];
    setLines((prev) => [
      ...prev,
      { type: 'command', text: cmd },
      ...response.map((text) => ({ type: 'output', text })),
    ]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    runCommand(input);
    setInput('');
  };

  return (
    <section id="terminal" ref={sectionRef} className="py-20 relative">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          eyebrow="00 — TERMINAL"
          title="Talk to My Portfolio"
          subtitle="A real shell would be overkill. This one only knows about me."
        />

        <motion.div
          {...fadeInUp}
          className="rounded-xl overflow-hidden border border-bg-tertiary bg-bg-secondary shadow-2xl"
          onClick={() => inputRef.current?.focus()}
        >
          {/* macOS-style title bar */}
          <div className="flex items-center gap-2 px-4 py-3 bg-bg-tertiary/60 border-b border-bg-tertiary">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
            <span className="ml-3 font-mono text-xs text-text-secondary">
              {terminal.windowTitle}
            </span>
          </div>

          {/* Terminal body */}
          <div
            ref={bodyRef}
            className="h-80 overflow-y-auto p-4 font-mono text-sm leading-relaxed cursor-text"
          >
            {lines.map((line, i) =>
              line.type === 'command' ? (
                <div key={i} className="text-text-primary animate-[fadeIn_0.2s_ease]">
                  <span className="text-success">{terminal.prompt}</span>{' '}
                  <span className="text-accent">{line.text}</span>
                </div>
              ) : (
                <div key={i} className="text-text-secondary whitespace-pre-wrap">
                  {line.text}
                </div>
              )
            )}

            {/* Command currently being auto-typed */}
            {typedCommand !== null && (
              <div className="text-text-primary">
                <span className="text-success">{terminal.prompt}</span>{' '}
                <span className="text-accent">{typedCommand}</span>
                <span className="terminal-cursor ml-0.5" />
              </div>
            )}

            {/* Live input line — hidden input captures keystrokes, span renders them
                so the block cursor sits flush after the text like a real shell */}
            {!booting && (
              <form onSubmit={onSubmit} className="relative">
                <span className="text-success">{terminal.prompt}</span>{' '}
                <span className="text-accent whitespace-pre-wrap">{input}</span>
                <span className="terminal-cursor" />
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="absolute inset-0 w-full opacity-0 cursor-text"
                  spellCheck={false}
                  autoComplete="off"
                  aria-label="Terminal input"
                />
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
