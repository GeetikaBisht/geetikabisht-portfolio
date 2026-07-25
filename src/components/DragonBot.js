import React, { useState, useRef, useEffect } from 'react';
import { getYearsExperience } from '../utils/experience';

/* ── Knowledge base ───────────────────────────────────────── */
function getResponse(raw) {
  const q = raw.toLowerCase().trim();

  // Greetings
  if (/^(hi+|hello|hey+|sup|howdy|namaste|greetings|yo)[\s!?]*$/.test(q) ||
      q.includes('good morning') || q.includes('good evening') || q.includes('good afternoon')) {
    return "Hey there! 👋 I'm Dragon, Geetika's personal bot. Ask me about her skills, projects, work experience, education — anything at all!";
  }

  // Who is Geetika / general about
  if (q.includes('who is geetika') || q.includes('tell me about geetika') || q.includes('introduce') ||
      q.includes('who is she') || (q.includes('about') && !q.includes('project'))) {
    return `Geetika Bisht is a UI/UX Designer & Front-End Developer based in Mangalore, Karnataka, India.\n\nShe believes great design is where creativity meets purpose blending user-centered thinking with clean, impactful visuals to transform ideas into intuitive, engaging digital experiences. Every interface she designs is crafted to be visually compelling, easy to use, and built to make every interaction meaningful.\n\nWith ${getYearsExperience().toFixed(1)} years of experience, her journey has been driven by curiosity, creativity, and continuous learning from understanding user needs and crafting wireframes to building interactive prototypes and translating designs into pixel-perfect, responsive interfaces. 🎨`;
  }

  // Location
  if (q.includes('location') || q.includes('where') || q.includes('based') || q.includes('city') ||
      q.includes('stay') || q.includes('live') || q.includes('mangalore') || q.includes('karnataka')) {
    return "Geetika is based in Mangalore, Karnataka, India. 📍";
  }

  // Education
  if (q.includes('education') || q.includes('degree') || q.includes('college') || q.includes('university') ||
      q.includes('study') || q.includes('studied') || q.includes('mca') || q.includes('bca') ||
      q.includes('academic') || q.includes('cgpa') || q.includes('nitte') || q.includes('nmamit') ||
      q.includes('school') || q.includes('qualification') || q.includes('aloysius') || q.includes('sharada')) {
    return "Geetika's academic journey:\n\n🎓 MCA — NMAMIT, Nitte | 8.30 CGPA (2025)\n\n🎓 BCA — St Aloysius College (Autonomous), Mangalore | 8.30 CGPA\n\n📚 11th & 12th — Sharada PU College, Mangalore | 8.30 CGPA\n\nConsistently scored 8.30 CGPA throughout her entire academic career!";
  }

  // Experience - general
  if (q.includes('experience') || q.includes('work experience') || q.includes('career') ||
      q.includes('job') || q.includes('mresult') || q.includes('company') ||
      q.includes('associate') || (q.includes('intern') && !q.includes('internship at'))) {
    return "Geetika's professional experience:\n\n💼 Associate — MResult Services Pvt Ltd (July 2025 – Present)\nLeads UI/UX design and front-end development, defining user journeys and working closely with developers and stakeholders.\n\n🔗 UI/UX Design & Front-End Intern — MResult Services Pvt Ltd (Jan 2025 – June 2025)\nDesigned wireframes & prototypes, conducted user research, and implemented responsive UI components.";
  }

  // Years of experience
  if (q.includes('how many year') || q.includes('years of exp') || q.includes('how long') || q.includes('how much experience')) {
    return `Geetika has ${getYearsExperience().toFixed(1)}+ years of hands-on experience in UI/UX design and front-end development! 📅`;
  }

  // Skills - general
  if (q.includes('skill') || q.includes('expertise') || q.includes('capabilities') ||
      q.includes('proficient') || q.includes('what can she do') || q.includes('specialit') || q.includes('domain')) {
    return "Geetika has 25+ skills across 3 domains:\n\n🎨 UI/UX Design: User Research, Wireframing, UI Design, Prototyping, Interaction Design, Design Systems, Usability Testing, Visual Design, Responsive Design, Personas, Empathy Mapping, Information Architecture, User Flows, Competitive Analysis, Stakeholder Interviews\n\n💻 Development: HTML, CSS, Bootstrap, React.js, SharePoint, Git & GitHub\n\n🖼 Graphic Design: Logo Design, Brand Identity, Print Design, Poster Design, Packaging Design, Infographics, Mockup Design";
  }

  // Tools / Stack
  if (q.includes('tool') || q.includes('stack') || q.includes('software') || q.includes('figma') ||
      q.includes('adobe') || q.includes('framer') || q.includes('photoshop') || q.includes('illustrator') ||
      q.includes('kittl') || q.includes('react') || q.includes('html') || q.includes('css')) {
    return "Here's a look at the tools Geetika works with:\n\n✏️ Design & Prototyping\nFigma, Adobe XD, Framer — used to craft wireframes, interactive prototypes, and polished UI designs.\n\n🖌 Illustration & Editing\nAdobe Illustrator, Adobe Photoshop, Kittl — for creating scalable graphics, branding assets, and visual content.\n\n💻 Front-End Development\nReact.js, HTML, CSS — bringing designs to life through responsive, component-based interfaces.";
  }

  // All projects overview
  if ((q.includes('project') || q.includes('portfolio') || q.includes('work')) &&
      !q.includes('bitebuddy') && !q.includes('venula') && !q.includes('finwize') &&
      !q.includes('zomato') && !q.includes('spotify') && !q.includes('kynto') && !q.includes('forma') &&
      !q.includes('vr') && !q.includes('graphic') && !q.includes('logo') && !q.includes('poster')) {
    return "Geetika's portfolio across 3 categories:\n\n🎨 UI/UX Design (6 projects):\n• BiteBuddy – Food Delivery App\n• Venula – Movie & Series Streaming App\n• Finwize – Finance Management Platform\n• VR – Landing Page\n• Zomato Insights Dashboard\n• Spotify Analytics Dashboard\n\n💻 Front-End Development:\n• Kynto – Creative Agency Website\n• Forma – Furniture & Interior Design Platform\n\n🖼 Graphic Design (4 categories):\n• Logo Design – Brand identities & logotypes\n• Print Design – Print-ready materials & layouts\n• Poster Design – Visual poster work\n• Packaging Design – Product packaging mockups";
  }

  // BiteBuddy
  if (q.includes('bitebuddy') || q.includes('bite buddy') || (q.includes('food') && q.includes('app'))) {
    return "🍔 BiteBuddy — Food Delivery App (Mobile UI/UX)\n\nSolves the problem of finding meals that match both taste and nutrition. BiteBuddy offers personalized recommendations, nutritional insights, and an intuitive interface for faster, smarter food decisions.\n\n🛠 Tools: Figma, FigJam, Adobe Photoshop";
  }

  // Venula
  if (q.includes('venula') || (q.includes('streaming') && q.includes('app')) || (q.includes('movie') && q.includes('app'))) {
    return "🎬 Venula — Movie & Series Streaming App (Mobile UI/UX)\n\nSolves endless-scrolling fatigue with mood-based recommendations, making content discovery simple and tailored to every viewer.\n\n🛠 Tools: Figma, Adobe Illustrator";
  }

  // Finwize
  if (q.includes('finwize') || (q.includes('finance') && (q.includes('app') || q.includes('platform'))) || q.includes('budget app')) {
    return "💰 Finwize — Finance Management Platform (Web App UI/UX)\n\nSimplifies budget management and real-time financial monitoring, giving users clear insights to make smarter financial decisions.\n\n🛠 Tools: Figma, Adobe Illustrator";
  }

  // VR Landing page
  if (q.includes('vr landing') || q.includes('virtual reality') || (q.includes('vr') && q.includes('page'))) {
    return "🥽 VR — Landing Page (Web UI/UX)\n\nAn immersive landing page showcasing VR products through a modern, interactive interface — delivering a visually engaging experience from the first scroll.\n\n🛠 Tools: Figma, Adobe Illustrator";
  }

  // Zomato
  if (q.includes('zomato')) {
    return "📊 Zomato Insights Dashboard (Dashboard UI/UX)\n\nA clean, data-focused analytics dashboard highlighting key business metrics, order performance, and city-wise stats at a glance — so teams don't need to juggle multiple tools.\n\n🛠 Tools: Figma, Adobe Photoshop";
  }

  // Spotify
  if (q.includes('spotify')) {
    return "🎵 Spotify Analytics Dashboard (Dashboard UI/UX)\n\nA modern analytics dashboard presenting streaming insights through a clean, intuitive interface — covering total streams, track performance, and listening trends.\n\n🛠 Tools: Figma, Adobe Photoshop";
  }

  // Kynto
  if (q.includes('kynto')) {
    return "🌐 Kynto — Creative Agency Website (Front-End Dev)\n\nA modern creative agency website focused on immersive digital experiences, blending cinematic visuals, strategic thinking, and interactive interfaces.\n\n🛠 Tools: Figma, Animation, Front-End Development";
  }

  // Forma
  if (q.includes('forma') || (q.includes('furniture') || q.includes('interior design'))) {
    return "🛋 Forma — Furniture & Interior Design Platform (Front-End Dev)\n\nA premium furniture platform blending timeless craftsmanship with modern elegance — from discovering the perfect piece to completing the purchase, all in one seamless experience.\n\n🛠 Tools: Figma, Front-End Development";
  }

  // Graphic Design
  if (q.includes('graphic') || q.includes('logo') || q.includes('print') || q.includes('poster') ||
      q.includes('packaging') || q.includes('typography') || q.includes('branding') || q.includes('brand identity')) {
    return "🖼 Geetika's Graphic Design work:\n\n• Logo Design — Brand identities and logotypes\n• Print Design — Print-ready materials & layouts\n• Poster Design — Visual poster work\n• Packaging Design — Product packaging mockups\n\nHer full graphic design portfolio is on Behance → behance.net/GeetikaBisht79 🎨";
  }

  // Contact
  if (q.includes('contact') || q.includes('reach') || q.includes('hire') || q.includes('connect') ||
      q.includes('get in touch') || q.includes('work with') || q.includes('email') || q.includes('phone') || q.includes('number')) {
    return "You can reach Geetika through:\n\n📧 geetikabhist@gmail.com\n📞 +91 73494 08965\n💼 linkedin.com/in/geetika-bisht79\n🎨 behance.net/GeetikaBisht79\n\nShe's open to new opportunities and collaborations! 🙌";
  }

  // LinkedIn
  if (q.includes('linkedin')) {
    return "Geetika's LinkedIn: linkedin.com/in/geetika-bisht79 💼\n\nFeel free to connect with her there!";
  }

  // Behance
  if (q.includes('behance')) {
    return "Geetika's Behance: behance.net/GeetikaBisht79 🎨\n\nHer graphic design work is showcased there — definitely worth exploring!";
  }

  // Resume
  if (q.includes('resume') || q.includes('cv')) {
    return "You can download Geetika's resume directly from this portfolio — click the 'Resume' button in the navbar! 📄";
  }

  // Passion / hobbies / interests
  if (q.includes('hobby') || q.includes('hobbies') || q.includes('interest') || q.includes('passion') || q.includes('free time')) {
    return "From what Geetika shares: her real passion is crafting interfaces that 'look good, feel right, and actually work.' Every pixel has to earn its place!\n\nShe loves the intersection of aesthetics and functionality — turning ideas into experiences that both delight users and meet business goals. 🎨";
  }

  // Stats / numbers
  if (q.includes('how many project') || q.includes('stats') || q.includes('number') || q.includes('count')) {
    return `Here's a quick snapshot of Geetika's work:\n\n📊 ${getYearsExperience().toFixed(1)}+ Years of experience\n🗂 3 Domains (Design, Dev, Graphic)\n⚡ 25+ Skills\n🎨 6 UI/UX Projects\n💻 2 Front-End Projects\n🖼 4 Graphic Design categories`;
  }

  // Strengths
  if (q.includes('strength') || q.includes('best at') || q.includes('specializ') || q.includes('focus')) {
    return "Geetika's core strengths:\n\n✅ Full design process — from user research & wireframing to high-fidelity prototypes\n✅ User-centered thinking that aligns business goals with user needs\n✅ Bridging design and development — pixel-perfect React implementations\n✅ Working across mobile apps, web apps, dashboards, and graphic design\n✅ Consistent CGPA of 8.30 across all academic levels";
  }

  // Who are you / What are you / Dragon
  if (q.includes('who are you') || q.includes('what are you') || q.includes('your name') ||
      q.includes('what is dragon') || q.includes('are you a bot') || q.includes('are you ai')) {
    return "I'm Dragon 🐉 — Geetika Bisht's personal portfolio bot!\n\nI know everything about her: education, skills, experience, projects, tools, and contact info. No question about Geetika is too hard for me. Ask away!";
  }

  // Help / what can you do
  if (q.includes('help') || q.includes('what can you') || q.includes('what do you know') || q.includes('what can i ask') || q.includes('menu')) {
    return "Here's what I can tell you about Geetika:\n\n🧑 About her\n📍 Location\n🎓 Education\n💼 Work Experience\n🎨 Skills & Expertise\n🛠 Tools & Tech Stack\n📁 Projects (UI/UX, Front-End, Graphic Design)\n📞 How to contact her\n📄 Resume\n\nJust ask in plain language — I'll figure it out! 🐉";
  }

  // Thank you
  if (q.includes('thank') || q.includes('thanks') || q.includes('thx') || q.includes('ty')) {
    return "You're very welcome! 🐉 Feel free to ask anything else about Geetika anytime!";
  }

  // Bye
  if (q.includes('bye') || q.includes('goodbye') || q.includes('see you') || q.includes('cya') || q.includes('later')) {
    return "Goodbye! 👋 Come back anytime — Dragon is always here. 🐉";
  }

  // Fallback
  return "Hmm, I didn't quite catch that. 🐉 Try asking about Geetika's skills, projects, education, work experience, or how to reach her!\n\nType 'help' to see everything I can answer.";
}

