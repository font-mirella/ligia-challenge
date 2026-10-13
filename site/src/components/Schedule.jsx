import { useEffect, useRef } from 'react';
import { EVENT } from '../config.js';
import './Schedule.css';

// Programação preliminar: a jornada de um dia do deck, distribuída em dois dias.
const DAYS = [
  {
    weekday: 'Sáb',
    day: '07',
    month: 'novembro de 2026',
    theme: 'Abertura & construção',
    items: [
      ['08:30', 'Abertura das portas & check-in', 'Credenciamento e entrega de crachás para todos os participantes.'],
      ['09:00', 'Abertura & briefing do desafio', 'Apresentação final do desafio e das regras do hackathon.'],
      ['10:00', 'Início do hacking', 'Os times começam oficialmente a construir seus projetos.'],
      ['13:00', 'Almoço & networking', 'Pausa para almoço e networking com participantes e parceiros.'],
      ['14:00', 'Rodadas de mentoria', 'Mentores ajudam os times a desenvolver e refinar suas soluções.'],
      ['17:00', 'Fim do primeiro dia', 'Portas fecham. Descanse, amanhã tem mais construção.'],
    ],
  },
  {
    weekday: 'Dom',
    day: '08',
    month: 'novembro de 2026',
    theme: 'Finalizar & Demo Day',
    items: [
      ['09:00', 'Retomada do hacking', 'De volta à construção para a reta final.'],
      ['13:00', 'Almoço & networking', 'Recarregue as energias e conheça os parceiros antes das demos.'],
      ['14:00', 'Rodada final de mentoria', 'Último feedback dos mentores antes de apresentar.'],
      ['16:00', 'Demo Day', 'Os times apresentam ao vivo o que construíram para o júri.'],
      ['17:00', 'Premiação & encerramento', 'Anúncio dos vencedores e encerramento oficial do evento.'],
    ],
  },
];

export default function Schedule() {
  const listRef = useRef(null);

  // Fill each day's timeline rail as the reader scrolls past it.
  useEffect(() => {
    const rails = [...(listRef.current?.querySelectorAll('.schedule__items') ?? [])];
    let raf = 0;
    const update = () => {
      raf = 0;
      const mid = window.innerHeight * 0.6;
      for (const rail of rails) {
        const r = rail.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (mid - r.top) / r.height));
        rail.style.setProperty('--fill', p.toFixed(3));
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section id="schedule" className="section section--paper schedule" aria-labelledby="schedule-title">
      <div className="container">
        <div className="section-head schedule__head">
          <p className="eyebrow" data-reveal>
            05 / Programação
          </p>
          <h2 id="schedule-title" className="title" data-reveal style={{ '--d': '80ms' }}>
            Dois dias para <em>criar</em>.
          </h2>
          <p className="schedule__note" data-reveal style={{ '--d': '160ms' }}>
            Programação preliminar, sujeita a alterações · {EVENT.venue}, {EVENT.city}
          </p>
        </div>

        <div className="schedule__days" ref={listRef}>
          {DAYS.map((d, di) => (
            <article className="schedule__day" key={d.day} data-reveal style={{ '--d': `${di * 120}ms` }}>
              <header className="schedule__date">
                <span className="schedule__weekday">{d.weekday}</span>
                <span className="schedule__num">{d.day}</span>
                <span className="schedule__month">
                  {d.month}
                  <small>{d.theme}</small>
                </span>
              </header>

              <ol className="schedule__items">
                {d.items.map(([time, title, text]) => (
                  <li key={time + title} className="schedule__item">
                    <time>{time}</time>
                    <div>
                      <h3>{title}</h3>
                      <p>{text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
