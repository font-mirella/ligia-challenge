import { CONTACT, EVENT, LUMA, NAV_LINKS } from '../config.js';
import wordmark from '../assets/logos/converge-wordmark.svg';
import Icon from './Icon.jsx';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <img src={wordmark} alt="Converge Challenge" width="696" height="191" loading="lazy" />
            <p>
              The AI Agents hackathon of the Northeast. {EVENT.dates} · {EVENT.venue}, {EVENT.city}.
            </p>
          </div>

          <nav className="footer__col" aria-label="Footer">
            <h2>Navigate</h2>
            {NAV_LINKS.map(({ id, label }) => (
              <a key={id} href={`#${id}`}>
                {label}
              </a>
            ))}
          </nav>

          <div className="footer__col">
            <h2>Contact</h2>
            <a href={`mailto:${CONTACT.email}`}>
              <Icon name="mail" size={16} /> {CONTACT.email}
            </a>
            <a href={CONTACT.instagram.url} target="_blank" rel="noreferrer">
              <Icon name="instagram" size={16} /> {CONTACT.instagram.handle}
            </a>
          </div>

          <div className="footer__col">
            <h2>Register</h2>
            <a href={LUMA.eventUrl} target="_blank" rel="noreferrer">
              Apply on Luma <Icon name="arrowUpRight" size={16} />
            </a>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© 2026 Converge Challenge · Ligia (CIn-UFPE), TAIL (UFPB) &amp; Canastra Ventures.</p>
          <a href="#top" className="footer__top-link">
            Back to top <Icon name="arrowDown" size={14} style={{ transform: 'rotate(180deg)' }} />
          </a>
        </div>
      </div>

      <p className="footer__giant" aria-hidden="true">
        CONVERGE
      </p>
    </footer>
  );
}
