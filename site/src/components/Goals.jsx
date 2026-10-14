import './Goals.css';

const GOALS = [
  <>
    Ampliar o <em>alcance das empresas parceiras</em> e fortalecer o ecossistema.
  </>,
  <>
    Incentivar <em>soluções reais de alto potencial</em> construídas com AI agents.
  </>,
  <>
    Criar oportunidades de <em>networking, recrutamento e formação de talentos</em>.
  </>,
  <>
    Aproximar <em>talentos do Nordeste</em> de empresas e iniciativas de todo o Brasil.
  </>,
];

export default function Goals() {
  return (
    <section id="goals" className="section section--deep goals" aria-labelledby="goals-title">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow" data-reveal>
            04 / Objetivos
          </p>
          <h2 id="goals-title" className="title" data-reveal style={{ '--d': '80ms' }}>
            Nossos <em>objetivos</em>.
          </h2>
        </div>

        <ol className="goals__list">
          {GOALS.map((g, i) => (
            <li key={i} className="goals__item" data-reveal style={{ '--d': `${i * 90}ms` }}>
              <span className="goals__num">0{i + 1}</span>
              <p className="goals__text">{g}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
