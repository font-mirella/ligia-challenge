import { useEffect } from 'react';

// Page-wide behaviour wired once from <App>:
//  - adds .is-in to every [data-reveal] element as it scrolls into view
//  - feeds the pointer position to .spotlight cards as --mx / --my
export default function usePageEffects() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    );
    document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));

    const onPointerMove = (e) => {
      const card = e.target.closest?.('.spotlight');
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    };
    document.addEventListener('pointermove', onPointerMove, { passive: true });

    return () => {
      io.disconnect();
      document.removeEventListener('pointermove', onPointerMove);
    };
  }, []);
}
