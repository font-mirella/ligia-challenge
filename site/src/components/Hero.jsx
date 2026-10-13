import { EVENT } from '../config.js';
import AsciiTorus from './AsciiTorus.jsx';
import BinaryRain from './BinaryRain.jsx';
import Countdown from './Countdown.jsx';
import Icon from './Icon.jsx';
import ScrambleText from './ScrambleText.jsx';
import { Logo, ORGANIZERS, SUPPORTERS } from './Logos.jsx';
import './Hero.css';

export default function Hero() {
  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__grid" />
        <BinaryRain className="hero__rain" />
      </div>
      <AsciiTorus className="hero__torus" />

      <div className="container hero__inner">
        <p className="hero__badge rise" style={{ '--i': 0 }}>
          <span className="hero__dot" /> Inscrições abertas · {EVENT.builders}&nbsp;builders
        </p>

        <h1 id="hero-title" className="hero__title">
          <ScrambleText text="Converge" className="hero__line rise" delay={250} translate="no" />
          <ScrambleText text="Challenge" className="hero__line rise" delay={420} translate="no" />
        </h1>

        <p className="hero__sub rise" style={{ '--i': 3 }}>
          o hackathon de <em>AI Agents</em> do Nordeste.
        </p>

        <p className="hero__copy rise" style={{ '--i': 4 }}>
          Dois dias, {EVENT.builders}&nbsp;builders selecionados e uma missão: criar AI agents que fazem trabalho de
          verdade. Organizado por Ligia, TAIL e Canastra Ventures.
        </p>

        <ul className="hero__meta rise" style={{ '--i': 5 }}>
          <li>
            <Icon name="calendar" size={18} /> {EVENT.dates}
          </li>
          <li>
            <Icon name="clock" size={18} /> {EVENT.hours}
          </li>
          <li>
            <Icon name="pin" size={18} /> {EVENT.venue} · {EVENT.city}
          </li>
        </ul>

        <div className="hero__ctas rise" style={{ '--i': 6 }}>
          <a href="#register" className="btn">
            Inscreva-se <Icon name="arrow" size={18} className="arrow" />
          </a>
          <a href="#sponsor" className="btn btn--ghost">
            Seja patrocinador
          </a>
        </div>

        <div className="hero__countdown rise" style={{ '--i': 7 }}>
          <Countdown />
        </div>
      </div>

      <div className="container hero__logos rise" style={{ '--i': 8 }}>
        <div className="hero__logo-group">
          <span className="hero__logo-label">Organizado por</span>
          {ORGANIZERS.map((o) => (
            <Logo key={o.id} logo={o} className="logo--mono" />
          ))}
        </div>
        <div className="hero__logo-group">
          <span className="hero__logo-label">Apoiado por</span>
          {SUPPORTERS.map((s) => (
            <Logo key={s.id} logo={s} className="logo--mono" />
          ))}
        </div>
      </div>

      <a href="#about" className="hero__scroll" aria-label="Rolar para Sobre">
        <span>Role</span>
        <i />
      </a>
    </section>
  );
}
