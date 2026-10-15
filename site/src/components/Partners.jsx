import { Logo, ORGANIZERS, PARTNERS, POWERED_BY, SUPPORTERS } from './Logos.jsx';
import Icon from './Icon.jsx';
import './Partners.css';

// The naming-rights partner gets its own row: logo, what it does and a link out.
function FeaturedRow({ label, logo }) {
  return (
    <div className="partners__row partners__row--featured" data-reveal>
      <span className="partners__label">{label}</span>
      <a href={logo.url} target="_blank" rel="noreferrer" className="partners__featured-logo" aria-label={`${logo.name} (abre em nova aba)`}>
        <Logo logo={logo} alt="" />
      </a>
      <div className="partners__featured-body">
        <p>{logo.blurb}</p>
        <a
          href={logo.url}
          target="_blank"
          rel="noreferrer"
          className="text-link partners__featured-link"
          aria-label={`Visitar site da ${logo.name} (abre em nova aba)`}
        >
          Visitar site <Icon name="arrowUpRight" size={15} />
        </a>
      </div>
    </div>
  );
}

function LogoRow({ label, logos, className = '', children }) {
  return (
    <div className={`partners__row ${className}`} data-reveal>
      <span className="partners__label">{label}</span>
      <div className="partners__row-logos">
        {logos.map((l) => (
          <Logo key={l.id} logo={l} />
        ))}
      </div>
      {children}
    </div>
  );
}

export default function Partners() {
  return (
    <section id="partners" className="section partners" aria-labelledby="partners-title">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow" data-reveal>
            06 / Parceiros
          </p>
          <h2 id="partners-title" className="title" data-reveal style={{ '--d': '80ms' }}>
            Quem está <em>conosco</em>.
          </h2>
        </div>

        <FeaturedRow label="Powered by" logo={POWERED_BY} />

        <ul className="partners__orgs" role="list">
          {ORGANIZERS.map((o, i) => (
            <li key={o.id} className="partners__org spotlight" data-reveal style={{ '--d': `${i * 100}ms` }}>
              <span className="partners__role">Organizador</span>
              <a href={o.url} target="_blank" rel="noreferrer" className="partners__logo" aria-label={`${o.name} (abre em nova aba)`}>
                <Logo logo={o} alt="" />
              </a>
              <p>{o.blurb}</p>
            </li>
          ))}
        </ul>

        <LogoRow label="Parceiros" logos={PARTNERS} />

        <LogoRow label="Apoiadores" logos={SUPPORTERS}>
          <span className="partners__more">+ mais a anunciar</span>
        </LogoRow>
      </div>
    </section>
  );
}
