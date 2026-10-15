import { useEffect, useRef, useState } from 'react';
import useInView from '../hooks/useInView.js';
import { prefersReducedMotion } from '../hooks/useReducedMotion.js';

// Counts every number inside `value` up from zero once it scrolls into view,
// keeping the surrounding text ("70–100", "8–16h") intact.
export default function CountUp({ value, duration = 1600 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { threshold: 0.6 });
  const [shown, setShown] = useState(value);

  useEffect(() => {
    if (!inView || prefersReducedMotion()) return undefined;
    const parts = value.split(/(\d+)/);
    let raf = 0;
    const start = performance.now();
    const step = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const e = 1 - Math.pow(1 - t, 4);
      setShown(parts.map((p) => (/^\d+$/.test(p) ? String(Math.round(Number(p) * e)) : p)).join(''));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return (
    <span ref={ref}>
      <span className="visually-hidden">{value}</span>
      <span aria-hidden="true">{shown}</span>
    </span>
  );
}
