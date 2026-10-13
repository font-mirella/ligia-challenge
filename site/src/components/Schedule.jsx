import { useEffect, useRef } from 'react';
import { EVENT } from '../config.js';
import './Schedule.css';

// Preliminary agenda: the deck's one-day run of show, spread over both days.
const DAYS = [
  {
    weekday: 'Sat',
    day: '07',
    month: 'November, 2026',
    theme: 'Kickoff & build',
    items: [
      ['08:30', 'Doors open & check-in', 'Registration and badge pickup for all participants.'],
      ['09:00', 'Opening & challenge briefing', 'Final presentation of the challenge and the hackathon rules.'],
      ['10:00', 'Hacking begins', 'Teams officially start building their projects.'],
      ['13:00', 'Lunch & networking', 'Break for lunch and networking with participants and partners.'],
      ['14:00', 'Mentorship rounds', 'Mentors help teams develop and sharpen their solutions.'],
      ['17:00', 'End of day one', 'Doors close. Rest up, there is more to ship tomorrow.'],
    ],
  },
  {
    weekday: 'Sun',
    day: '08',
    month: 'November, 2026',
    theme: 'Ship & Demo Day',
    items: [
      ['09:00', 'Hacking resumes', 'Back to building for the final stretch.'],
      ['13:00', 'Lunch & networking', 'Refuel and meet the partners before the demos.'],
      ['14:00', 'Final mentorship round', 'Last feedback from mentors before you present.'],
      ['16:00', 'Demo Day', 'Teams present what they built, live, to the judges.'],
      ['17:00', 'Awards & closing', 'Winners are announced and the event officially wraps up.'],
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
            05 / Schedule
          </p>
          <h2 id="schedule-title" className="title" data-reveal style={{ '--d': '80ms' }}>
            Two days to <em>ship</em>.
          </h2>
          <p className="schedule__note" data-reveal style={{ '--d': '160ms' }}>
            Preliminary schedule, subject to change · {EVENT.venue}, {EVENT.city}
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