/* ── Quick suggestion chips ───────────────────────────────── */
const CHIPS = [
  {
    label: 'Experience',
    q: 'Tell me about her work experience',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
      </svg>
    ),
  },
  {
    label: 'Projects',
    q: 'What projects has she worked on?',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
  },
  {
    label: 'Skills',
    q: 'What are her skills?',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
  },
  {
    label: 'Contact',
    q: 'How can I contact Geetika?',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,4 12,13 22,4"/>
      </svg>
    ),
  },
];

/* ── Link-aware text renderer ─────────────────────────────── */
const LINK_RE = /(https?:\/\/[^\s]+|(?:[\w.-]+\.(?:com|net|org|in)\/[^\s]+)|[\w.+-]+@[\w-]+\.[\w.]+)/g;

function renderText(text) {
  return text.split('\n').map((line, li) => {
    const parts = [];
    let last = 0;
    let m;
    LINK_RE.lastIndex = 0;
    while ((m = LINK_RE.exec(line)) !== null) {
      if (m.index > last) parts.push(line.slice(last, m.index));
      const raw = m[0];
      let href = raw;
      if (!href.startsWith('http')) {
        href = raw.includes('@') ? `mailto:${raw}` : `https://${raw}`;
      }
      parts.push(
        <a key={m.index} href={href} target="_blank" rel="noreferrer" className="drg-link">
          {raw}
        </a>
      );
      last = m.index + raw.length;
    }
    if (last < line.length) parts.push(line.slice(last));
    return <span key={li}>{parts}{'\n'}</span>;
  });
}

