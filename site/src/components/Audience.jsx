import Icon from './Icon.jsx';
import './Audience.css';

const PROFILES = [
  {
    icon: 'grad',
    title: 'Tech students',
    text: 'Undergrad and grad students in Computer Science, Software Engineering and related fields.',
  },
  {
    icon: 'code',
    title: 'Devs & builders',
    text: 'Professionals and enthusiasts who already build AI agents, tools or side projects and want to go further.',
  },
  {
    icon: 'rocket',
    title: 'Founders & startups',
    text: 'Founders and early-stage teams exploring AI agents as a core part of their product or operations.',
  },
];

const PERKS = [
  'Mentorship from industry professionals',
  'Networking with participants and partners',
  'Infrastructure to build your project',
  'A stage to present your solution live',
  'Evaluation by a panel of judges',
  'Awards for the top projects',
];

export default function Audience() {
  return (
    <section id="who" className="section audience" aria-labelledby="who-title">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow" data-reveal>
            03 / Who it's for
          </p>
          <h2 id="who-title" className="title" data-reveal style={{ '--d': '80ms' }}>
            Made for <em>builders</em>.
          </h2>
          <p className="lede" data-reveal style={{ '--d': '160ms' }}>
            Talent from <strong>Recife</strong> and <strong>João Pessoa</strong> who want to spend a weekend shipping
            AI agents with people who build like they do. Participants are selected from the applications.
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
            What you <em className="serif">get</em>
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
