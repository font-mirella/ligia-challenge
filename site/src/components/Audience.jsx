import Icon from './Icon.jsx';
import './Audience.css';

const PROFILES = [
  {
    icon: 'grad',
    title: 'Estudantes de TI',
    text: 'Graduandos e pós-graduandos em Ciência da Computação, Engenharia de Software e áreas afins.',
  },
  {
    icon: 'code',
    title: 'Devs & builders',
    text: 'Profissionais e entusiastas que já constroem AI agents, ferramentas ou side projects e querem ir além.',
  },
  {
    icon: 'rocket',
    title: 'Founders & startups',
    text: 'Fundadores e times early-stage que exploram AI agents como parte central do produto ou da operação.',
  },
];

const PERKS = [
  'Mentoria de profissionais do mercado',
  'Networking com participantes e parceiros',
  'Infraestrutura para construir seu projeto',
  'Palco para apresentar sua solução ao vivo',
  'Avaliação por um júri de especialistas',
  'Prêmios para os melhores projetos',
];

export default function Audience() {
  return (
    <section id="who" className="section audience" aria-labelledby="who-title">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow" data-reveal>
            03 / Para quem é
          </p>
          <h2 id="who-title" className="title" data-reveal style={{ '--d': '80ms' }}>
            Feito para <em>builders</em>.
          </h2>
          <p className="lede" data-reveal style={{ '--d': '160ms' }}>
            Talentos de <strong>Recife</strong> e <strong>João Pessoa</strong> que querem passar um fim de semana
            criando AI agents com quem constrói como eles. Os participantes são selecionados a partir das inscrições.
          </p>
        </div>

        <div className="audience__cards">
          {PROFILES.map((p, i) => (
            <article className="audience__card spotlight" key={p.title} data-reveal style={{ '--d': `${i * 100}ms` }}>
              <span className="audience__icon">
                <Icon name={p.icon} size={26} />
              </span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
              <span className="audience__index" aria-hidden="true">
                0{i + 1}
              </span>
            </article>
          ))}
        </div>

        <div className="audience__perks" data-reveal>
          <h3 className="audience__perks-title">
            O que você <em className="serif">ganha</em>
          </h3>
          <ul>
            {PERKS.map((perk) => (
              <li key={perk}>
                <Icon name="check" size={18} stroke={2.2} />
                {perk}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
