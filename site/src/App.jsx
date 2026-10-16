import usePageEffects from './hooks/usePageEffects.js';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import Countdown from './components/Countdown.jsx';
import About from './components/About.jsx';
import Challenge from './components/Challenge.jsx';
import Audience from './components/Audience.jsx';
import Goals from './components/Goals.jsx';
import Schedule from './components/Schedule.jsx';
import Prizes from './components/Prizes.jsx';
import Mentors from './components/Mentors.jsx';
import Partners from './components/Partners.jsx';
// Sponsor section hidden for now; uncomment here and in <main> to bring it back.
// import Sponsor from './components/Sponsor.jsx';
import Faq from './components/Faq.jsx';
import Register from './components/Register.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  usePageEffects();

  return (
    <>
      <a href="#main" className="skip-link">
        Pular para o conteúdo
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Countdown />
        <About />
        <Challenge />
        <Audience />
        <Goals />
        <Schedule />
        <Prizes />
        <Mentors />
        <Partners />
        <Faq />
        <Register />
        {/* <Sponsor /> */}
      </main>
      <Footer />
    </>
  );
}
