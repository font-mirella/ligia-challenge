import { EVENT } from '../config.js';
import './Marquee.css';

const TOP = ['AI Agents', 'Construa algo real', `${EVENT.builders}\u00a0builders`, EVENT.dates, `${EVENT.venue} · ${EVENT.city}`];
const BOTTOM = ['Recife × João Pessoa', 'Planejar', 'Executar', 'Iterar', 'Demo Day', 'Mentoria', 'Prêmios'];

function Star() {
  return (
    <svg className="marquee__star" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2v20M3.3 7l17.4 10M3.3 17L20.7 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}

function Band({ items, variant, reverse }) {
  // The list is repeated so the track can loop seamlessly at -50%.
  const run = [...items, ...items];
  return (
    <div className={`marquee__band marquee__band--${variant}`}>
      <div className={`marquee__track ${reverse ? 'is-reverse' : ''}`}>
        {[run, run].map((list, k) => (
          <div className="marquee__group" key={k}>
            {list.map((t, i) => (
              <span className="marquee__item" key={i}>
                {t}
                <Star />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <Band items={BOTTOM} variant="navy" reverse />
      <Band items={TOP} variant="orange" />
    </div>
  );
}
