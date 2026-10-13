import { useEffect, useRef, useState } from 'react';
import { NAV_LINKS } from '../config.js';
import wordmark from '../assets/logos/converge-wordmark.svg';
import Icon from './Icon.jsx';
import './Nav.css';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const progressRef = useRef(null);

  // Glass background once scrolled, hide on scroll down, show on scroll up,
  // and drive the thin progress bar.
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(y > 24);
      setHidden(y > 640 && y > lastY + 4);
      if (y < lastY - 4 || y < 640) setHidden(false);
      lastY = y;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Highlight the link of the section in the middle of the screen.
  useEffect(() => {
    const sections = NAV_LINKS.map(({ id }) => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''} ${hidden && !open ? 'is-hidden' : ''} ${open ? 'is-open' : ''}`}>
      <div className="nav__inner container">
        <a href="#top" className="nav__brand" onClick={close} aria-label="Converge Challenge, back to top">
          <img src={wordmark} alt="" width="696" height="191" />
        </a>

        <nav className="nav__links" aria-label="Main">
          {NAV_LINKS.map(({ id, label }) => (
            <a key={id} href={`#${id}`} className={active === id ? 'is-active' : ''} onClick={close}>
              {label}
            </a>
          ))}
        </nav>

        <a href="#register" className="btn btn--sm nav__cta" onClick={close}>
          Register <Icon name="arrow" size={16} className="arrow" />
        </a>

        <button
          type="button"
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? 'close' : 'menu'} size={22} />
        </button>
      </div>

      <div id="mobile-menu" className="nav__sheet" hidden={!open}>
        <nav aria-label="Mobile">
          {NAV_LINKS.map(({ id, label }, i) => (
            <a key={id} href={`#${id}`} onClick={close} style={{ '--i': i }}>
              <span>0{i + 1}</span>
              {label}
            </a>
          ))}
        </nav>
        <a href="#register" className="btn" onClick={close}>
          Register on Luma <Icon name="arrow" size={18} className="arrow" />
        </a>
      </div>

      <span className="nav__progress" ref={progressRef} aria-hidden="true" />
    </header>
  );
}
