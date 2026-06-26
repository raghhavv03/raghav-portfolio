'use client';

import { useRef, useCallback } from 'react';

// Mouse-position tilt for cards. Max 10deg, smooth return on leave.
// Returns { ref, onMouseMove, onMouseLeave } to spread onto an element.
export default function useTilt(maxDeg = 10) {
  const ref = useRef(null);

  const onMouseMove = useCallback(
    (e) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(800px) rotateY(${px * maxDeg}deg) rotateX(${-py * maxDeg}deg) scale(1.02)`;
      el.style.transition = 'transform 80ms linear';
    },
    [maxDeg]
  );

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)';
    el.style.transition = 'transform 300ms ease';
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}
