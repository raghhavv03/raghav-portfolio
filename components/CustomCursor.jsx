'use client';

import { useEffect, useRef, useState } from 'react';

// Glowing dot cursor with a lagging ring trail.
// Renders nothing on touch devices or with reduced motion.
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reducedMotion) return;

    setEnabled(true);
    document.documentElement.classList.add('custom-cursor-active');

    let mouse = { x: -100, y: -100 };
    let ring = { x: -100, y: -100 };
    let raf;

    const onMove = (e) => {
      mouse = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouse.x}px, ${mouse.y}px) translate(-50%, -50%)`;
      }
    };

    const tick = () => {
      // Ring lags behind via lerp
      ring.x += (mouse.x - ring.x) * 0.14;
      ring.y += (mouse.y - ring.y) * 0.14;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.x}px, ${ring.y}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove('custom-cursor-active');
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 z-[100] w-2 h-2 rounded-full bg-accent pointer-events-none"
        style={{ boxShadow: '0 0 10px var(--accent), 0 0 20px var(--accent-dim)' }}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className="fixed top-0 left-0 z-[100] w-8 h-8 rounded-full border border-accent/40 pointer-events-none"
      />
    </>
  );
}