/* ── DragonBot Component ──────────────────────────────────── */
const WELCOME = [{
  from: 'bot',
  text: "Hey! I'm Dragon 🐉 Geetika's personal bot.\n\nAsk me anything about her",
  chips: true,
}];

export default function DragonBot() {
  const [open, setOpen]           = useState(false);
  const [messages, setMessages]   = useState(WELCOME);
  const [input, setInput]         = useState('');
  const [typing, setTyping]       = useState(false);
  const [inContact, setInContact] = useState(false);
  const bottomRef = useRef(null);
  const inputRef  = useRef(null);

  useEffect(() => {
    const section = document.getElementById('section-contact');
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInContact(entry.isIntersecting);
        if (entry.isIntersecting) setOpen(false);
      },
      { threshold: 0.1 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, typing]);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  const pushMessage = (text) => {
    if (!text.trim()) return;
    const userMsg = { from: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      const botReply = getResponse(text);
      setTyping(false);
      setMessages((prev) => [...prev, { from: 'bot', text: botReply }]);
    }, 600);
  };

  const handleSend = () => pushMessage(input);

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* ── Chat panel ── */}
      <div className={`drg-panel${open ? ' drg-panel--open' : ''}`}>
        {/* Header */}
        <div className="drg-header">
          <div className="drg-avatar"><img src="/Bot.png" alt="Dragon" className="drg-avatar-img" /></div>
          <div className="drg-header-info">
            <span className="drg-name">Dragon</span>
            <span className="drg-status"><span className="drg-dot" />Geetika's personal bot</span>
          </div>
          <button className="drg-close" onClick={() => setOpen(false)} aria-label="Close">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="drg-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`drg-row drg-row--${msg.from}`}>
              {msg.from === 'bot' && <div className="drg-bot-avatar"><img src="/Bot.png" alt="Dragon" className="drg-avatar-img" /></div>}
              <div className={`drg-bubble drg-bubble--${msg.from}`}>
                <span className="drg-bubble-text">{renderText(msg.text)}</span>
                {msg.chips && (
                  <div className="drg-chips">
                    {CHIPS.map((c) => (
                      <button key={c.label} className="drg-chip" onClick={() => pushMessage(c.q)}>
                        {c.icon}{c.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {typing && (
            <div className="drg-row drg-row--bot">
              <div className="drg-bot-avatar"><img src="/Bot.png" alt="Dragon" className="drg-avatar-img" /></div>
              <div className="drg-bubble drg-typing">
                <span /><span /><span />
              </div>
            </div>
          )}

          {messages.length > 1 && (
            <div className="drg-newchat-wrap">
              <button
                className="drg-newchat-btn"
                onClick={() => { setMessages(WELCOME); setInput(''); }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4.5"/>
                </svg>
                New Chat
              </button>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="drg-input-row">
          <input
            ref={inputRef}
            className="drg-input"
            placeholder="Ask about Geetika…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
          />
          <button className="drg-send" onClick={handleSend} aria-label="Send">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>
      </div>

      {/* ── FAB — hidden in contact section ── */}
      {!inContact && (
        <button
          className={`drg-fab${open ? ' drg-fab--open' : ''}`}
          onClick={() => setOpen((o) => !o)}
          aria-label="Open Dragon bot"
        >
          <span className="drg-fab-icon">
            {open
              ? <svg width="14" height="14" viewBox="0 0 12 12" fill="none"><path d="M1 1L11 11M11 1L1 11" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
              : <img src="/Bot.png" alt="Dragon" className="drg-fab-img" />
            }
          </span>
          {!open && <span className="drg-fab-pulse" />}
        </button>
      )}
    </>
  );
}
