// Event facts used across the site. Change them here, not in the components.

export const EVENT = {
  name: 'Converge Challenge',
  // Kickoff and closing, Recife time (UTC-3, no daylight saving).
  start: '2026-11-07T09:00:00-03:00',
  end: '2026-11-08T17:00:00-03:00',
  dates: 'Nov 7–8, 2026',
  hours: '09:00 – 17:00',
  venue: 'Porto Digital',
  city: 'Recife, PE',
  builders: '70–100',
};

export const LUMA = {
  embedUrl: 'https://luma.com/embed/event/evt-0iC8L7HVv5dNidF/simple',
  eventUrl: 'https://luma.com/gfou18h1',
};

export const CONTACT = {
  email: 'ligia@cin.ufpe.br',
  instagram: { handle: '@ligia.ufpe', url: 'https://www.instagram.com/ligia.ufpe/' },
};

export const SPONSOR_MAILTO =
  `mailto:${CONTACT.email}?subject=${encodeURIComponent('Converge Challenge — Sponsorship')}`;

export const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'challenge', label: 'Challenge' },
  { id: 'schedule', label: 'Schedule' },
  { id: 'partners', label: 'Partners' },
  { id: 'sponsor', label: 'Sponsor' },
  { id: 'faq', label: 'FAQ' },
];
