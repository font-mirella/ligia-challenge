import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../hooks/useReducedMotion.js';

const RAMP = '.,:-=+*##%@';
const BUCKETS = RAMP.length;
const TAU = Math.PI * 2;
const R1 = 1; // tube radius
const R2 = 2.1; // ring radius
const K2 = 6.5; // viewer distance

// Rotating torus drawn with ASCII characters (the classic donut.c renderer),
// echoing the #*+= artwork on the deck cover. It leans toward the pointer,
// pauses when off screen, and renders a single still frame for visitors who
// prefer reduced motion.
export default function AsciiTorus({ className }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const reduced = prefersReducedMotion();

    let W = 0;
    let H = 0;
    let cellW = 10;
    let cellH = 16;
    let cols = 0;
    let rows = 0;
    let zbuf = new Float32Array(0);
    let lum = new Float32Array(0);
    let cosP = new Float32Array(0);
    let sinP = new Float32Array(0);
    let cosT = new Float32Array(0);
    let sinT = new Float32Array(0);
    const buckets = Array.from({ length: BUCKETS }, () => []);

    let A = 0.9;
    let B = 0.35;
    let tiltX = 0;
    let tiltY = 0;
    let targetX = 0;
    let targetY = 0;
    let running = false;
    let raf = 0;
    let last = 0;
    let t0 = 0;

    const colors = RAMP.split('').map((_, i) => {
      const t = i / (BUCKETS - 1);
      if (t > 0.86) return `rgba(255, 106, 51, ${0.75 + t * 0.25})`;
      const a = 0.14 + t * 0.78;
      return `rgba(214, 226, 255, ${a.toFixed(3)})`;
    });

    function resize() {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      W = rect.width;
      H = rect.height;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cellW = W < 520 ? 7.5 : W < 900 ? 9 : 10.5;
      cellH = cellW * 1.62;
      cols = Math.ceil(W / cellW);
      rows = Math.ceil(H / cellH);
      zbuf = new Float32Array(cols * rows);
      lum = new Float32Array(cols * rows);
      buildTables();
      ctx.font = `600 ${(cellW * 1.5).toFixed(1)}px 'Geist Mono Variable', ui-monospace, monospace`;
      ctx.textBaseline = 'top';
      if (reduced || !running) draw(1);
    }

    // Sample the surface finely enough that neighbouring points land in
    // neighbouring cells even on the nearest side, so a big torus has no holes.
    // Small canvases keep the classic steps (0.016 / 0.055 rad).
    function buildTables() {
      const reach = (Math.min(W, H * 1.15) * 0.375 * (K2 / (R1 + R2))) / (K2 - R1 - R2);
      const nPhi = Math.min(720, Math.max(393, Math.ceil((TAU * reach * (R1 + R2)) / cellW)));
      const nTheta = Math.min(200, Math.max(115, Math.ceil((TAU * reach * R1) / cellW)));
      cosP = new Float32Array(nPhi);
      sinP = new Float32Array(nPhi);
      cosT = new Float32Array(nTheta);
      sinT = new Float32Array(nTheta);
      for (let i = 0; i < nPhi; i++) {
        cosP[i] = Math.cos((i / nPhi) * TAU);
        sinP[i] = Math.sin((i / nPhi) * TAU);
      }
      for (let j = 0; j < nTheta; j++) {
        cosT[j] = Math.cos((j / nTheta) * TAU);
        sinT[j] = Math.sin((j / nTheta) * TAU);
      }
    }

    function draw(intro) {
      zbuf.fill(0);
      lum.fill(-1);

      const a = A + tiltY;
      const b = B + tiltX;
      const cA = Math.cos(a);
      const sA = Math.sin(a);
      const cB = Math.cos(b);
      const sB = Math.sin(b);
      const scale = Math.min(W, H * 1.15) * 0.375 * (K2 / (R1 + R2)) * (0.6 + 0.4 * intro);
      const cx = W / 2;
      const cy = H / 2;
      const sAsB = sA * sB;
      const sAcB = sA * cB;
      const nPhi = cosP.length;

      for (let j = 0; j < cosT.length; j++) {
        const ct = cosT[j];
        const st = sinT[j];
        const ox = R2 + R1 * ct;
        const oy = R1 * st;
        const x0 = -oy * cA * sB;
        const y0 = oy * cA * cB;
        const z0 = K2 + oy * sA;
        const l0 = -sA * st + cB * cA * st;
        for (let i = 0; i < nPhi; i++) {
          const cp = cosP[i];
          const sp = sinP[i];
          const x = ox * (cB * cp + sAsB * sp) + x0;
          const y = ox * (sB * cp - sAcB * sp) + y0;
          const ooz = 1 / (z0 + cA * ox * sp);
          const col = ((cx + scale * ooz * x) / cellW) | 0;
          const row = ((cy - scale * ooz * y) / cellH) | 0;
          if (col < 0 || col >= cols || row < 0 || row >= rows) continue;
          const L = cp * ct * sB - cA * ct * sp + l0 - sAcB * ct * sp;
          const idx = row * cols + col;
          if (ooz > zbuf[idx]) {
            zbuf[idx] = ooz;
            lum[idx] = L;
          }
        }
      }

      for (const bucket of buckets) bucket.length = 0;
      for (let i = 0; i < lum.length; i++) {
        const L = lum[i];
        if (L < 0) continue;
        const k = Math.min(BUCKETS - 1, ((L / 1.42) * BUCKETS) | 0);
        buckets[k].push(i);
      }

      ctx.clearRect(0, 0, W, H);
      ctx.globalAlpha = intro;
      for (let k = 0; k < BUCKETS; k++) {
        const list = buckets[k];
        if (!list.length) continue;
        ctx.fillStyle = colors[k];
        const ch = RAMP[k];
        for (let n = 0; n < list.length; n++) {
          const i = list[n];
          ctx.fillText(ch, (i % cols) * cellW, ((i / cols) | 0) * cellH);
        }
      }
      ctx.globalAlpha = 1;
    }

    function loop(now) {
      raf = requestAnimationFrame(loop);
      if (now - last < 28) return; // ~35 fps is plenty for ASCII
      const dt = Math.min(3, (now - last) / 16.7);
      last = now;
      A += 0.0026 * dt;
      B += 0.0015 * dt;
      tiltX += (targetX - tiltX) * 0.05 * dt;
      tiltY += (targetY - tiltY) * 0.05 * dt;
      const p = Math.min(1, (now - t0) / 1800);
      draw(1 - Math.pow(1 - p, 4));
    }

    function start() {
      if (running || reduced) return;
      running = true;
      last = performance.now();
      if (!t0) t0 = last;
      raf = requestAnimationFrame(loop);
    }

    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    const onPointer = (e) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 0.9;
      targetY = (e.clientY / window.innerHeight - 0.5) * 0.7;
    };

    const ro = new ResizeObserver(resize);
    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()));
    const onVisibility = () => (document.hidden ? stop() : start());

    let cancelled = false;
    document.fonts.load(`600 16px 'Geist Mono Variable'`).finally(() => {
      if (cancelled) return;
      ro.observe(canvas);
      resize();
      if (reduced) {
        draw(1);
        return;
      }
      io.observe(canvas);
      window.addEventListener('pointermove', onPointer, { passive: true });
      document.addEventListener('visibilitychange', onVisibility);
    });

    return () => {
      cancelled = true;
      stop();
      ro.disconnect();
      io.disconnect();
      window.removeEventListener('pointermove', onPointer);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
