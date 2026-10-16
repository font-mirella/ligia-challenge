import { CONTACT, SPONSOR_MAILTO } from '../config.js';
import Icon from './Icon.jsx';
import './Sponsor.css';

const TIERS = [
  {
    name: 'Bronze',
    intro: null,
    perks: [
      <>
        Sua marca em <u>todas as comunicações do evento</u>
      </>,
      <>
        Acesso à <u>base de inscritos e participantes</u>
      </>,
      <>
        <u>Presença física</u> durante o evento
      </>,
    ],
  },
  {
    name: 'Prata',
    intro: 'Tudo do Bronze, mais:',
    perks: [
      <>
        Influência nos <u>problemas motivadores</u> do hackathon, dentro do escopo de <u>AI Agents</u>
      </>,
      <>
        Uma cadeira como <u>mentor</u> e <u>jurado</u>
      </>,
    ],
  },
];

const WHY = [
  ['Alcance de marca', 'Coloque sua empresa diante da comunidade de IA do Nordeste.'],
  ['Acesso a talentos', 'Conheça e recrute builders enquanto eles criam agents reais.'],
  ['Defina o problema', 'Traga os desafios operacionais que você quer ver resolvidos.'],
];

export default function Sponsor() {
  return (
    <section id="sponsor" className="section sponsor" aria-labelledby="sponsor-title">
      <div className="container sponsor__inner">
        <div className="sponsor__intro">
          <p className="eyebrow sponsor__eyebrow" data-reveal>
            11 / Patrocínio
          </p>
          <h2 id="sponsor-title" className="title" data-reveal style={{ '--d': '80ms' }}>
            Coloque sua marca onde <em>AI agents</em> são construídos.
          </h2>
          <p className="lede" data-reveal style={{ '--d': '160ms' }}>
            Seja parceiro do Converge Challenge para ampliar a visibilidade da sua empresa, fortalecer o ecossistema
            e conhecer quem está construindo a próxima geração de software agêntico.
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
              Fale conosco <Icon name="arrow" size={18} className="arrow" />
            </a>
            <a href={SPONSOR_MAILTO} className="sponsor__mail">
              {CONTACT.email}
            </a>
          </div>
        </div>

        <div className="sponsor__side">
          <div className="sponsor__tiers">
            {TIERS.map((t, i) => (
              <article key={t.name} className="sponsor__tier spotlight" data-reveal style={{ '--d': `${i * 120}ms` }}>
                <header>
                  <span className="sponsor__tier-label">Nível</span>
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

          <div className="sponsor__vision" data-reveal>
            <p className="sponsor__vision-tag">Esta é só a 1ª edição: em 2027, o Converge Challenge volta maior.</p>
            <p className="sponsor__vision-text">
              Queremos <em>construir uma marca</em> e levar este evento a outros polos da região, incentivando{' '}
              <em>talentos do Nordeste</em> a resolver problemas reais de grandes mercados.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
