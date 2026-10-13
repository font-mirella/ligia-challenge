import { useCallback, useRef, useState } from 'react';
import useInView from '../hooks/useInView.js';
import Terminal from './Terminal.jsx';
import './Challenge.css';

// Example problem spaces from the deck. The terminal logs are illustrative.
const AGENTS = [
  {
    id: 'recruiting',
    title: 'Recruiting pipeline',
    text: 'An agent that screens candidates and handles follow-ups automatically.',
    lines: [
      { kind: 'cmd', text: 'converge run agent/recruiting' },
      { kind: 'plan', text: 'screen 214 applicants for "Backend Engineer"' },
      { kind: 'tool', text: 'ats.fetch(status="new")          214 ok' },
      { kind: 'exec', text: 'score resumes against rubric      38 shortlisted' },
      { kind: 'tool', text: 'calendar.propose(slots=3)        sent' },
      { kind: 'loop', text: 'follow up with 6 silent candidates' },
      { kind: 'done', text: 'pipeline updated · 0 humans paged' },
    ],
  },
  {
    id: 'backoffice',
    title: 'Back-office agent',
    text: 'Takes care of invoicing and compliance processes from end to end.',
    lines: [
      { kind: 'cmd', text: 'converge run agent/back-office' },
      { kind: 'plan', text: 'reconcile October invoices' },
      { kind: 'tool', text: 'erp.invoices(month=10)           482 ok' },
      { kind: 'exec', text: 'match payments ↔ invoices        471 matched' },
      { kind: 'check', text: 'compliance rules (tax, retention) passed' },
      { kind: 'loop', text: 'flag 11 mismatches for review' },
      { kind: 'done', text: 'books closed · report filed' },
    ],
  },
  {
    id: 'support',
    title: 'Support system',
    text: 'Agents that resolve customer support tickets autonomously.',
    lines: [
      { kind: 'cmd', text: 'converge run agent/support' },
      { kind: 'plan', text: 'triage 128 open tickets' },
      { kind: 'exec', text: 'classify → route → draft reply' },
      { kind: 'tool', text: 'kb.search("refund policy")       4 hits' },
      { kind: 'tool', text: 'helpdesk.close(ticket=4821)      resolved' },
      { kind: 'loop', text: 'retry 3 low-confidence answers' },
      { kind: 'done', text: '125/128 resolved autonomously' },
    ],
  },
  {
    id: 'sales',
    title: 'Sales agent',
    text: 'Researches prospects, organizes what it finds and keeps the CRM up to date.',
    lines: [
      { kind: 'cmd', text: 'converge run agent/sales' },
      { kind: 'plan', text: 'find 50 fintech prospects in the Northeast' },
      { kind: 'tool', text: 'web.search + enrich(company, role) 50 ok' },
      { kind: 'exec', text: 'score fit · draft personal intros' },
      { kind: 'tool', text: 'crm.upsert(leads=50)             synced' },
      { kind: 'loop', text: 'schedule follow-ups for next week' },
      { kind: 'done', text: 'pipeline +50 qualified leads' },
    ],
  },
];

export default function Challenge() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const termRef = useRef(null);
  const inView = useInView(termRef, { threshold: 0.35 });

  const next = useCallback(() => {
    if (auto) setActive((i) => (i + 1) % AGENTS.length);
  }, [auto]);

  const agent = AGENTS[active];

  return (
    <section id="challenge" className="section section--paper challenge" aria-labelledby="challenge-title">
      <div className="container">
        <div className="challenge__head">
          <p className="eyebrow" data-reveal>
            02 / The Challenge
          </p>
          <h2 id="challenge-title" className="challenge__title" data-reveal style={{ '--d': '80ms' }}>
            <span className="challenge__kicker">The challenge:</span>
            Build something <em>REAL</em>
          </h2>
          <p className="lede" data-reveal style={{ '--d': '160ms' }}>
            We're not looking for another chatbot or a static tool. We want <strong>agentic solutions</strong> that
            plug into real processes and make operations <strong>efficient</strong>. AI agents don't just answer
            prompts: they <strong>plan, execute and iterate</strong> on their own.
          </p>
        </div>

        <div className="challenge__grid">
          <div className="challenge__term" ref={termRef} data-reveal="scale">
            <Terminal title={`~/converge/${agent.id}`} lines={agent.lines} play={inView} onDone={next} />
          </div>

          <ul className="challenge__cards" role="list">
            {AGENTS.map((a, i) => (
              <li key={a.id} data-reveal style={{ '--d': `${i * 90}ms` }}>
                <button
                  type="button"
                  className={`challenge__card spotlight ${i === active ? 'is-active' : ''}`}
                  aria-pressed={i === active}
                  onClick={() => {
                    setActive(i);
                    setAuto(false);
                  }}
                >
                  <span className="challenge__num">0{i + 1}</span>
                  <span className="challenge__card-title">{a.title}</span>
                  <span className="challenge__card-text">{a.text}</span>
                  <span className="challenge__code">agent/{a.id}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <a href="#sponsor" className="challenge__note" data-reveal>
          <svg viewBox="0 0 64 48" aria-hidden="true">
            <path d="M6 2c-4 22 8 38 50 36" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M47 30l10 8-11 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Sponsors can contribute directly to the problems that drive the challenge.
        </a>
      </div>
    </section>
  );
}
