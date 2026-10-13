import ligia from '../assets/logos/ligia.svg';
import tail from '../assets/logos/tail.svg';
import canastra from '../assets/logos/canastra.svg';
import aws from '../assets/logos/aws.svg';
import render from '../assets/logos/render.svg';
import featherless from '../assets/logos/featherless.svg';
import './Logos.css';

export const ORGANIZERS = [
  {
    id: 'ligia',
    name: 'Ligia',
    src: ligia,
    width: 384,
    height: 127,
    url: 'https://www.instagram.com/ligia.ufpe/',
    blurb: (
      <>
        The Artificial Intelligence academic league at <strong>CIn-UFPE</strong>, made up of students and
        researchers focused on <strong>AI and its applications to real-world problems</strong>.
      </>
    ),
  },
  {
    id: 'tail',
    name: 'TAIL',
    src: tail,
    width: 398,
    height: 260,
    url: 'https://tail-tech.com/',
    blurb: (
      <>
        A league of <strong>UFPB</strong> students and professors dedicated to{' '}
        <strong>AI research and education</strong>, from undergrad all the way to PhD.
      </>
    ),
  },
  {
    id: 'canastra',
    name: 'Canastra Ventures',
    src: canastra,
    width: 685,
    height: 200,
    url: 'https://www.canastra.ventures/',
    blurb: (
      <>
        An <strong>AI-focused venture capital fund</strong> backing Brazilian founders from day zero with capital,
        a residency program and a direct line to the <strong>Silicon Valley</strong> ecosystem.
      </>
    ),
  },
];

export const SUPPORTERS = [
  { id: 'featherless', name: 'Featherless', src: featherless, width: 200, height: 200, label: true },
  { id: 'aws', name: 'AWS', src: aws, width: 304, height: 182 },
  { id: 'render', name: 'Render', src: render, width: 24, height: 24, label: true },
];

// One logo, optionally followed by its name for icon-only marks.
export function Logo({ logo, className = '' }) {
  return (
    <span className={`logo logo--${logo.id} ${className}`}>
      <img src={logo.src} alt={logo.label ? '' : logo.name} width={logo.width} height={logo.height} loading="lazy" />
      {logo.label && <span className="logo__name">{logo.name}</span>}
    </span>
  );
}
