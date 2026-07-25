import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { getYearsExperience } from "../utils/experience";

/* ════════════════════════════════════════════════════════════
   SHARED UTILITY — used by Skills and Projects
   ════════════════════════════════════════════════════════════ */
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* ════════════════════════════════════════════════════════════
   HERO
   ════════════════════════════════════════════════════════════ */
const roles = [
  "UI/UX Designer",
  "Product Designer",
  "Graphic Designer",
  "Branding",
  "Front-End Developer",
];

const heroShapes = [
  {
    id: 1,
    className: "shape shape-orange-pyramid",
    delay: 0,
    src: "/shape1.png",
  },
  {
    id: 2,
    className: "shape shape-teal-star",
    delay: 0.15,
    src: "/shape2.png",
  },
  {
    id: 3,
    className: "shape shape-purple-sphere",
    delay: 0.3,
    src: "/shape3.png",
  },
  {
    id: 4,
    className: "shape shape-green-cube",
    delay: 0.1,
    src: "/shape4.png",
  },
  {
    id: 5,
    className: "shape shape-blue-cylinder",
    delay: 0.45,
    src: "/shape5.png",
  },
  {
    id: 6,
    className: "shape shape-yellow-cube",
    delay: 0.25,
    src: "/shape6.png",
  },
];

