import React, { useEffect, useRef, useState } from 'react';
import { SectionDivider } from './WaterLine';

const steps = [
  {
    num: "01",
    title: "Écouter",
    sub: "Comprendre avant d'agir",
    text: "Fuite, bouchon, équipement défaillant — tout commence par une description claire de ce qui se passe. Pas de diagnostic hâtif.",
    svg: <ListenSVG />,
  },
  {
    num: "02",
    title: "Identifier",
    sub: "La cause probable",
    text: "Avant de sortir un outil, on comprend la situation. L'objectif est d'éviter la mauvaise réparation.",
    svg: <InspectSVG />,
  },
  {
    num: "03",
    title: "Expliquer",
    sub: "Ce qui va être fait",
    text: "Le client sait ce qui est envisagé, pourquoi, et combien de temps — avant que le travail commence.",
    svg: <ExplainSVG />,
  },
  {
    num: "04",
    title: "Intervenir",
    sub: "Proprement, précisément",
    text: "L'atelier laissé propre, les protections posées, et une étape suivante claire si besoin.",
    svg: <ActSVG />,
  },
];

function ListenSVG() {
  return (
    <svg viewBox="0 0 64 64" width="56" height="56" fill="none">
      <ellipse cx="32" cy="30" rx="18" ry="22" stroke="hsl(var(--brass))" strokeWidth="2.5" fill="hsl(var(--pale-blue)/0.25)" />
      <path d="M 23 26 Q 32 16 41 26 Q 50 36 40 44 Q 36 48 36 54" stroke="hsl(var(--water-green))" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <circle cx="36" cy="57" r="2.5" fill="hsl(var(--water-green))" opacity="0.6" />
    </svg>
  );
}
function InspectSVG() {
  return (
    <svg viewBox="0 0 64 64" width="56" height="56" fill="none">
      <circle cx="27" cy="26" r="15" stroke="hsl(var(--brass))" strokeWidth="2.5" fill="hsl(var(--pale-blue)/0.2)" />
      <circle cx="27" cy="26" r="8" stroke="hsl(var(--water-green))" strokeWidth="1" opacity="0.5" />
      <circle cx="27" cy="26" r="3" fill="hsl(var(--water-green))" opacity="0.4" />
      <line x1="38" y1="38" x2="52" y2="52" stroke="hsl(var(--brass))" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}
function ExplainSVG() {
  return (
    <svg viewBox="0 0 64 64" width="56" height="56" fill="none">
      <rect x="10" y="8" width="44" height="52" rx="3" fill="hsl(var(--pale-blue)/0.2)" stroke="hsl(var(--brass))" strokeWidth="2" />
      <rect x="10" y="8" width="9" height="52" rx="2" fill="hsl(var(--clay))" opacity="0.15" />
      <line x1="24" y1="22" x2="48" y2="22" stroke="hsl(var(--ink))" strokeWidth="1" opacity="0.25" />
      <line x1="24" y1="30" x2="48" y2="30" stroke="hsl(var(--ink))" strokeWidth="1" opacity="0.2" />
      <line x1="24" y1="38" x2="40" y2="38" stroke="hsl(var(--water-green))" strokeWidth="1.2" opacity="0.6" />
      <path d="M 42 42 L 54 30 L 58 34 L 46 46 Z" fill="hsl(var(--clay))" opacity="0.5" />
    </svg>
  );
}
function ActSVG() {
  return (
    <svg viewBox="0 0 64 64" width="56" height="56" fill="none">
      {/* Wrench */}
      <rect x="10" y="28" width="38" height="8" rx="4" fill="hsl(var(--brass))" opacity="0.7" />
      <rect x="11" y="29" width="34" height="3" rx="1.5" fill="hsl(var(--porcelain))" opacity="0.2" />
      <rect x="6" y="22" width="14" height="20" rx="4" fill="hsl(var(--brass))" />
      <rect x="9" y="27" width="8" height="10" rx="2" fill="hsl(var(--porcelain))" opacity="0.2" />
      {/* Water drop check */}
      <path d="M 40 18 C 40 18 34 26 34 31 C 34 35 37 37 40 37 C 43 37 46 35 46 31 C 46 26 40 18 40 18Z" fill="hsl(var(--water-green))" opacity="0.5" />
      <path d="M 36 30 L 39 33 L 44 25" stroke="hsl(var(--porcelain))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ArtisanPromise() {
  const containerRef = useRef(null);
  const [lineProgress, setLineProgress] = useState(0);

  useEffect(() => {
    const pref = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const handleScroll = () => {
      if (!containerRef.current || pref) { setLineProgress(1); return; }
      const rect = containerRef.current.getBoundingClientRect();
      const wh = window.innerHeight;
      if (rect.top > wh) { setLineProgress(0); return; }
      const p = Math.min(1, Math.max(0, (wh - rect.top) / (rect.height + wh * 0.4)));
      setLineProgress(p);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <SectionDivider />
      <section id="promise" className="py-16 md:py-28" style={{ background: 'hsl(var(--background))' }}>
        <div className="max-w-4xl mx-auto px-5 md:px-8">

          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-brass/40" />
              <p className="text-[11px] tracking-[0.22em] uppercase text-water-green font-medium">
                La bonne plomberie, c'est aussi la bonne communication
              </p>
              <span className="h-px w-8 bg-brass/40" />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-ink">
              Avant le travail, l'explication.
            </h2>
          </div>

          {/* Desktop 4-col */}
          <div ref={containerRef} className="hidden md:block relative">
            {/* Copper thread track */}
            <div className="absolute top-[52px] left-[12.5%] right-[12.5%] h-px" aria-hidden="true">
              <div className="w-full h-full bg-border/60" />
              <div
                className="absolute top-0 left-0 h-full bg-water-green/50 transition-all duration-300"
                style={{ width: `${lineProgress * 100}%` }}
              />
              {/* Moving dot on thread */}
              <div
                className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-water-green"
                style={{
                  left: `${lineProgress * 100}%`,
                  transform: `translateX(-50%) translateY(-50%)`,
                  opacity: lineProgress > 0 && lineProgress < 1 ? 1 : 0,
                  transition: 'left 0.3s ease, opacity 0.3s ease',
                  boxShadow: '0 0 6px hsl(var(--water-green)/0.6)',
                }}
              />
            </div>

            <div className="grid grid-cols-4 gap-8">
              {steps.map((s, i) => (
                <StepCard key={s.num} step={s} index={i} progress={lineProgress} />
              ))}
            </div>
          </div>

          {/* Mobile vertical */}
          <div ref={containerRef} className="md:hidden relative pl-10">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-border" aria-hidden="true">
              <div
                className="w-full bg-water-green/50 transition-all duration-300"
                style={{ height: `${lineProgress * 100}%` }}
              />
            </div>
            <div className="space-y-10">
              {steps.map((s, i) => (
                <MobileStep key={s.num} step={s} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function StepCard({ step, index, progress }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const activated = progress >= index / 3;

  useEffect(() => {
    const pref = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (pref) { setVisible(true); return; }
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(e.target); } },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    setTilt({
      x: ((e.clientX - r.left) / r.width - 0.5) * 14,
      y: ((e.clientY - r.top) / r.height - 0.5) * -14,
    });
  };

  return (
    <div
      ref={ref}
      className="flex flex-col items-center text-center gap-3"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.6s ease ${index * 0.13}s, transform 0.6s ease ${index * 0.13}s`,
      }}
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
    >
      {/* Icon tile */}
      <div
        className="relative w-[104px] h-[104px] rounded-sm flex items-center justify-center border transition-all duration-300"
        style={{
          background: activated
            ? 'linear-gradient(145deg, hsl(var(--background)), hsl(var(--pale-blue)/0.3))'
            : 'hsl(var(--muted)/0.6)',
          borderColor: activated ? 'hsl(var(--brass)/0.4)' : 'hsl(var(--border)/0.5)',
          transform: `perspective(500px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
          boxShadow: activated
            ? `${-tilt.x * 0.4}px 8px 28px hsl(var(--ink)/0.07), inset 0 1px 0 hsl(var(--porcelain)/0.5)`
            : 'none',
          transition: 'background 0.4s ease, border-color 0.4s ease, transform 0.12s ease, box-shadow 0.12s ease',
        }}
      >
        {step.svg}
        {/* Activated: water drop accent */}
        {activated && (
          <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-water-green/60" />
        )}
      </div>

      <span className="text-[10px] tracking-[0.2em] text-clay font-medium">{step.num}</span>
      <h3 className="font-serif text-lg text-ink leading-none">{step.title}</h3>
      <p className="text-[11px] text-water-green uppercase tracking-wider mb-1">{step.sub}</p>
      <p className="text-ink/45 text-sm font-light leading-relaxed">{step.text}</p>
    </div>
  );
}

function MobileStep({ step, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const pref = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (pref) { setVisible(true); return; }
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(e.target); } },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`,
      }}
    >
      <div className="absolute -left-7 top-2 w-3 h-3 rounded-full border-2 border-water-green bg-background" />
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-14 h-14 rounded-sm bg-background border border-border/50 flex items-center justify-center">
          {step.svg}
        </div>
        <div>
          <span className="text-[10px] text-clay tracking-widest font-medium">{step.num}</span>
          <h3 className="font-serif text-xl text-ink mt-0.5 mb-0.5">{step.title}</h3>
          <p className="text-[11px] text-water-green uppercase tracking-wider mb-1">{step.sub}</p>
          <p className="text-ink/50 text-sm font-light leading-relaxed">{step.text}</p>
        </div>
      </div>
    </div>
  );
}