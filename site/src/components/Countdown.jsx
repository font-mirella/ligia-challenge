import { useEffect, useState } from 'react';
import { EVENT } from '../config.js';
import './Countdown.css';

const START = new Date(EVENT.start).getTime();
const END = new Date(EVENT.end).getTime();

function parts(ms) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return [
    ['dias', Math.floor(s / 86400)],
    ['h', Math.floor((s % 86400) / 3600)],
    ['min', Math.floor((s % 3600) / 60)],
    ['s', s % 60],
  ];
}

export default function Countdown() {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (Date.now() >= END) return undefined;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  if (now >= END) {
    return <p className="countdown__status">Foi incrível. Até a próxima edição.</p>;
  }
  if (now >= START) {
    return (
      <p className="countdown__status">
        <span className="countdown__live" /> Ao vivo: hacking em andamento
      </p>
    );
  }

  return (
    <div className="countdown" role="timer" aria-label="Tempo até a abertura">
      <span className="countdown__label">Abertura em</span>
      <div className="countdown__units">
        {parts(START - now).map(([unit, value]) => (
          <div className="countdown__unit" key={unit}>
            <span className="countdown__value" key={value}>
              {String(value).padStart(2, '0')}
            </span>
            <span className="countdown__name">{unit}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
