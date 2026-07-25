import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

const navLinks = [
  { label: "Home", id: "section-home" },
  { label: "About", id: "section-about" },
  // { label: "Skills", id: "section-skills" },
  { label: "Stack", id: "section-stack" },
  { label: "Projects", id: "section-projects" },
  { label: "Experience", id: "section-experience" },
  // { label: "Education", id: "section-education" },
  { label: "Contact", id: "section-contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("section-home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [resumeOpen, setResumeOpen] = useState(false);

  // Lock body scroll when resume modal is open
  useEffect(() => {
    if (resumeOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [resumeOpen]);

  // Track scroll for navbar shadow / blur + progress bar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docH > 0 ? (window.scrollY / docH) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver to highlight active section
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.id);
    const observers = [];

    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(callback, {
        rootMargin: "-40% 0px -55% 0px",
        threshold: 0,
      });
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    const el = document.getElementById(sectionId);
    if (el) {
      const navHeight = 72;
      const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  return (
    <header className={`navbar-fixed ${scrolled ? "navbar-fixed--scrolled" : ""}`}>
      <nav className="navbar-inner">
        {/* Logo / Brand */}
        <a
          href="#section-home"
          className="navbar-brand"
          onClick={(e) => handleNavClick(e, "section-home")}
        >
          <span className="brand-dot" />
          Geetika
        </a>

        {/* Desktop Links */}
        <ul className="nav-links-list">
          {navLinks.map(({ label, id }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`nav-item ${activeSection === id ? "nav-item--active" : ""}`}
                onClick={(e) => handleNavClick(e, id)}
              >
                {label}
                {activeSection === id && <span className="nav-item-dot" />}
              </a>
            </li>
          ))}
        </ul>

        {/* Resume CTA */}
        <button className="navbar-cta" onClick={() => setResumeOpen(true)}>
          Resume
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <polyline points="10 9 9 9 8 9"/>
          </svg>
        </button>

        {/* Hamburger */}
        <button
          className={`hamburger ${menuOpen ? "hamburger--open" : ""}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Scroll progress bar */}
      <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }} />

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${menuOpen ? "mobile-drawer--open" : ""}`}>
        {navLinks.map(({ label, id }) => (
          <a
            key={id}
            href={`#${id}`}
            className={`mobile-nav-item ${activeSection === id ? "mobile-nav-item--active" : ""}`}
            onClick={(e) => handleNavClick(e, id)}
          >
            {label}
          </a>
        ))}
        <button
          className="mobile-nav-item mobile-nav-item--resume"
          onClick={() => { setMenuOpen(false); setResumeOpen(true); }}
        >
          Resume
        </button>
      </div>

      {/* Resume Modal — portal so it's above everything */}
      {resumeOpen && ReactDOM.createPortal(
        <div className="resume-backdrop" onClick={() => setResumeOpen(false)}>
          <div className="resume-modal" onClick={e => e.stopPropagation()}>
            <div className="resume-modal__head">
              <span className="resume-modal__title">Resume</span>
              <div className="resume-modal__actions">
                <a href="/GeetikaBishtResume.pdf" download className="resume-download-btn">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  Download
                </a>
                <button className="resume-close-btn" onClick={() => setResumeOpen(false)} aria-label="Close">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
            </div>
            <div className="resume-modal__body">
              <iframe
                src="/GeetikaBishtResume.pdf#toolbar=0&navpanes=0&scrollbar=1"
                title="Resume"
                className="resume-iframe"
              />
            </div>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
}
