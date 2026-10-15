// Event facts used across the site. Change them here, not in the components.

export const EVENT = {
  name: 'Converge Challenge',
  // Abertura e encerramento, horário de Recife (UTC-3, sem horário de verão).
  start: '2026-11-07T09:00:00-03:00',
  end: '2026-11-08T17:00:00-03:00',
  dates: '7 e 8 de novembro de 2026',
  hours: '09h às 17h',
  // Forma curta, para linhas de meta (Hero, Programação, Sobre).
  venue: 'Porto Digital (Cais do Apolo)',
  // Forma com endereço, onde há espaço (Inscrição, FAQ, rodapé).
  venueAddress: 'Porto Digital (Cais do Apolo, 222)',
  city: 'Recife, PE',
  // Número puro: o Hero renderiza "{builders} participantes".
  builders: '100',
  // Janela de inscrições no Luma (2026).
  applications: '17 a 30 de outubro',
  // A mesma janela em ISO, para os dados estruturados (JSON-LD) do <head>.
  applicationsFrom: '2026-10-17',
  applicationsTo: '2026-10-30',
};

// Endereço público do site. Também aparece em index.html (canonical, og:url)
// e em public/robots.txt e public/sitemap.xml.
export const SITE_URL = 'https://convergechallenge.cin.ufpe.br/';

export const LUMA = {
  embedUrl: 'https://luma.com/embed/event/evt-0iC8L7HVv5dNidF/simple',
  eventUrl: 'https://luma.com/gfou18h1',
};

export const CONTACT = {
  email: 'ligia@cin.ufpe.br',
  instagram: { handle: '@ligia.ufpe', url: 'https://www.instagram.com/ligia.ufpe/' },
};

export const SPONSOR_MAILTO =
  `mailto:${CONTACT.email}?subject=${encodeURIComponent('Converge Challenge — Patrocínio')}`;

export const NAV_LINKS = [
  { id: 'about', label: 'Sobre' },
  { id: 'challenge', label: 'Desafio' },
  { id: 'schedule', label: 'Programação' },
  { id: 'partners', label: 'Parceiros' },
  { id: 'sponsor', label: 'Patrocínio' },
  { id: 'faq', label: 'FAQ' },
];
