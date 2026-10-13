import { useRef } from 'react';
import useInView from '../hooks/useInView.js';
import { EVENT } from '../config.js';
import BinaryRain from './BinaryRain.jsx';
import CountUp from './CountUp.jsx';
import ScrambleText from './ScrambleText.jsx';
import './About.css';

const STATS = [
  { value: EVENT.builders, label: 'Builders selected' },
  { value: '8–16h', label: 'Of intensive hacking' },
  { value: '2', label: `Days at ${EVENT.venue}` },
  { value: '1', label: 'Demo Day with live pitches' },
];

export default function About() {
  const wordsRef = useRef(null);
  const wordsIn = useInView(wordsRef, { threshold: 0.4 });

  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <BinaryRain className="about__rain" gap={46} density={0.35} speed={0.7} />

      <div className="container">
        <div className="about__grid">
          <div className="about__text">
            <p className="eyebrow" data-reveal>
              01 / About
            </p>
            <h2 id="about-title" className="title" data-reveal style={{ '--d': '80ms' }}>
              Building the <em>AI Agents ecosystem</em> of the Northeast.
            </h2>
            <p className="lede" data-reveal style={{ '--d': '160ms' }}>
              <strong>Converge Challenge</strong> is an in-person hackathon that brings together builders:{' '}
              <strong>AI talent, engineers, designers and founders</strong> creating real solutions with{' '}
              <strong>AI Agents</strong>. It connects the academic and tech talent of <strong>Recife</strong> and{' '}
              <strong>João Pessoa</strong> to the national AI ecosystem.
            </p>
            <p className="about__mission" data-reveal style={{ '--d': '240ms' }}>
              We want to <span className="hl">build a brand</span> and take this event to other hubs across the
              region, encouraging <span className="hl">Northeast talent to solve real problems in large markets</span>
              .
            </p>
          </div>

          <div className="about__words" ref={wordsRef} data-reveal="left" style={{ '--d': '200ms' }}>
            {['Build.', 'Ship.', 'Converge.'].map((w, i) => (
              <ScrambleText key={w} text={w} as="span" play={wordsIn} delay={i * 220} className="about__word" />
            ))}
          </div>
        </div>

        <dl className="about__stats">
          {STATS.map((s, i) => (
            <div className="about__stat spotlight" key={s.label} data-reveal style={{ '--d': `${i * 90}ms` }}>
              <dt>{s.label}</dt>
              <dd>
                <CountUp value={s.value} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
