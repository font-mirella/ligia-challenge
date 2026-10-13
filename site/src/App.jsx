import usePageEffects from './hooks/usePageEffects.js';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import Marquee from './components/Marquee.jsx';
import About from './components/About.jsx';
import Challenge from './components/Challenge.jsx';
import Audience from './components/Audience.jsx';
import Goals from './components/Goals.jsx';
import Schedule from './components/Schedule.jsx';
import Partners from './components/Partners.jsx';
import Sponsor from './components/Sponsor.jsx';
import Faq from './components/Faq.jsx';
import Register from './components/Register.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  usePageEffects();

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Marquee />
        <About />
        <Challenge />
        <Audience />
        <Goals />
        <Schedule />
        <Partners />
        <Sponsor />
        <Faq />
        <Register />
      </main>
      <Footer />
    </>
  );
}
