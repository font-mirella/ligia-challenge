import { useState } from 'react';
import { CONTACT, EVENT } from '../config.js';
import Icon from './Icon.jsx';
import './Faq.css';

const QUESTIONS = [
  {
    q: 'Quem pode se inscrever?',
    a: 'Estudantes de TI (graduação e pós), desenvolvedores e builders, designers e fundadores que querem construir com AI agents. O evento reúne talentos de Recife e João Pessoa.',
  },
  {
    q: 'Quando e onde acontece?',
    a: `Presencial no ${EVENT.venue}, ${EVENT.city}, nos dias ${EVENT.dates}, das ${EVENT.hours} nos dois dias.`,
  },
  {
    q: 'Como funciona a seleção?',
    a: `Inscreva-se pelo formulário no Luma. Os participantes são selecionados com antecedência: ${EVENT.builders} builders vão participar.`,
  },
  {
    q: 'O que vamos construir?',
    a: 'Soluções agênticas, não chatbots ou ferramentas estáticas. Pense em agentes conectados a processos reais como recrutamento, back-office, suporte ao cliente ou vendas, que tornam operações eficientes.',
  },
  {
    q: 'O que os participantes ganham?',
    a: 'Mentoria de profissionais do mercado, networking com participantes e parceiros, infraestrutura para construir seu projeto, um Demo Day ao vivo diante de um júri e prêmios para os melhores projetos.',
  },
  {
    q: 'Quero patrocinar, mentorar ou ser parceiro. Com quem falo?',
    a: (
      <>
        Escreva para{' '}
        <a href={`mailto:${CONTACT.email}`} className="faq__link">
          {CONTACT.email}
        </a>{' '}
        e retornamos com as opções de patrocínio.
      </>
    ),
  },
];

export default function Faq() {
  // Deep-linkable: ?faq=2 opens the third question on load.
  const [open, setOpen] = useState(() => {
    const n = Number(new URLSearchParams(window.location.search).get('faq'));
    return Number.isInteger(n) && n >= 0 && n < QUESTIONS.length ? n : 0;
  });

  const sync = (i) => {
    setOpen(i);
    const url = new URL(window.location.href);
    if (i < 0) url.searchParams.delete('faq');
    else url.searchParams.set('faq', String(i));
    window.history.replaceState(null, '', url);
  };

  return (
    <section id="faq" className="section faq" aria-labelledby="faq-title">
      <div className="container faq__grid">
        <div className="section-head faq__head">
          <p className="eyebrow" data-reveal>
            08 / FAQ
          </p>
          <h2 id="faq-title" className="title" data-reveal style={{ '--d': '80ms' }}>
            Perguntas, <em>respondidas</em>.
          </h2>
          <p className="lede" data-reveal style={{ '--d': '160ms' }}>
            Mais alguma dúvida? Fale com a gente em <a href={`mailto:${CONTACT.email}`} className="faq__link">{CONTACT.email}</a>.
          </p>
        </div>

        <div className="faq__list">
          {QUESTIONS.map(({ q, a }, i) => {
            const isOpen = open === i;
            return (
              // data-reveal lives on the static inner wrapper: the outer div's
              // className is rewritten by React on every toggle, which would
              // wipe the observer-added .is-in class and hide the item.
              <div key={q} className={`faq__item ${isOpen ? 'is-open' : ''}`}>
                <div data-reveal style={{ '--d': `${i * 60}ms` }}>
                  <h3>
                    <button
                      type="button"
                      id={`faq-q-${i}`}
                      aria-expanded={isOpen}
                      aria-controls={`faq-a-${i}`}
                      onClick={() => sync(isOpen ? -1 : i)}
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
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
