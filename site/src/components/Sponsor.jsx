import { CONTACT, SPONSOR_MAILTO } from '../config.js';
import { asciiStripes } from '../lib/ascii.js';
import Icon from './Icon.jsx';
import './Sponsor.css';

const TIERS = [
  {
    name: 'Bronze',
    intro: null,
    perks: [
      <>
        Your brand in <u>all event communications</u>
      </>,
      <>
        Access to the <u>applicant and participant base</u>
      </>,
      <>
        <u>Physical presence</u> during the event
      </>,
    ],
  },
  {
    name: 'Silver',
    intro: 'Everything in Bronze, plus:',
    perks: [
      <>
        Influence on the hackathon's <u>motivating problems</u>, within the <u>AI Agents</u> scope
      </>,
      <>
        A seat as <u>mentor</u> and <u>judge</u>
      </>,
    ],
  },
];

const WHY = [
  ['Brand reach', 'Put your company in front of the Northeast’s AI community.'],
  ['Talent access', 'Meet and recruit builders while they ship real agents.'],
  ['Shape the problem', 'Bring the operational challenges you want solved.'],
];

const STRIPES = asciiStripes(96, 30);

export default function Sponsor() {
  return (
    <section id="sponsor" className="section sponsor" aria-labelledby="sponsor-title">
      <pre className="ascii-bg sponsor__ascii" aria-hidden="true">
        {STRIPES}
      </pre>

      <div className="container sponsor__inner">
        <div className="sponsor__intro">
          <p className="eyebrow sponsor__eyebrow" data-reveal>
            07 / Sponsorship
          </p>
          <h2 id="sponsor-title" className="title" data-reveal style={{ '--d': '80ms' }}>
            Put your brand where <em>AI agents</em> get built.
          </h2>
          <p className="lede" data-reveal style={{ '--d': '160ms' }}>
            Partner with Converge Challenge to grow your company's visibility, strengthen the ecosystem and meet the
            people building the next generation of agentic software.
          </p>

          <ul className="sponsor__why" role="list">
            {WHY.map(([title, text], i) => (
              <li key={title} data-reveal style={{ '--d': `${200 + i * 80}ms` }}>
                <strong>{title}</strong>
                <span>{text}</span>
              </li>
            ))}
          </ul>

          <div className="sponsor__cta" data-reveal>
            <a href={SPONSOR_MAILTO} className="btn btn--navy">
              Talk to us <Icon name="arrow" size={18} className="arrow" />
            </a>
            <a href={SPONSOR_MAILTO} className="sponsor__mail">
              {CONTACT.email}
            </a>
          </div>
        </div>

        <div className="sponsor__tiers">
          {TIERS.map((t, i) => (
            <article key={t.name} className="sponsor__tier spotlight" data-reveal style={{ '--d': `${i * 120}ms` }}>
              <header>
                <span className="sponsor__tier-label">Tier</span>
                <h3>{t.name}</h3>
              </header>
              {t.intro && <p className="sponsor__tier-intro">{t.intro}</p>}
              <ul>
                {t.perks.map((p, k) => (
                  <li key={k}>
                    <Icon name="plus" size={16} stroke={2.2} />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
