import { EVENT, LUMA } from '../config.js';
import { asciiOrb } from '../lib/ascii.js';
import Icon from './Icon.jsx';
import ScrambleText from './ScrambleText.jsx';
import './Register.css';

const ORB = asciiOrb(110, 52);

export default function Register() {
  return (
    <section id="register" className="section register" aria-labelledby="register-title">
      <pre className="ascii-bg register__orb" aria-hidden="true">
        {ORB}
      </pre>

      <div className="container register__grid">
        <div className="register__text">
          <p className="eyebrow" data-reveal>
            09 / Register
          </p>
          <h2 id="register-title" className="register__title" data-reveal style={{ '--d': '80ms' }}>
            Ready to <em>converge</em>?
          </h2>
          <p className="lede" data-reveal style={{ '--d': '160ms' }}>
            Applications are open on Luma. <strong>{EVENT.builders} builders</strong> will be selected to spend two
            days building AI agents that do real work.
          </p>

          <ul className="register__facts" data-reveal style={{ '--d': '220ms' }}>
            <li>
              <Icon name="calendar" size={20} />
              <span>
                <small>When</small>
                {EVENT.dates}, {EVENT.hours}
              </span>
            </li>
            <li>
              <Icon name="pin" size={20} />
              <span>
                <small>Where</small>
                {EVENT.venue} · {EVENT.city}
              </span>
            </li>
            <li>
              <Icon name="users" size={20} />
              <span>
                <small>Who</small>
                Selection-based · limited spots
              </span>
            </li>
          </ul>

          <a href={LUMA.eventUrl} target="_blank" rel="noreferrer" className="text-link" data-reveal>
            Open the event on Luma <Icon name="arrowUpRight" size={16} />
          </a>
        </div>

        <div className="register__embed" data-reveal="scale" style={{ '--d': '120ms' }}>
          <div className="register__window">
            <div className="register__bar" aria-hidden="true">
              <span className="term__dots">
                <i />
                <i />
                <i />
              </span>
              <ScrambleText text="luma.com/converge-challenge" className="register__url" />
            </div>
            <iframe
              src={LUMA.embedUrl}
              title="Converge Challenge registration on Luma"
              width="600"
              height="800"
              loading="lazy"
              allow="fullscreen; payment"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
