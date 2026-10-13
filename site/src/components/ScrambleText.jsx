import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../hooks/useReducedMotion.js';

const GLYPHS = '#*+=-:<>/01_';

// Text that "decodes" from ASCII noise into the final string, left to right.
// The real text is always in the DOM for screen readers and no-JS visitors;
// only the visible layer is animated.
export default function ScrambleText({ text, as: Tag = 'span', className, play = true, delay = 0, duration = 1100 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !play || prefersReducedMotion()) return undefined;

    const chars = [...text];
    let raf = 0;
    let start = 0;
    const timer = setTimeout(() => {
      start = performance.now();
      raf = requestAnimationFrame(tick);
    }, delay);

    function tick(now) {
      const t = Math.min(1, (now - start) / duration);
      let out = '';
      for (let i = 0; i < chars.length; i++) {
        const c = chars[i];
        // each character settles a little after the previous one
        const settleAt = (i / chars.length) * 0.7 + 0.3;
        if (c === ' ' || c === '\n' || t >= settleAt) out += c;
        else out += GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
      el.textContent = out;
      if (t < 1) raf = requestAnimationFrame(tick);
    }

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
      el.textContent = text;
    };
  }, [text, play, delay, duration]);

  return (
    <Tag className={className}>
      <span className="visually-hidden">{text}</span>
      <span ref={ref} aria-hidden="true">
        {text}
      </span>
    </Tag>
  );
}
