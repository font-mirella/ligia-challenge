import { useState } from 'react';
import { CONTACT, EVENT } from '../config.js';
import Icon from './Icon.jsx';
import './Faq.css';

const QUESTIONS = [
  {
    q: 'Who can apply?',
    a: 'Tech students (undergrad and grad), developers and builders, designers and founders who want to build with AI agents. The event brings together talent from Recife and João Pessoa.',
  },
  {
    q: 'When and where is it?',
    a: `In person at ${EVENT.venue}, ${EVENT.city}, on ${EVENT.dates}, from ${EVENT.hours} on both days.`,
  },
  {
    q: 'How does selection work?',
    a: `Apply through the registration form on Luma. Participants are selected in advance: ${EVENT.builders} builders will take part.`,
  },
  {
    q: 'What are we going to build?',
    a: 'Agentic solutions, not chatbots or static tools. Think agents that plug into real processes such as recruiting, back-office, customer support or sales, and make operations efficient.',
  },
  {
    q: 'What do participants get?',
    a: 'Mentorship from industry professionals, networking with participants and partners, infrastructure to build your project, a live Demo Day in front of a panel of judges, and awards for the top projects.',
  },
  {
    q: 'I want to sponsor, mentor or partner. Who do I talk to?',
    a: (
      <>
        Write to{' '}
        <a href={`mailto:${CONTACT.email}`} className="faq__link">
          {CONTACT.email}
        </a>{' '}
        and we'll get back to you with the sponsorship options.
      </>
    ),
  },
];

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="section faq" aria-labelledby="faq-title">
      <div className="container faq__grid">
        <div className="section-head faq__head">
          <p className="eyebrow" data-reveal>
            08 / FAQ
          </p>
          <h2 id="faq-title" className="title" data-reveal style={{ '--d': '80ms' }}>
            Questions, <em>answered</em>.
          </h2>
          <p className="lede" data-reveal style={{ '--d': '160ms' }}>
            Anything else? Reach us at <a href={`mailto:${CONTACT.email}`} className="faq__link">{CONTACT.email}</a>.
          </p>
        </div>

        <div className="faq__list">
          {QUESTIONS.map(({ q, a }, i) => {
            const isOpen = open === i;
            return (
              <div key={q} className={`faq__item ${isOpen ? 'is-open' : ''}`} data-reveal style={{ '--d': `${i * 60}ms` }}>
                <h3>
                  <button
                    type="button"
                    id={`faq-q-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    <span className="faq__num">0{i + 1}</span>
                    <span className="faq__q">{q}</span>
                    <span className="faq__icon">
                      <Icon name="plus" size={18} stroke={2} />
                    </span>
                  </button>
                </h3>
                <div className="faq__panel" id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`}>
                  <div>
                    <p>{a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
