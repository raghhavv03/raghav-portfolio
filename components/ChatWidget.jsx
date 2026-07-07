'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { BotMessageSquare, X, CornerDownLeft } from 'lucide-react';
import { personal } from '@/data/portfolio';

const MAX_INPUT_CHARS = 500;
const MIN_SEND_INTERVAL_MS = 1200; // simple client-side spam brake
const MAX_HISTORY_SENT = 12;

const GREETING = {
  role: 'assistant',
  content: `Hi — I'm the AI on this site. Ask me about ${personal.name.split(' ')[0]}'s projects, skills, or experience (or anything reasonable).`,
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([GREETING]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const bodyRef = useRef(null);
  const inputRef = useRef(null);
  const lastSentAt = useRef(0);
  const reducedMotion = useReducedMotion();

  // Esc closes the panel, matching the site's other overlays
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 60);
  }, [open]);

  // Keep scrolled to the latest line, like the Terminal section
  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, loading, error, open]);

  const send = async (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;
    if (Date.now() - lastSentAt.current < MIN_SEND_INTERVAL_MS) return;
    lastSentAt.current = Date.now();

    const nextMessages = [...messages, { role: 'user', content: text }];
    setMessages(nextMessages);
    setInput('');
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // The greeting is local flavor, not part of the conversation the model needs
          messages: nextMessages.slice(1).slice(-MAX_HISTORY_SENT),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.');
      } else {
        setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
      }
    } catch {
      setError('Could not reach the server. Check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const panelMotion = reducedMotion
    ? { initial: { opacity: 1 }, animate: { opacity: 1 }, exit: { opacity: 1 } }
    : {
        initial: { opacity: 0, scale: 0.95, y: 12 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.95, y: 12 },
        transition: { duration: 0.18, ease: 'easeOut' },
      };

  return (
    <div className="fixed bottom-5 right-5 z-[45]">
      <AnimatePresence>
        {open && (
          <motion.div
            {...panelMotion}
            style={{ transformOrigin: 'bottom right' }}
            className="absolute bottom-14 right-0 w-[min(24rem,calc(100vw-2.5rem))] rounded-xl border border-bg-tertiary bg-bg-secondary shadow-2xl overflow-hidden"
            role="dialog"
            aria-label="Chat with AI assistant"
          >
            {/* macOS-style title bar, same as the Terminal section */}
            <div className="flex items-center gap-2 px-4 py-3 bg-bg-tertiary/60 border-b border-bg-tertiary">
              <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <span className="w-3 h-3 rounded-full bg-[#28c840]" />
              <span className="ml-3 font-mono text-xs text-text-secondary">
                raghav@portfolio: ai
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="ml-auto p-1 rounded-lg text-text-secondary hover:text-accent hover:bg-bg-tertiary transition-colors"
              >
                <X size={15} />
              </button>
            </div>

            {/* Transcript */}
            <div
              ref={bodyRef}
              role="log"
              aria-live="polite"
              className="h-80 overflow-y-auto p-4 font-mono text-sm leading-relaxed space-y-2"
            >
              {messages.map((m, i) =>
                m.role === 'user' ? (
                  <div key={i} className="text-text-primary">
                    <span className="text-success">guest:~$</span>{' '}
                    <span className="text-accent whitespace-pre-wrap">{m.content}</span>
                  </div>
                ) : (
                  <div key={i} className="text-text-secondary whitespace-pre-wrap">
                    {m.content}
                  </div>
                )
              )}

              {loading && (
                <div className="text-text-secondary">
                  thinking
                  <span className="terminal-cursor ml-1" />
                </div>
              )}

              {error && (
                <div className="text-warning whitespace-pre-wrap">! {error}</div>
              )}
            </div>

            {/* Input row */}
            <form
              onSubmit={send}
              className="flex items-center gap-2 px-4 py-3 border-t border-bg-tertiary"
            >
              <span className="font-mono text-sm text-success shrink-0">&gt;</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value.slice(0, MAX_INPUT_CHARS))}
                maxLength={MAX_INPUT_CHARS}
                placeholder="Ask me anything..."
                aria-label="Chat message"
                spellCheck={false}
                autoComplete="off"
                className="w-full bg-transparent font-mono text-sm text-text-primary placeholder:text-text-secondary/60 outline-none"
              />
              {input.length >= MAX_INPUT_CHARS - 50 && (
                <span className="font-mono text-[10px] text-text-secondary shrink-0">
                  {input.length}/{MAX_INPUT_CHARS}
                </span>
              )}
              <button
                type="submit"
                disabled={loading || !input.trim()}
                aria-label="Send message"
                className="p-1.5 rounded-lg text-text-secondary hover:text-accent hover:bg-bg-tertiary transition-colors disabled:opacity-40 disabled:pointer-events-none"
              >
                <CornerDownLeft size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Launcher */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close chat' : 'Open chat with AI assistant'}
        aria-expanded={open}
        className="flex items-center gap-2 rounded-lg px-4 py-2.5 font-mono text-sm border border-bg-tertiary bg-bg-secondary text-text-primary shadow-2xl transition-all duration-300 hover:border-accent/30 hover:shadow-glow"
      >
        <BotMessageSquare size={17} className="text-accent" />
        <span className="hidden sm:inline">
          ask<span className="text-accent">-</span>ai
        </span>
      </button>
    </div>
  );
}
