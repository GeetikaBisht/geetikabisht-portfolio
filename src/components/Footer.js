import React, { useEffect, useRef, useState } from "react";

const Footer = () => {
  const footerRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <footer ref={footerRef} className={`footer${visible ? " footer--visible" : ""}`}>
      <div className="footer-brand">
        <span className="footer-brand-dot" />
        Geetika
      </div>

      <p className="footer-text">
        © {new Date().getFullYear()} Geetika Bisht. Made with <span>♥</span> All rights reserved.
      </p>

      <div className="footer-links">
        <a href="https://www.behance.net/GeetikaBisht79" target="_blank" rel="noreferrer" className="footer-link">Behance</a>
        <a href="https://www.linkedin.com/in/geetika-bisht79" target="_blank" rel="noreferrer" className="footer-link">LinkedIn</a>
        <a href="mailto:geetikabhist@gmail.com" className="footer-link">Email</a>
      </div>
    </footer>
  );
};

export default Footer;
