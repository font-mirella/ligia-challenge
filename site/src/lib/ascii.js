// Static ASCII art in the style of the deck backgrounds (#, *, +, =).

const RAMP = ' .:-=+*##';

// A lit sphere wrapped by a ring, as one block of monospaced text.
// Character cells are ~2x taller than wide, so x is squashed by `aspect`.
export function asciiOrb(cols = 64, rows = 32, { aspect = 0.5, light = [-0.5, -0.6, 0.62] } = {}) {
  const [lx, ly, lz] = normalize(light);
  // keep the drawing round: physical height / width of the grid
  const yScale = rows / (cols * aspect);
  const lines = [];
  for (let j = 0; j < rows; j++) {
    let line = '';
    for (let i = 0; i < cols; i++) {
      const x = ((i + 0.5) / cols) * 2 - 1;
      const y = (((j + 0.5) / rows) * 2 - 1) * yScale;
      line += shade(x, y, lx, ly, lz);
    }
    lines.push(line.replace(/\s+$/, ''));
  }
  return lines.join('\n');
}

function shade(x, y, lx, ly, lz) {
  const r2 = x * x + y * y;
  // ring: an annulus around the sphere, tilted
  const ringR = Math.hypot(x, y * 2.6);
  const onRing = ringR > 0.86 && ringR < 0.98 && !(r2 < 0.5 && y < 0);
  if (r2 <= 0.5) {
    const z = Math.sqrt(0.5 - r2);
    const n = normalize([x, y, z]);
    const l = Math.max(0, n[0] * lx + n[1] * ly + n[2] * lz);
    return RAMP[Math.min(RAMP.length - 1, 2 + Math.floor(l * (RAMP.length - 2)))];
  }
  if (onRing) return '=';
  return ' ';
}

function normalize([x, y, z]) {
  const m = Math.hypot(x, y, z) || 1;
  return [x / m, y / m, z / m];
}

// Rows of '#*+=' fading out to the right, like the deck's orange slide.
export function asciiStripes(cols = 80, rows = 24, seed = 7) {
  let s = seed;
  const rand = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  const lines = [];
  for (let j = 0; j < rows; j++) {
    const start = Math.floor(rand() * 10);
    const hashes = 8 + Math.floor(rand() * 14);
    const stars = Math.floor(rand() * 6);
    const pluses = Math.floor(rand() * 6);
    const eq = Math.floor(rand() * 4);
    const gap = 3 + Math.floor(rand() * 8);
    const tail = 6 + Math.floor(rand() * 14);
    let line = ' '.repeat(start) + '#'.repeat(hashes) + '*'.repeat(stars) + '+'.repeat(pluses) + '='.repeat(eq)
      + ' '.repeat(gap) + '#'.repeat(tail) + '*'.repeat(Math.floor(rand() * 5)) + '+'.repeat(Math.floor(rand() * 4));
    lines.push(line.slice(0, cols));
  }
  return lines.join('\n');
}
