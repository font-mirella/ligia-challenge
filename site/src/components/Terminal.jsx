import { useEffect, useState } from 'react';
import { prefersReducedMotion } from '../hooks/useReducedMotion.js';
import './Terminal.css';

const CPS = 70; // characters typed per second
const LINE_PAUSE = 260;

// A fake terminal that types out an agent run line by line.
// `onDone` fires a few seconds after the last line, so the parent can rotate.
export default function Terminal({ title, lines, play, onDone }) {
  const reduced = prefersReducedMotion();
  const [line, setLine] = useState(reduced ? lines.length : 0);
  const [chars, setChars] = useState(0);

  // restart when the script changes
  useEffect(() => {
    setLine(reduced ? lines.length : 0);
    setChars(0);
  }, [lines, reduced]);

  useEffect(() => {
    if (!play || reduced) return undefined;
    if (line >= lines.length) {
      const t = setTimeout(() => onDone?.(), 3200);
      return () => clearTimeout(t);
    }
    const full = lines[line].text.length;
    if (chars < full) {
      const t = setTimeout(() => setChars((c) => Math.min(full, c + 2)), 2000 / CPS);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setLine((l) => l + 1);
      setChars(0);
    }, LINE_PAUSE);
    return () => clearTimeout(t);
  }, [play, reduced, line, chars, lines, onDone]);

  return (
    <div className="term" role="img" aria-label={`Exemplo de execução de agente: ${title}`}>
      <div className="term__bar">
        <span className="term__dots">
          <i />
          <i />
          <i />
        </span>
        <span className="term__title">{title}</span>
        <span className="term__tag">exemplo</span>
      </div>
      <pre className="term__body" aria-hidden="true">
        {lines.map((l, i) => {
          if (i > line) return null;
          const text = i === line ? l.text.slice(0, chars) : l.text;
          return (
            <div key={i} className={`term__line term__line--${l.kind}`}>
              <span className="term__kind">{l.kind === 'cmd' ? '$' : l.kind === 'done' ? '✓' : '→'}</span>
              {l.kind !== 'cmd' && l.kind !== 'done' && <span className="term__label">{l.kind.padEnd(6)}</span>}
              <span className="term__text">{text}</span>
              {i === line && <span className="cursor-blink" />}
            </div>
          );
        })}
        {line >= lines.length && (
          <div className="term__line">
            <span className="term__kind">$</span>
            <span className="cursor-blink" />
          </div>
        )}
      </pre>
    </div>
  );
}
