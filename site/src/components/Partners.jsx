import { Logo, ORGANIZERS, SUPPORTERS } from './Logos.jsx';
import './Partners.css';

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

        <ul className="partners__orgs" role="list">
          {ORGANIZERS.map((o, i) => (
            <li key={o.id} className="partners__org spotlight" data-reveal style={{ '--d': `${i * 100}ms` }}>
              <a href={o.url} target="_blank" rel="noreferrer" className="partners__logo" aria-label={`${o.name} (abre em nova aba)`}>
                <Logo logo={o} alt="" />
              </a>
              <p>{o.blurb}</p>
              <span className="partners__role">Organizador</span>
            </li>
          ))}
        </ul>

        <div className="partners__supporters" data-reveal>
          <span className="partners__label">Apoiadores</span>
          <div className="partners__supporter-logos">
            {SUPPORTERS.map((s) => (
              <Logo key={s.id} logo={s} />
            ))}
          </div>
          <span className="partners__more">+ mais a anunciar</span>
        </div>
      </div>
    </section>
  );
}
