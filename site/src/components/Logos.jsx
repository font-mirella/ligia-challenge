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
        A liga acadêmica de Inteligência Artificial do <strong>CIn-UFPE</strong>, formada por estudantes e
        pesquisadores focados em <strong>IA e suas aplicações em problemas reais</strong>.
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
        Liga de <strong>estudantes e professores da UFPB</strong> dedicada à{' '}
        <strong>pesquisa e ao ensino de IA</strong>, da graduação ao doutorado.
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
        Um <strong>fundo de venture capital focado em IA</strong> que apoia fundadores brasileiros desde o dia zero
        com capital, programa de residência e conexão direta com o ecossistema do{' '}
        <strong>Vale do Silício</strong>.
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
// Pass alt="" when the logo sits inside an already-labeled link.
export function Logo({ logo, className = '', alt }) {
  return (
    <span className={`logo logo--${logo.id} ${className}`}>
      <img src={logo.src} alt={alt ?? (logo.label ? '' : logo.name)} width={logo.width} height={logo.height} loading="lazy" />
      {logo.label && <span className="logo__name">{logo.name}</span>}
    </span>
  );
}
