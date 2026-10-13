import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../hooks/useReducedMotion.js';

// Sparse columns of sideways 0/1 digits drifting down, as on the deck's
// "Objectives" slide. Purely decorative.
export default function BinaryRain({ className, gap = 34, density = 0.45, speed = 1 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const reduced = prefersReducedMotion();
    const charH = 17;
    let W = 0;
    let H = 0;
    let columns = [];
    let raf = 0;
    let running = false;
    let last = 0;

    const digit = () => (Math.random() < 0.5 ? '0' : '1');

    function makeColumn(x, scatter) {
      const len = 3 + ((Math.random() * 9) | 0);
      return {
        x,
        len,
        y: scatter ? Math.random() * (H + len * charH) : -Math.random() * H * 0.6,
        v: (0.25 + Math.random() * 0.75) * speed,
        chars: Array.from({ length: len }, digit),
        on: Math.random() < density,
      };
    }

    function resize() {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      W = rect.width;
      H = rect.height;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = `500 16px 'Geist Mono Variable', ui-monospace, monospace`;
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      columns = [];
      for (let x = gap / 2; x < W; x += gap) columns.push(makeColumn(x, true));
      draw();
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      for (const c of columns) {
        if (!c.on) continue;
        for (let k = 0; k < c.len; k++) {
          const y = c.y - k * charH;
          if (y < -charH || y > H + charH) continue;
          ctx.globalAlpha = (1 - k / c.len) * 0.75;
          ctx.fillStyle = k === 0 ? '#ffffff' : '#c9d6ff';
          ctx.save();
          ctx.translate(c.x, y);
          ctx.rotate(Math.PI / 2);
          ctx.fillText(c.chars[k], 0, 0);
          ctx.restore();
        }
      }
      ctx.globalAlpha = 1;
    }

    function loop(now) {
      raf = requestAnimationFrame(loop);
      const dt = Math.min(3, (now - last) / 16.7);
      last = now;
      for (let i = 0; i < columns.length; i++) {
        const c = columns[i];
        c.y += c.v * dt;
        if (Math.random() < 0.02) c.chars[(Math.random() * c.len) | 0] = digit();
        if (c.y - c.len * charH > H) columns[i] = makeColumn(c.x, false);
      }
      draw();
    }

    const start = () => {
      if (running || reduced) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const ro = new ResizeObserver(resize);
    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()));
    ro.observe(canvas);
    io.observe(canvas);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
    };
  }, [gap, density, speed]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
