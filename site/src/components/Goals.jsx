import { asciiOrb } from '../lib/ascii.js';
import './Goals.css';

const GOALS = [
  <>
    Expand the <em>reach of partner companies</em> and strengthen the ecosystem.
  </>,
  <>
    Encourage <em>real, high-potential solutions</em> built with AI agents.
  </>,
  <>
    Create opportunities for <em>networking, recruiting and talent development</em>.
  </>,
  <>
    Bring <em>Northeast talent</em> closer to companies and initiatives across Brazil.
  </>,
];

const ORB = asciiOrb(84, 40);

export default function Goals() {
  return (
    <section id="goals" className="section section--deep goals" aria-labelledby="goals-title">
      <pre className="ascii-bg goals__orb" aria-hidden="true">
        {ORB}
      </pre>

      <div className="container">
        <div className="section-head">
          <p className="eyebrow" data-reveal>
            04 / Objectives
          </p>
          <h2 id="goals-title" className="goals__title" data-reveal style={{ '--d': '80ms' }}>
            <span aria-hidden="true">&gt;</span>Objectives<span aria-hidden="true">&lt;</span>
          </h2>
        </div>

        <ol className="goals__list">
          {GOALS.map((g, i) => (
            <li key={i} className="goals__item" data-reveal style={{ '--d': `${i * 90}ms` }}>
              <span className="goals__num">0{i + 1}</span>
              <p className="goals__text">{g}</p>
              <span className="goals__chev" aria-hidden="true">
                &gt;
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