export function Hero() {
  const [workHovered, setWorkHovered] = useState(false);
  const animFrameRef = useRef(null);
  const targetOffset = useRef({ x: 0, y: 0 });
  const currentOffset = useRef({ x: 0, y: 0 });
  const memojiRef = useRef(null);

  // Typewriter for bg-text
  const [displayText, setDisplayText] = useState("");
  const [roleIdx, setRoleIdx] = useState(0);
  const [erasing, setErasing] = useState(false);

  useEffect(() => {
    const current = roles[roleIdx];
    let t;
    if (!erasing) {
      if (displayText.length < current.length) {
        t = setTimeout(
          () => setDisplayText(current.slice(0, displayText.length + 1)),
          70,
        );
      } else {
        t = setTimeout(() => setErasing(true), 1500);
      }
    } else {
      if (displayText.length > 0) {
        t = setTimeout(() => setDisplayText(displayText.slice(0, -1)), 35);
      } else {
        setErasing(false);
        setRoleIdx((i) => (i + 1) % roles.length);
      }
    }
    return () => clearTimeout(t);
  }, [displayText, erasing, roleIdx]);

  // Memoji mouse tracking — writes directly to DOM, no React state re-renders
  useEffect(() => {
    const handleMouseMove = (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const MAX = 45;
      targetOffset.current = {
        x: ((e.clientX - cx) / cx) * MAX,
        y: ((e.clientY - cy) / cy) * MAX,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);
    const lerp = (a, b, t) => a + (b - a) * t;

    const animate = () => {
      currentOffset.current.x = lerp(
        currentOffset.current.x,
        targetOffset.current.x,
        0.57,
      );
      currentOffset.current.y = lerp(
        currentOffset.current.y,
        targetOffset.current.y,
        0.57,
      );
      if (memojiRef.current) {
        memojiRef.current.style.transform = `translate(${currentOffset.current.x}px, ${currentOffset.current.y}px)`;
      }
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const handleScrollDown = () => {
    const el = document.getElementById("section-contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="hero-wrapper">
      {/* Floating Shapes */}
      {heroShapes.map((shape) => (
        <img
          key={shape.id}
          src={shape.src}
          alt=""
          className={shape.className}
          style={{ animationDelay: `${shape.delay}s` }}
        />
      ))}

      {/* Big background text — typewriter */}
      <div className="bg-text" aria-hidden="true">
        {displayText}
        <span className="bg-text-cursor">|</span>
      </div>

      {/* Center content */}
      <div className="hero-content">
        <p className="hero-greeting">
          <span className="hw hw-1">Hi,</span>{" "}
          <span className="hw hw-2">I'm</span>{" "}
          <span className="hw hw-3">
            <strong>Geetika</strong>
          </span>
        </p>

        {/* Memoji with mouse-tracking */}
        <div className="memoji-card">
          <img
            ref={memojiRef}
            src="/Facee.png"
            alt="Geetika"
            className="memoji-image"
          />
        </div>

        {/* CTA Button */}
        <button
          className={`cta-btn ${workHovered ? "cta-btn--hovered" : ""}`}
          onMouseEnter={() => setWorkHovered(true)}
          onMouseLeave={() => setWorkHovered(false)}
          onClick={handleScrollDown}
        >
          <span className="cta-text">Let's work Together!</span>
          <span
            className={`cta-arrow ${workHovered ? "cta-arrow--visible" : ""}`}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                d="M7 17L17 7M17 7H7M17 7v10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>

        {/* Marquee removed — roles now shown as typewriter in bg-text */}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   ABOUT
   ════════════════════════════════════════════════════════════ */
const cards = [
  {
    id: 1,
    number: "Who I Am",
    text: "Greetings! I'm Geetika, a UI/UX Designer who believes great design is where creativity meets purpose. I blend user-centered thinking with clean, impactful visuals to transform ideas into intuitive, engaging digital experiences. Every interface I design is crafted to be visually compelling, easy to use, and built to make every interaction meaningful.",
    accent: "#FF6B35",
    glow: "rgba(255,107,53,0.28)",
    icon: "✦",
    bg: "linear-gradient(145deg, #fff8f5 0%, #ffffff 100%)",
  },
  {
    id: 2,
    number: "My Journey",
    text: `With ${getYearsExperience().toFixed(1)} years of experience as a UI/UX Designer and Front-End Developer, my journey has been driven by curiosity, creativity, and continuous learning. From understanding user needs and crafting wireframes to building interactive prototypes and translating designs into responsive interfaces, I've learned that great design isn't just about how it looks it's about how effortlessly it works and the value it creates for users.`,
    accent: "#A78BFA",
    glow: "rgba(167,139,250,0.28)",
    icon: "◈",
    bg: "linear-gradient(145deg, #faf8ff 0%, #ffffff 100%)",
  },
];

const aboutShapes = [
  {
    id: 1,
    className: "ab-shape ab-shape-star-orange",
    delay: 0,
    src: "/shape7.png",
  },
  {
    id: 2,
    className: "ab-shape ab-shape-green-cube",
    delay: 0.2,
    src: "/shape8.png",
  },
];

export function About() {
  const [activeCard, setActiveCard] = useState(0);
  const [progress, setProgress] = useState(0);

  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  /* ── sticky scroll tracking — RAF-throttled ──────────────── */
  useEffect(() => {
    let rafId = null;
    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        if (!sectionRef.current) {
          rafId = null;
          return;
        }
        const rect = sectionRef.current.getBoundingClientRect();
        const total = sectionRef.current.offsetHeight - window.innerHeight;
        const raw = -rect.top;
        const p = Math.max(0, Math.min(1, raw / Math.max(total, 1)));
        setProgress(p);
        setActiveCard(Math.min(cards.length - 1, Math.floor(p * cards.length)));
        rafId = null;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  /* ── magnetic tilt ─────────────────────────────────────────── */
  const handleCardMouseMove = (e, i) => {
    const card = cardRefs.current[i];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty(
      "--tx",
      `${((e.clientX - rect.left) / rect.width - 0.5) * 10}deg`,
    );
    card.style.setProperty(
      "--ty",
      `${-((e.clientY - rect.top) / rect.height - 0.5) * 6}deg`,
    );
  };
  const handleCardMouseLeave = (i) => {
    const card = cardRefs.current[i];
    if (!card) return;
    card.style.setProperty("--tx", "0deg");
    card.style.setProperty("--ty", "0deg");
  };

  /* ── per-card scroll style ─────────────────────────────────── */
  const getCardStyle = (i) => {
    const ease = (x) => 1 - Math.pow(1 - x, 3);
    const band = 1 / cards.length;
    const t = ease(Math.max(0, Math.min(1, (progress - i * band) / band)));
    const tr =
      "opacity 1s cubic-bezier(0.22,1,0.36,1), transform 1s cubic-bezier(0.22,1,0.36,1)";

    if (i > activeCard) {
      return {
        opacity: 0,
        transform: "translateY(56px) scale(0.93)",
        zIndex: 10 + i,
        pointerEvents: "none",
        transition: tr,
      };
    }

    if (i < activeCard) {
      const depth = activeCard - i;
      return {
        opacity: Math.max(0, 1 - depth * 0.28),
        transform: `translateY(${-depth * 12}px) scale(${1 - depth * 0.04})`,
        filter: `brightness(${1 - depth * 0.06})`,
        zIndex: 10 + i,
        transition: tr + ", filter 1s ease",
      };
    }

    const finalT = i === 0 ? 1 : t;
    return {
      opacity: finalT,
      transform: `translateY(${(1 - finalT) * 48}px) scale(${0.94 + finalT * 0.06})`,
      zIndex: 20,
      transition: i === 0 && progress < 0.01 ? "none" : tr,
    };
  };

  return (
    <div
      className="about-scroll-driver"
      ref={sectionRef}
      style={{ height: `${(cards.length + 1) * 100}vh` }}
    >
      <div className="about-sticky">
        {aboutShapes.map((s) => (
          <img
            key={s.id}
            src={s.src}
            alt=""
            className={s.className}
            style={{ animationDelay: `${s.delay}s` }}
          />
        ))}

        <div className="about-header">
          <div className="about-eyebrow">
            <span className="about-eyebrow-line" />
            <span className="about-eyebrow-text">Get to know me</span>
            <span className="about-eyebrow-line" />
          </div>
          <h2 className="section-h2">
            About<em>Me</em>
          </h2>
          <p className="about-subtitle section-subtitle">
            Crafting purposeful digital experiences with passion.
          </p>
        </div>

        <div className="stack-pills">
          {cards.map((c, i) => (
            <span
              key={c.id}
              className={`stack-pill ${i === activeCard ? "stack-pill--active" : ""} ${i < activeCard ? "stack-pill--done" : ""}`}
              style={{ "--a": c.accent }}
            />
          ))}
        </div>

        <div className="about-stack">
          {cards.map((card, i) => (
            <div
              key={card.id}
              ref={(el) => (cardRefs.current[i] = el)}
              className={`about-card${i === activeCard ? " about-card--active" : ""}`}
              style={{
                ...getCardStyle(i),
                background: card.bg,
                "--accent": card.accent,
                "--glow": card.glow,
              }}
              onMouseMove={(e) => handleCardMouseMove(e, i)}
              onMouseLeave={() => handleCardMouseLeave(i)}
            >
              <div className="card-glow-border" />
              <div className="card-shimmer" />

              <div className="card-top-row">
                <div className="card-num-wrap">
                  <span className="card-icon">{card.icon}</span>
                  <span className="card-number">{card.number}</span>
                </div>
              </div>

              <div className="card-divider">
                <span className="card-divider-line" />
                <span className="card-divider-dot" />
                <span className="card-divider-line" />
              </div>

              <h3 className="card-title">{card.title}</h3>
              <p className="card-text">{card.text}</p>
              <div className="card-bottom-bar" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   SKILLS
   ════════════════════════════════════════════════════════════ */
const stats = [
  {
    num: getYearsExperience(),
    suffix: "+",
    label: "Years Experience",
    color: "#FF6B35",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    num: 3,
    suffix: "",
    label: "Domains",
    color: "#A78BFA",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  },
  {
    num: 25,
    suffix: "+",
    label: "Skills",
    color: "#34D399",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
      </svg>
    ),
  },
];

const skillSections = [
  {
    id: "design",
    title: "UI/UX Design",
    color: "#10b981",
    iconBg: "linear-gradient(135deg,#00a86b,#00d4a0)",
    description:
      "From research to high-fidelity — designing intuitive, beautiful and accessible experiences that users love.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
    skills: [
      "Stakeholder Interview",
      "Competitive Analysis",
      "User Research",
      "Personas",
      "Empathy Mapping",
      "Information Architecture",
      "User Flows",
      "Wireframing",
      "UI Design",
      "Interaction Design",
      "Responsive Design",
      "Visual Design",
      "Design Systems",
      "Prototyping",
      "Usability Testing",
    ],
  },
  {
    id: "development",
    title: "Development",
    color: "#e0197a",
    iconBg: "linear-gradient(135deg,#e0197a,#ff6bb5)",
    description:
      "Building modern, responsive and scalable web solutions with clean code.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    skills: [
      "HTML",
      "CSS",
      "Bootstrap",
      "React.js",
      "SharePoint",
      "Git & GitHub",
    ],
  },
  {
    id: "graphic",
    title: "Graphic Design",
    color: "#f59e0b",
    iconBg: "linear-gradient(135deg,#e07b00,#ffb347)",
    description:
      "Creating visually compelling content that communicates and inspires.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="4" />
        <line x1="4.93" y1="4.93" x2="9.17" y2="9.17" />
        <line x1="14.83" y1="14.83" x2="19.07" y2="19.07" />
        <line x1="14.83" y1="9.17" x2="19.07" y2="4.93" />
        <line x1="4.93" y1="19.07" x2="9.17" y2="14.83" />
      </svg>
    ),
    skills: [
      "Brand Identity",
      "Print Design",
      "Logo Design",
      "Packaging Design",
      "Poster Design",
      "Mockup Design",
      "Infographics",
    ],
  },
];

function useCountUp(target, duration, inView) {
  const [val, setVal] = useState("0");
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const isDecimal = !Number.isInteger(target);
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      const cur = ease * target;
      setVal(isDecimal ? cur.toFixed(1) : Math.floor(cur).toString());
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration]);
  return val;
}

function StatCard({ num, suffix, label, color, icon, delay }) {
  const [ref, inView] = useInView(0.2);
  const count = useCountUp(num, 1000, inView);

  const handleTiltMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const rx = ((e.clientX - rect.left) / rect.width - 0.5) * 18;
    const ry = -((e.clientY - rect.top) / rect.height - 0.5) * 12;
    card.style.setProperty("--rx", `${rx}deg`);
    card.style.setProperty("--ry", `${ry}deg`);
  };
  const handleTiltLeave = (e) => {
    e.currentTarget.style.setProperty("--rx", "0deg");
    e.currentTarget.style.setProperty("--ry", "0deg");
  };

  return (
    <div
      ref={ref}
      className={`stat-card${inView ? " stat-card--visible" : ""}`}
      style={{
        "--stat-color": color,
        transitionDelay: `${delay}ms`,
        "--rx": "0deg",
        "--ry": "0deg",
      }}
      onMouseMove={handleTiltMove}
      onMouseLeave={handleTiltLeave}
    >
      <div className="stat-icon-wrap" style={{ color }}>
        {icon}
      </div>
      <div className="stat-body">
        <div className="stat-value">
          {count}
          <span className="stat-suffix">{suffix}</span>
        </div>
        <div className="stat-label">{label}</div>
      </div>
    </div>
  );
}

export function Skills() {
  const [headerRef, headerInView] = useInView(0.1);
  const [bodyRef, bodyInView] = useInView(0.05);

  return (
    <div className="ms-root">
      <img
        src="/shape16.png"
        alt=""
        aria-hidden="true"
        className="ms-shape ms-shape--left"
      />

      {/* ── Header ── */}
      <header
        ref={headerRef}
        className={`ms-header${headerInView ? " ms-header--visible" : ""}`}
      >
        <div className="skills-eyebrow">
          <span className="skills-eyebrow-line" />
          <span className="skills-eyebrow-text">What I Do Best</span>
          <span className="skills-eyebrow-line" />
        </div>
        <h2 className="section-h2">
          My <em>Skills</em>
        </h2>
        <p className="skills-subtitle">
          Crafting digital experiences with purpose &amp; passion
        </p>
      </header>

      {/* ── Stats ── */}
      <div className="ms-stats">
        {stats.map((s, i) => (
          <StatCard key={s.label} {...s} delay={i * 120} />
        ))}
      </div>

      {/* ── Bento card grid ── */}
      <div
        ref={bodyRef}
        className={`skb-grid${bodyInView ? " sk-body--visible" : ""}`}
      >
        {skillSections.map((s, i) => (
          <div
            key={s.id}
            className="skb-card"
            style={{
              "--tc": s.color,
              "--tg": s.iconBg,
              transitionDelay: `${i * 100}ms`,
            }}
          >
            {/* coloured top accent bar */}
            <div className="skb-card__bar" />

            {/* card header */}
            <div className="skb-card__head">
              <div className="skb-card__icon">{s.icon}</div>
              <div className="skb-card__meta">
                <span className="skb-card__title">{s.title}</span>
                <span className="skb-card__count">
                  {s.skills.length} skills
                </span>
              </div>
            </div>

            {/* divider */}
            <div className="skb-card__divider" />

            {/* chips */}
            <div className="skb-card__chips">
              {s.skills.map((label, j) => (
                <span
                  key={label}
                  className="sk-chip"
                  style={{ "--tc": s.color, animationDelay: `${j * 40}ms` }}
                >
                  <span className="sk-chip__dot" />
                  {label}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   STACK
   ════════════════════════════════════════════════════════════ */
const tools = [
  {
    name: "Figma",
    category: "Design",
    color: "#1ABCFE",
    desc: "My collaborative design platform of choice for creating intuitive interfaces, interactive prototypes, and seamless design iterations with real-time team collaboration.",
    svg: (
      <svg
        viewBox="0 0 38 57"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width="80"
        height="80"
      >
        <path
          d="M19 28.5C19 23.8 22.9 20 27.5 20C32.1 20 36 23.8 36 28.5C36 33.2 32.1 37 27.5 37C22.9 37 19 33.2 19 28.5Z"
          fill="#1ABCFE"
        />
        <path
          d="M2 47C2 42.3 5.9 38.5 10.5 38.5H19V47C19 51.7 15.1 55.5 10.5 55.5C5.9 55.5 2 51.7 2 47Z"
          fill="#0ACF83"
        />
        <path
          d="M19 2V19.5H27.5C32.1 19.5 36 15.7 36 11C36 6.3 32.1 2.5 27.5 2.5H19V2Z"
          fill="#FF7262"
        />
        <path
          d="M2 11C2 15.7 5.9 19.5 10.5 19.5H19V2.5H10.5C5.9 2.5 2 6.3 2 11Z"
          fill="#F24E1E"
        />
        <path
          d="M2 28.5C2 33.2 5.9 37 10.5 37H19V20H10.5C5.9 20 2 23.8 2 28.5Z"
          fill="#A259FF"
        />
      </svg>
    ),
  },
  {
    name: "Adobe XD",
    category: "Design",
    color: "#FF61F6",
    desc: "Enhances my workflow by enabling me to design, prototype, and validate user experiences within a streamlined and efficient environment.",
    svg: (
      <img
        src="/XD.png"
        alt="Adobe XD"
        width="80"
        height="80"
        style={{ objectFit: "contain" }}
      />
    ),
  },
  {
    name: "Framer",
    category: "Prototyping",
    color: "#6c6c6c",
    desc: "My preferred platform for designing responsive, interactive websites with modern animations and a seamless design-to-development workflow.",
    svg: (
      <img
        src="/Framer.png"
        alt="Framer"
        width="80"
        height="80"
        style={{ objectFit: "contain" }}
      />
    ),
  },
  {
    name: "Adobe Illustrator",
    category: "Illustration",
    color: "#FF9A00",
    desc: "My go-to tool for crafting scalable vector graphics, icons, and branding assets with precision and visual consistency.",
    svg: (
      <img
        src="/AI.jpg"
        alt="Illustrator"
        width="80"
        height="80"
        style={{ objectFit: "contain" }}
      />
    ),
  },
  {
    name: "Adobe Photoshop",
    category: "Editing",
    color: "#31A8FF",
    desc: "Essential for enhancing visuals, refining UI mockups, and creating polished design assets with precision and creativity.",
    svg: (
      <img
        src="/PS.jpg"
        alt="Photoshop"
        width="80"
        height="80"
        style={{ objectFit: "contain" }}
      />
    ),
  },
  {
    name: "Kittl",
    category: "Designing",
    color: "#98cb46",
    desc: "Empowers me to create impactful graphics, branding assets, and visual content with creativity, precision, and efficiency.",
    svg: (
      <img
        src="/Kittl.png"
        alt="Kittl"
        width="65"
        height="65"
        style={{ objectFit: "contain" }}
      />
    ),
  },
  {
    name: "React",
    category: "Development",
    color: "#61DAFB",
    desc: "Powers my front-end development workflow by enabling dynamic, component-based interfaces with seamless interactions and scalability.",
    svg: (
      <img
        src="/React.png"
        alt="React"
        width="80"
        height="80"
        style={{ objectFit: "contain" }}
      />
    ),
  },
  {
    name: "HTML",
    category: "Development",
    color: "#E34F26",
    desc: "Forms the foundation of every website I build, ensuring semantic structure, accessibility, and well-organized content.",
    svg: (
      <img
        src="/Html.png"
        alt="HTML"
        width="80"
        height="80"
        style={{ objectFit: "contain" }}
      />
    ),
  },
  {
    name: "CSS",
    category: "Development",
    color: "#1572B6",
    desc: "Brings designs to life through responsive layouts, modern styling, and visually engaging user experiences.",
    svg: (
      <img
        src="/Css.png"
        alt="CSS"
        width="80"
        height="80"
        style={{ objectFit: "contain" }}
      />
    ),
  },
];

/* ── Sparkle burst on flip ─────────────────── */
function SparkleCanvas({ trigger, color }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!trigger) return;
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const W = (canvas.width = canvas.offsetWidth);
    const H = (canvas.height = canvas.offsetHeight);
    const cx = W / 2,
      cy = H / 2;

    const particles = Array.from({ length: 18 }, (_, i) => {
      const angle = (i / 18) * Math.PI * 2;
      const speed = 2.5 + Math.random() * 3;
      return {
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        r: 3 + Math.random() * 3,
      };
    });

    let raf;
    function draw() {
      ctx.clearRect(0, 0, W, H);
      let alive = false;
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.12;
        p.life -= 0.028;
        if (p.life <= 0) continue;
        alive = true;
        ctx.globalAlpha = p.life;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * p.life, 0, Math.PI * 2);
        ctx.fill();
      }
      if (alive) raf = requestAnimationFrame(draw);
      else ctx.clearRect(0, 0, W, H);
    }
    draw();
    return () => cancelAnimationFrame(raf);
  }, [trigger, color]);

  return <canvas ref={ref} className="stack-sparkle-canvas" />;
}

/* ── Magnetic card wrapper ─────────────────── */
function MagneticCard({ children, disabled }) {
  const ref = useRef(null);

  function onMove(e) {
    if (disabled) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    ref.current.style.setProperty("--mx", `${x * 0.1}px`);
    ref.current.style.setProperty("--my", `${y * 0.1}px`);
    ref.current.style.setProperty("--rx", `${-y * 0.04}deg`);
    ref.current.style.setProperty("--ry", `${x * 0.04}deg`);
  }

  function onLeave() {
    ref.current.style.setProperty("--mx", "0px");
    ref.current.style.setProperty("--my", "0px");
    ref.current.style.setProperty("--rx", "0deg");
    ref.current.style.setProperty("--ry", "0deg");
  }

  return (
    <div
      ref={ref}
      className="stack-magnetic"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  );
}

export function Stack() {
  const [flipped, setFlipped] = useState(null);
  const [sparkle, setSparkle] = useState(null);
  const [visibleCards, setVisibleCards] = useState(new Set());
  const [headerVisible, setHeaderVisible] = useState(false);
  const cardRefs = useRef([]);
  const headerRef = useRef(null);

  /* Intersection observer — scroll-triggered reveals */
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.dataset.idx);
            setVisibleCards((prev) => new Set([...prev, idx]));
          }
        });
      },
      { threshold: 0.15 },
    );

    cardRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  /* Header observer */
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setHeaderVisible(true);
      },
      { threshold: 0.3 },
    );
    if (headerRef.current) obs.observe(headerRef.current);
    return () => obs.disconnect();
  }, []);

  function handleFlip(i, color) {
    const next = flipped === i ? null : i;
    setFlipped(next);
    if (next !== null) {
      setSparkle({ idx: i, ts: Date.now(), color });
    }
  }

  return (
    <section className="stack-section">
      <div className="stack-grid-bg" />

      {/* Decorative shapes */}
      <div className="st-shape st-shape-redish-diamond">
        <img src="/Shape11.png" alt="Diamond" />
      </div>
      <div className="st-shape st-shape-orange-circle">
        <img src="/Shape12.png" alt="Circle" />
      </div>
      <div className="st-shape st-shape-green-cube">
        <img src="/Shape4.png" alt="Cube" />
      </div>

      {/* Header */}
      <header
        ref={headerRef}
        className={`stack-header ${headerVisible ? "stack-header--visible" : ""}`}
      >
        <div className="stack-eyebrow">
          <span className="stack-eyebrow-line" />
          <span className="stack-eyebrow-text">My Tools</span>
          <span className="stack-eyebrow-line" />
        </div>
        <h2 className="section-h2">
          My <em>Stack</em>
        </h2>
        <p className="section-subtitle">
          Tools I use to craft digital experiences.
        </p>
      </header>

      {/* Cards grid */}
      <div className="stack-grid">
        {tools.map((tool, i) => {
          const isFlipped = flipped === i;
          const isVisible = visibleCards.has(i);
          const sp = sparkle?.idx === i ? sparkle : null;

          /* Stagger: cascade left→right, top→bottom */
          const row = Math.floor(i / 3);
          const col = i % 3;
          const delay = row * 0.12 + col * 0.08;

          return (
            <div
              key={tool.name}
              ref={(el) => (cardRefs.current[i] = el)}
              data-idx={i}
              className={`stack-item ${isFlipped ? "stack-item--flipped" : ""} ${isVisible ? "stack-item--visible" : ""}`}
              style={{ "--enter-delay": `${delay}s` }}
              onClick={() => handleFlip(i, tool.color)}
            >
              <MagneticCard disabled={isFlipped}>
                {/* Sparkle canvas */}
                {sp && <SparkleCanvas key={sp.ts} trigger color={tool.color} />}

                {/* Shimmer ring */}

                {/* FRONT */}
                <div className="stack-front">
                  <div className="stack-icon-wrap">{tool.svg}</div>
                  <span className="stack-name">{tool.name}</span>
                  <span className="stack-tap-hint">tap to flip ↩</span>
                </div>

                {/* BACK */}
                <div className="stack-back">
                  <div
                    className="stack-back-glow"
                    style={{ background: tool.color }}
                  />
                  <div className="stack-back-icon-bg">{tool.svg}</div>
                  <h4 className="stack-back-name">{tool.name}</h4>
                  <p className="stack-back-desc">{tool.desc}</p>
                </div>
              </MagneticCard>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   PROJECTS (ProjectSection)
   ════════════════════════════════════════════════════════════ */
/* ── Graphic Design categories ───────────────────────────── */
const gdCategories = [
  {
    id: "logo",
    title: "Logo Design",
    label: "Branding",
    cover: "/CX13.PNG",
    images: ["/CX13.PNG", "/GD11.PNG", "/GD5.PNG"],
    accent: "#2563EB",
  },
  {
    id: "print",
    title: "Print Design",
    label: "Print",
    cover: "/GD3.PNG",
    images: ["/GD3.PNG", "/GD4.PNG", "/GD14.PNG", "/GD15.PNG"],
    accent: "#9333EA",
  },
  {
    id: "poster",
    title: "Poster Design",
    label: "Poster",
    cover: "/GD9.png",
    images: ["/GD9.png", "/GD18.png", "/GD17.png"],
    accent: "#3B82F6",
  },
  {
    id: "mockup",
    title: "Packaging Design",
    label: "Product",
    cover: "/NC7.PNG",
    images: ["/NC7.PNG", "/GD20.PNG"],
    accent: "#EC4899",
  },
];

/* spans for UI/UX and FE grids */
const uiSpans = [2, 1, 1, 2, 2, 1];
const feSpans = [1, 1];

/* ── UI/UX project data ──────────────────────────────────── */
const uiProjects = [
  {
    id: 1,
    category: "mobile",
    number: "01",
    title: "BiteBuddy - Food Delivery App",
    subtitle: "Mobile App Design",
    description:
      "A food delivery app combining healthy meals and favorite treats in one experience. Many users struggle to find meals matching both taste and nutrition, often leading to unhealthy choices. BiteBuddy solves this with personalized recommendations, nutritional insights, and an intuitive interface enabling faster, smarter food decisions.",
    tags: ["Figma", "FigJam", "Adobe Photoshop"],
    accent: "#2ECC71",
    image: "/BuddyB.png",
    modalImage: "/BBP.PNG",
    behance:
      "https://www.behance.net/gallery/219465363/BiteBuddy-Food-Delivery-App-(UIUX-Case-Study)",
  },
  {
    id: 2,
    category: "mobile",
    number: "02",
    title: "Venula - Personalized Movie App",
    subtitle: "Mobile App Design",
    description:
      "A streaming platform offering personalized movie and series recommendations based on mood and preferences. Many users spend excessive time searching for something to watch and settle for content that doesn't match their interests. This platform solves that with mood-based suggestions, making discovery simple and tailored to every viewer.",
    tags: ["Figma", "Adobe Illustrator"],
    accent: "#4e00c4",
    image: "/Venula.png",
    modalImage: "/VNP.PNG",
    behance: "https://www.behance.net/gallery/252811515/Venula-UIUX-Case-Study",
  },
  {
    id: 3,
    category: "webapp",
    number: "03",
    title: "Finwize - Finance Management Platform",
    subtitle: "Web App Design",
    description:
      "Many users struggle to track expenses and stay on top of their finances, often losing sight of their spending habits. This platform solves that with simplified budget management, real-time financial monitoring, and clear insights helping users make smarter decisions and stay organized.",
    tags: ["Figma", "Adobe Illustrator"],
    accent: "#3B82F6",
    image: "/FinwizeFin.png",
    modalImage: "/FN3.PNG",
    behance: "https://www.behance.net/gallery/219402545/Finwize-web-Design",
  },
  {
    id: 4,
    category: "webapp",
    number: "04",
    title: "VR - Landing Page",
    subtitle: "Web App Design",
    description:
      "Stepping into virtual reality should feel just as immersive online. This landing page showcases VR products through a modern, interactive interface delivering a visually engaging digital experience from the first scroll.",
    tags: ["Figma", "Adobe Illustrator"],
    accent: "#995eff",
    image: "/VRWeb.png",
    modalImage: "/VR4.PNG",
    behance:
      "https://www.figma.com/proto/GpYOKARGFZEkgu04iXqdKz/VR?node-id=1-2&t=34ZNlK9lbN9NVdBU-0&scaling=scale-down-width&content-scaling=fixed&page-id=0%3A1&hide-ui=1",
  },
  {
    id: 5,
    category: "dashboard",
    number: "05",
    title: "Zomato Insights Dashboard",
    subtitle: "Dashboard Design",
    description:
      " Business teams often struggle to track performance across sales, orders, and user activity in one place. This Zomato analytics dashboard solves that with a clean, data-focused interface highlighting key metrics and city-wise performance at a glance.",
    tags: ["Figma", "Adobe Photoshop"],
    accent: "#fe5181",
    image: "/ZomatoDash.png",
    modalImage: "/ZM5.PNG",
    behance:
      "https://www.behance.net/gallery/248528967/Zomato-Insights-Dashboard",
  },
  {
    id: 6,
    category: "dashboard",
    number: "06",
    title: "Spotify Analytics Dashboard",
    subtitle: "Dashboard Design",
    description:
      "A modern Spotify analytics dashboard focused on presenting streaming insights through a clean and intuitive interface. Highlights key metrics like total streams, track performance, and listening trends.",
    tags: ["Figma", "Adobe Photoshop"],
    accent: "#1DB954",
    image: "/Spotify-Mock.png",
    modalImage: "/SP6.PNG",
    behance: "https://www.behance.net/gallery/248524013/Spotify-Dashboard",
  },
];

/* ── Front End Development project data ─────────────────── */
const feProjects = [
  {
    id: 101,
    category: "website",
    number: "01",
    title: "Kynto",
    subtitle: "Website Design",
    description:
      "Kynto is a modern creative agency focused on crafting immersive digital experiences through innovation, storytelling, and visionary design, blending cinematic visuals, strategic thinking, and interactive interfaces to create meaningful and impactful digital products.",
    tags: ["Figma", "Creative Agency", "Responsive"],
    accent: "#0571a9",
    image: "/KKynto.png",
    modalImage: "/KN.png",
  },
  {
    id: 102,
    category: "website",
    number: "02",
    title: "Forma",
    subtitle: "Website Design",
    description:
      "Forma is a premium furniture and interior design platform blending timeless craftsmanship with modern elegance — offering curated collections for sophisticated, comfortable living spaces. It delivers a seamless end-to-end experience, from discovering the perfect piece to completing the purchase.",
    tags: ["UI/UX", "E-Commerce", "Responsive"],
    accent: "#ffba4a",
    image: "/Formaa.png",
    modalImage: "/FM.png",
  },
];

/* ── helpers ─────────────────────────────────────────────── */
function accentLight(hex, mix = 0.1) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const lr = Math.round(r * mix + 255 * (1 - mix));
  const lg = Math.round(g * mix + 255 * (1 - mix));
  const lb = Math.round(b * mix + 255 * (1 - mix));
  return `rgb(${lr},${lg},${lb})`;
}

/* ── Project Modal ───────────────────────────────────────── */
function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="pm-backdrop" onClick={onClose}>
      <div
        className="pm-card"
        style={{
          background: `linear-gradient(135deg, ${accentLight(project.accent, 0.12)} 0%, #ffffff 55%)`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="pm-close" onClick={onClose} aria-label="Close">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M1 1L13 13M13 1L1 13"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div className="pm-left">
          <span className="pm-proj-num" style={{ color: project.accent }}>
            Project #{project.number}
          </span>
          <h2 className="pm-title">{project.title}</h2>
          <p className="pm-desc">{project.description}</p>
          <div className="pm-tags">
            {project.tags.map((t) => (
              <span
                key={t}
                className="pm-tag"
                style={{
                  color: project.accent,
                  borderColor: `${project.accent}50`,
                  background: `${project.accent}15`,
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="pm-right">
          <div className="pm-img-wrap">
            <img
              src={project.modalImage || project.image}
              alt={project.title}
              className="pm-img"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── UI/UX + FE Bento (image tiles) ─────────────────────── */
function UIBentoSection({
  projects: list,
  visible,
  spans,
  onTileClick,
  selectedId,
  columns,
}) {
  const handleTilt = (e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const rx = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const ry = -((e.clientY - rect.top) / rect.height - 0.5) * 12;
    el.style.setProperty("--rx", `${rx}deg`);
    el.style.setProperty("--ry", `${ry}deg`);
    el.style.setProperty(
      "--mx",
      `${((e.clientX - rect.left) / rect.width) * 100}%`,
    );
    el.style.setProperty(
      "--my",
      `${((e.clientY - rect.top) / rect.height) * 100}%`,
    );
  };
  const handleTiltLeave = (e) => {
    e.currentTarget.style.setProperty("--rx", "0deg");
    e.currentTarget.style.setProperty("--ry", "0deg");
  };

  return (
    <div
      className={`ui-bento-wrapper${visible ? " ui-bento-wrapper--visible" : ""}`}
    >
      <div
        className={`ui-bento-grid${columns ? ` ui-bento-grid--cols-${columns}` : ""}`}
      >
        {list.map((p, i) => (
          <div
            key={p.id}
            className={`ui-tile ui-tile--span-${spans[i]}${visible ? " ui-tile--visible" : ""}${selectedId === p.id ? " ui-tile--active" : ""}`}
            style={{ "--tile-delay": `${i * 85}ms`, "--accent": p.accent }}
            onMouseMove={handleTilt}
            onMouseLeave={handleTiltLeave}
            onClick={() => {
              if (p.behance) {
                window.open(p.behance, "_blank", "noopener,noreferrer");
              } else if (onTileClick) {
                onTileClick(p);
              }
            }}
          >
            <div className="ui-tile-bg">
              <img
                src={p.image}
                alt={p.title}
                className="ui-tile-img"
                draggable={false}
              />
            </div>
            <div className="ui-tile-grad" />
            <div className="ui-tile-top">
              <span className="ui-tile-num" style={{ color: p.accent }}>
                {p.number}
              </span>
              <span className="ui-tile-sub">{p.subtitle.toUpperCase()}</span>
            </div>
            <div className="ui-tile-info">
              <span className="ui-tile-cat">{p.category}</span>
              <span className="ui-tile-name">{p.title}</span>
            </div>

            {p.behance ? (
              <div className="ui-tile-hint">
                View Project
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </div>
            ) : (
              <div className="ui-tile-hint">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                More Info
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Graphic Design Category Cards + Gallery ─────────────── */
function GDBentoSection() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [gallery, setGallery] = useState(null);

  const handleTilt = (e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const rx = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const ry = -((e.clientY - rect.top) / rect.height - 0.5) * 12;
    el.style.setProperty("--rx", `${rx}deg`);
    el.style.setProperty("--ry", `${ry}deg`);
    el.style.setProperty(
      "--mx",
      `${((e.clientX - rect.left) / rect.width) * 100}%`,
    );
    el.style.setProperty(
      "--my",
      `${((e.clientY - rect.top) / rect.height) * 100}%`,
    );
  };
  const handleTiltLeave = (e) => {
    e.currentTarget.style.setProperty("--rx", "0deg");
    e.currentTarget.style.setProperty("--ry", "0deg");
  };

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.06 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!gallery) return;
    const onKey = (e) => {
      if (e.key === "Escape") setGallery(null);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [gallery]);

  return (
    <>
      <div
        ref={ref}
        className={`gd-masonry-wrapper${visible ? " gd-masonry-wrapper--visible" : ""}`}
      >
        <div className="gd-cat-grid">
          {gdCategories.map((cat, i) => (
            <div
              key={cat.id}
              className={`gd-cat-card${visible ? " gd-cat-card--visible" : ""}`}
              style={{ transitionDelay: `${i * 90}ms` }}
              onClick={() => setGallery(cat)}
              onMouseMove={handleTilt}
              onMouseLeave={handleTiltLeave}
            >
              <div className="gd-cat-bg">
                <img
                  src={cat.cover}
                  alt={cat.title}
                  className="gd-cat-img"
                  draggable={false}
                />
              </div>
              <div className="gd-cat-grad" />
              <div className="gd-cat-top">
                <span className="gd-cat-num" style={{ color: cat.accent }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="gd-cat-label">{cat.label.toUpperCase()}</span>
              </div>
              <div className="gd-cat-info">
                <span className="gd-cat-cat">{cat.label}</span>
                <span className="gd-cat-name">{cat.title}</span>
              </div>
              <div className="gd-cat-hint">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                View All
              </div>
            </div>
          ))}
        </div>
      </div>

      {gallery &&
        ReactDOM.createPortal(
          <div className="gd-gallery-backdrop" onClick={() => setGallery(null)}>
            <div
              className="gd-gallery-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="gd-gallery-head">
                <div>
                  <p className="gd-gallery-label">{gallery.label}</p>
                  <h3 className="gd-gallery-title">{gallery.title}</h3>
                </div>
                <button
                  className="gd-gallery-close"
                  onClick={() => setGallery(null)}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M1 1L13 13M13 1L1 13"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
              <div className="gd-gallery-grid">
                {gallery.images.map((img, i) => (
                  <div key={i} className="gd-gallery-item">
                    <img src={img} alt={`${gallery.title} ${i + 1}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}

/* ── SubSection Label ────────────────────────────────────── */
function SubLabel({ num, title, desc, visible }) {
  return (
    <div className={`ps-sub-label${visible ? " ps-sub-label--visible" : ""}`}>
      <span className="ps-sub-num">{num}</span>
      <div className="ps-sub-info">
        <h3 className="ps-sub-title">{title}</h3>
        <p className="ps-sub-desc">{desc}</p>
      </div>
      <div className="ps-sub-divider" />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   PROJECT SCROLL MARQUEE — horizontal scroll-driven rows
   ════════════════════════════════════════════════════════════ */
const row1Images = [
  { src: "/BuddyB.png", label: "BiteBuddy" },
  { src: "/Venula.png", label: "Venula" },
  { src: "/FinwizeFin.png", label: "Finwize" },
  { src: "/VRWeb.png", label: "VR Landing" },
];
const row2Images = [
  { src: "/ZomatoDash.png", label: "Zomato" },
  { src: "/Spotify-Mock.png", label: "Spotify" },
  { src: "/KKynto.png", label: "Kynto" },
  { src: "/Formaa.png", label: "Forma" },
];

export function ProjectScrollMarquee() {
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);

  useEffect(() => {
    const TILE = 400; // 380px tile + 20px gap
    const loop1 = row1Images.length * TILE;
    const loop2 = row2Images.length * TILE;

    // row1 rightward: position in [-loop1, 0)
    // row2 leftward:  position in (-loop2, 0]
    let t1 = -loop1,
      c1 = -loop1;
    let t2 = 0,
      c2 = 0;
    let lastY = window.scrollY;
    let rafId;

    const onScroll = () => {
      const dy = window.scrollY - lastY;
      lastY = window.scrollY;

      t1 += dy * 1.4;
      t2 -= dy * 1.4;

      // Wrap target + current together so lerp never crosses the boundary
      while (t1 >= 0) {
        t1 -= loop1;
        c1 -= loop1;
      }
      while (t1 < -loop1) {
        t1 += loop1;
        c1 += loop1;
      }
      while (t2 <= -loop2) {
        t2 += loop2;
        c2 += loop2;
      }
      while (t2 > 0) {
        t2 -= loop2;
        c2 -= loop2;
      }
    };

    const tick = () => {
      c1 += (t1 - c1) * 0.09;
      c2 += (t2 - c2) * 0.09;
      if (row1Ref.current)
        row1Ref.current.style.transform = `translateX(${c1}px)`;
      if (row2Ref.current)
        row2Ref.current.style.transform = `translateX(${c2}px)`;
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    rafId = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const r1 = [...row1Images, ...row1Images, ...row1Images];
  const r2 = [...row2Images, ...row2Images, ...row2Images];

  return (
    <div className="psm-root">
      <div ref={row1Ref} className="psm-track psm-track--right">
        {r1.map((item, i) => (
          <div key={i} className="psm-tile">
            <img
              src={item.src}
              alt={item.label}
              loading="eager"
              draggable={false}
            />
          </div>
        ))}
      </div>

      <div ref={row2Ref} className="psm-track psm-track--left">
        {r2.map((item, i) => (
          <div key={i} className="psm-tile">
            <img
              src={item.src}
              alt={item.label}
              loading="eager"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Main export ─────────────────────────────────────────── */
export function ProjectSection() {
  const [headerRef, headerVisible] = useInView(0.1);
  const [uiRef, uiVisible] = useInView(0.05);
  const [feRef, feVisible] = useInView(0.05);
  const [gdRef, gdVisible] = useInView(0.05);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleTileClick = (p) => {
    setSelectedProject((prev) => (prev?.id === p.id ? null : p));
  };

  return (
    <section className="projects-section">
      <img src="/Shape13.png" alt="" className="ps-shape ps-shape-1" />
      <img src="/shape1.png" alt="" className="ps-shape ps-shape-2" />
      <img src="/Shape3.png" alt="" className="ps-shape ps-shape-3" />
      <img src="/shape5.png" alt="" className="ps-shape ps-shape-4" />
      <div className="ps-container">
        {/* ── Main header ── */}
        <div
          ref={headerRef}
          className={`ps-sec-header${headerVisible ? " ps-header-visible" : ""}`}
        >
          <div className="stack-eyebrow">
            <span className="stack-eyebrow-line" />
            <span className="stack-eyebrow-text">My Work</span>
            <span className="stack-eyebrow-line" />
          </div>
          <h2 className="section-h2">
            My <em>Projects</em>
          </h2>
          <p className="section-subtitle">
            A curated collection of UI/UX, front-end, and graphic design
            projects.
          </p>
        </div>

        {/* ── 01 UI/UX Design ── */}
        <div ref={uiRef} className="ps-subsection">
          <SubLabel
            num="01"
            title="UI / UX Design"
            desc="Mobile apps · Web apps · Dashboards"
            visible={uiVisible}
          />
          <UIBentoSection
            projects={uiProjects}
            visible={uiVisible}
            spans={uiSpans}
            onTileClick={handleTileClick}
            selectedId={selectedProject?.id}
          />
        </div>

        {/* ── 02 Front End Development ── */}
        <div ref={feRef} className="ps-subsection">
          <SubLabel
            num="02"
            title="Front End Development"
            desc="Websites · Web apps"
            visible={feVisible}
          />
          <UIBentoSection
            projects={feProjects}
            visible={feVisible}
            spans={feSpans}
            onTileClick={handleTileClick}
            selectedId={selectedProject?.id}
            columns={2}
          />
        </div>

        {/* ── 03 Graphic Design ── */}
        <div ref={gdRef} className="ps-subsection">
          <SubLabel
            num="03"
            title="Graphic Design"
            desc="Branding · Print · Digital"
            visible={gdVisible}
          />
          <GDBentoSection />
        </div>
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   EXPERIENCE
   ════════════════════════════════════════════════════════════ */
const experiences = [
  {
    role: "Associate",
    badge: "Current",
    badgeType: "current",
    company: "MResult Services Pvt Ltd",
    duration: "July 2025 – Present",
    logo: "M",
    logoColor: "#FF6B35",
    points: [
      "Led the end-to-end UI/UX design process, transforming complex business requirements into intuitive, scalable web experiences.",
      "Developed responsive React applications with a strong emphasis on accessibility, performance, and design consistency across platforms.",
      "Collaborated with cross-functional teams to drive product decisions, bridge design and development, and deliver high-quality user experiences.",
    ],
  },
  {
    role: "UI/UX Design & Front-End Intern",
    badge: "Internship",
    badgeType: "intern",
    company: "MResult Services Pvt Ltd",
    duration: "Jan 2025 – June 2025",
    logo: "M",
    logoColor: "#A78BFA",
    points: [
      "Crafted wireframes, user flows, and interactive prototypes to explore and validate design concepts.",
      "Assisted in user research and usability testing, translating findings into thoughtful design improvements and smoother user journeys.",
      "Supported front-end development by implementing reusable UI components and ensuring designs were accurately translated into code.",
    ],
  },
];

const ChevronIcon = ({ open }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`exp-chevron-icon${open ? " exp-chevron-icon--open" : ""}`}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export function Experience() {
  const [openIdx, setOpenIdx] = useState(-1);
  const [headerVis, setHeaderVis] = useState(false);
  const [visible, setVisible] = useState([]);
  const [spineVis, setSpineVis] = useState(false);
  const headerRef = useRef(null);
  const itemRefs = useRef([]);
  const spineRef = useRef(null);

  useEffect(() => {
    const headerObs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setHeaderVis(true);
      },
      { threshold: 0.2 },
    );
    if (headerRef.current) headerObs.observe(headerRef.current);

    const itemObs = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const i = itemRefs.current.indexOf(entry.target);
            if (i !== -1) setVisible((prev) => [...new Set([...prev, i])]);
          }
        }),
      { threshold: 0.15 },
    );
    itemRefs.current.forEach((r) => r && itemObs.observe(r));

    const spineObs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setSpineVis(true);
      },
      { threshold: 0.1 },
    );
    if (spineRef.current) spineObs.observe(spineRef.current);

    return () => {
      headerObs.disconnect();
      itemObs.disconnect();
      spineObs.disconnect();
    };
  }, []);

  const toggle = (i) => setOpenIdx((prev) => (prev === i ? -1 : i));

  return (
    <section className="exp-wrap">
      <img src="/shape14.png" alt="" className="exp-shape exp-shape-1" />
      <img src="/shape15.png" alt="" className="exp-shape exp-shape-2" />
      <div
        className={`exp-head section-header${headerVis ? " section-header--visible" : ""}`}
        ref={headerRef}
      >
        <div className="section-eyebrow">
          <span className="section-eyebrow__line" />
          <span className="section-eyebrow__text">Career Path</span>
          <span className="section-eyebrow__line" />
        </div>
        <h2 className="section-h2">
          My <em>Experience</em>
        </h2>
        <p className="section-subtitle">
          Where I've worked and the impact I've made.
        </p>
      </div>

      <div className="exp-timeline">
        <div
          className={`exp-spine${spineVis ? " exp-spine--visible" : ""}`}
          ref={spineRef}
        />

        {experiences.map((exp, i) => {
          const isOpen = openIdx === i;
          return (
            <div
              key={i}
              ref={(el) => (itemRefs.current[i] = el)}
              className={`exp-item${visible.includes(i) ? " exp-item--visible" : ""}`}
              style={{
                transitionDelay: `${i * 100}ms`,
                "--dot-color": exp.logoColor,
              }}
            >
              <div className="exp-dot" />

              <div className="exp-card">
                <button
                  className="exp-card__header"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                >
                  <div
                    className="exp-logo"
                    style={{
                      background: `${exp.logoColor}18`,
                      color: exp.logoColor,
                    }}
                  >
                    {exp.logo}
                  </div>

                  <div className="exp-card__meta">
                    <div className="exp-card__title-row">
                      <span className="exp-card__role">{exp.role}</span>
                      <span className={`exp-badge exp-badge--${exp.badgeType}`}>
                        {exp.badge}
                      </span>
                    </div>
                    <span className="exp-card__company">{exp.company}</span>
                  </div>

                  <div className="exp-card__right">
                    <span className="exp-card__duration">{exp.duration}</span>
                    <ChevronIcon open={isOpen} />
                  </div>
                </button>

                <div
                  className={`exp-card__body${isOpen ? " exp-card__body--open" : ""}`}
                >
                  <div className="exp-card__body-inner">
                    <ul className="exp-points">
                      {exp.points.map((pt, j) => (
                        <li key={j}>
                          <span className="exp-bullet" />
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   CONTACT (ContactPage)
   ════════════════════════════════════════════════════════════ */
export function ContactPage() {
  const bodyRef = useRef(null);
  const headerRef = useRef(null);

  const handleMag = (e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.13;
    const dy = (e.clientY - (rect.top + rect.height / 2)) * 0.09;
    el.style.transition = "transform 0.15s ease";
    el.style.transform = `translate(${dx}px, ${dy}px)`;
  };
  const handleMagLeave = (e) => {
    e.currentTarget.style.transition =
      "transform 0.45s cubic-bezier(0.34,1.3,0.64,1)";
    e.currentTarget.style.transform = "";
  };

  useEffect(() => {
    const targets = [bodyRef.current, headerRef.current].filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add(
              e.target === bodyRef.current
                ? "contact-body--visible"
                : "contact-header--visible",
            );
          }
        }),
      { threshold: 0.15 },
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="contact-wrapper">
      {/* Unified header */}
      <div className="contact-header" ref={headerRef}>
        <div className="section-eyebrow">
          <span className="section-eyebrow__line" />
          <span className="section-eyebrow__text">Get In Touch</span>
          <span className="section-eyebrow__line" />
        </div>
      </div>

      <div className="contact-body" ref={bodyRef}>
        {/* Left: Big headline */}
        <div className="contact-headline">
          <span className="headline-word hw-1">LET'S BUILD</span>
          <span className="headline-word hw-2">SOMETHING</span>
          <span className="headline-word headline-word--accent hw-3">
            GREAT
          </span>
          <span className="headline-word hw-4">TOGETHER</span>
        </div>

        {/* Right: Contact Info */}
        <div className="contact-info">
          <a
            href="mailto:geetikabhist@gmail.com"
            className="contact-item"
            onMouseMove={handleMag}
            onMouseLeave={handleMagLeave}
          >
            <div className="icon-circle">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <polyline points="2,4 12,13 22,4" />
              </svg>
            </div>
            <div className="contact-detail">
              <span className="contact-label">Email</span>
              <span className="contact-value">geetikabhist@gmail.com</span>
            </div>
          </a>
          <div className="divider" />

          <a
            href="tel:+917349408965"
            className="contact-item"
            onMouseMove={handleMag}
            onMouseLeave={handleMagLeave}
          >
            <div className="icon-circle">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.59 1.27h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l.82-.82a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <div className="contact-detail">
              <span className="contact-label">Phone</span>
              <span className="contact-value">+91 73494 08965</span>
            </div>
          </a>
          <div className="divider" />

          <a
            href="https://www.behance.net/GeetikaBisht79"
            target="_blank"
            rel="noreferrer"
            className="contact-item"
            onMouseMove={handleMag}
            onMouseLeave={handleMagLeave}
          >
            <div className="icon-circle">
              <span className="icon-text">Bē</span>
            </div>
            <div className="contact-detail">
              <span className="contact-label">Behance</span>
              <span className="contact-value">GeetikaBisht79</span>
            </div>
          </a>
          <div className="divider" />

          <a
            href="https://www.linkedin.com/in/geetika-bisht79"
            target="_blank"
            rel="noreferrer"
            className="contact-item"
            onMouseMove={handleMag}
            onMouseLeave={handleMagLeave}
          >
            <div className="icon-circle">
              <span className="icon-text">in</span>
            </div>
            <div className="contact-detail">
              <span className="contact-label">LinkedIn</span>
              <span className="contact-value">geetika-bisht79</span>
            </div>
          </a>
        </div>
      </div>

      <a href="mailto:geetikabhist@gmail.com" className="contact-email-cta">
        geetikabhist@gmail.com<span className="cec-arrow">↗</span>
      </a>
    </div>
  );
}
