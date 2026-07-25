import React, { useEffect, useRef, useState } from 'react';
import Navbar from './components/Navbar';
import './App.css';
import { Hero, About, Skills, Stack, ProjectScrollMarquee, ProjectSection, Experience, ContactPage } from './components/Sections';
// import Education from './components/Education';
import Footer from './components/Footer';
import DragonBot from './components/DragonBot';

function App() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  const dotRef  = useRef(null);
  const spotRef = useRef(null);
  const spotPos = useRef({ x: -600, y: -600 });
  const rafId   = useRef(null);

  // LOADER TIMING
  useEffect(() => {
    const fadeTimer  = setTimeout(() => setFadeOut(true), 2200);
    const removeTimer = setTimeout(() => setLoading(false), 3000);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  // CURSOR LOGIC
  useEffect(() => {
    if (loading) return;

    const dot = dotRef.current;
    if (!dot) return;

    const lerp = (a, b, t) => a + (b - a) * t;

    const onMove = (e) => {
      dot.style.left = e.clientX + 'px';
      dot.style.top  = e.clientY + 'px';
      spotPos.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      if (spotRef.current) {
        spotRef.current.style.left = spotPos.current.x + 'px';
        spotRef.current.style.top  = spotPos.current.y + 'px';
      }
      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId.current);
    };
  }, [loading]);

  return (
    <>
      {loading && (
        <div className={`loader-screen ${fadeOut ? "fade-out" : ""}`}>
          <img src="/front.gif" alt="loading" className="loader-gif" />
        </div>
      )}

      {!loading && (
        <>
          <div className="spotlight" ref={spotRef} />
          <div className="cursor-dot" ref={dotRef} style={{ backgroundImage: "url('/FigArrow.png')" }} />

          <div className="App">
            <Navbar />
            <div style={{ height: '78px' }} />
            <section id="section-home">      <Hero />           </section>
            <ProjectScrollMarquee />
            <section id="section-about">     <About />          </section>
            {/* <section id="section-skills">    <Skills />         </section> */}
            <section id="section-stack">     <Stack />          </section>
            <section id="section-projects">  <ProjectSection /> </section>
            <section id="section-experience"><Experience />     </section>
            <section id="section-contact">   <ContactPage />    </section>
            <Footer />
            {/* <ThemePanel /> */}
          </div>
          <DragonBot />
        </>
      )}
    </>
  );
}

export default App;
