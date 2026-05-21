import React, { useState, useRef, useEffect } from 'react';
import { SectionDivider } from './WaterLine';
import useScrollReveal from '@/lib/useScrollReveal';

const details = [
  { title: "Protéger la zone autant que possible", icon: "◻" },
  { title: "Expliquer ce qui a été vérifié", icon: "◎" },
  { title: "Éviter la confusion inutile", icon: "○" },
  { title: "Laisser une étape suivante claire", icon: "→" },
];

export default function InterventionMindset() {
  const ref = useScrollReveal();
  const [scrollBalance, setScrollBalance] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const pref = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (pref) { setScrollBalance(1); return; }

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / (rect.height + window.innerHeight * 0.3)));
      setScrollBalance(progress);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <SectionDivider />
      <section id="mindset" ref={sectionRef} className="py-16 md:py-28">
        <div className="max-w-4xl mx-auto px-5 md:px-8">
          <div ref={ref} className="reveal">
            <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">

              {/* Balance visual — animated */}
              <div className="relative" aria-hidden="true">
                <BalanceVisual progress={scrollBalance} />
              </div>

              {/* Copy */}
              <div>
                <h2 className="font-serif text-2xl md:text-3xl text-ink mb-4 leading-snug">
                  Réparer, c'est bien.<br />Laisser la maison propre, c'est mieux.
                </h2>
                <p className="text-ink/50 leading-relaxed font-light mb-8">
                  La plomberie se passe dans de vraies maisons. Un esprit d'intervention clair signifie protéger la zone, expliquer ce qui a été fait, et laisser au client une étape simple à suivre.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {details.map((d, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="text-water-green/70 text-sm mt-0.5 font-mono">{d.icon}</span>
                      <p className="text-ink/60 text-sm font-light">{d.title}</p>
                    </div>
                  ))}
                </div>

                {/* Water thread on foam */}
                <div className="mt-8 relative h-px bg-border overflow-visible">
                  <div
                    className="absolute left-0 top-0 h-px bg-water-green transition-all duration-700"
                    style={{ width: `${scrollBalance * 100}%` }}
                  />
                  <div
                    className="absolute -top-1 w-2 h-2 rounded-full bg-water-green transition-all duration-700"
                    style={{ left: `${scrollBalance * 100}%`, transform: 'translateX(-50%)' }}
                  />
                </div>
                <p className="text-xs text-ink/30 mt-3 italic">
                  Le fil d'eau claire glisse sur la mousse de la boîte.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function BalanceVisual({ progress }) {
  // progress 0→1: disorder fades, toolbox rises
  const tilt = (0.5 - progress) * 12; // tilt angle

  return (
    <div className="aspect-[4/3] relative flex items-end justify-center pb-4">
      <svg viewBox="0 0 300 220" className="w-full h-full" fill="none">
        {/* Beam */}
        <line
          x1="50" y1="110"
          x2="250" y2="110"
          stroke="hsl(var(--brass))"
          strokeWidth="3"
          strokeLinecap="round"
          transform={`rotate(${tilt}, 150, 110)`}
          style={{ transition: 'transform 0.6s ease' }}
        />
        {/* Pivot */}
        <rect x="145" y="110" width="10" height="40" fill="hsl(var(--brass))" opacity="0.6" />
        <rect x="130" y="148" width="40" height="6" rx="3" fill="hsl(var(--brass))" opacity="0.5" />

        {/* Left side — disorder (fades with progress) */}
        <g
          transform={`translate(0, ${tilt * 0.8}) rotate(${tilt}, 75, 110)`}
          opacity={1 - progress * 0.85}
          style={{ transition: 'opacity 0.5s ease' }}
        >
          {/* Messy pile */}
          <ellipse cx="75" cy="105" rx="28" ry="12" fill="hsl(var(--border)/0.6)" />
          <rect x="55" y="85" width="18" height="8" rx="2" fill="hsl(var(--muted-foreground)/0.4)" transform="rotate(-15, 64, 89)" />
          <rect x="72" y="82" width="22" height="6" rx="2" fill="hsl(var(--muted-foreground)/0.3)" transform="rotate(10, 83, 85)" />
          <rect x="58" y="96" width="14" height="5" rx="1" fill="hsl(var(--muted-foreground)/0.3)" transform="rotate(-5, 65, 98)" />
          <circle cx="85" cy="90" r="5" fill="hsl(var(--border))" />
        </g>

        {/* Right side — toolbox (rises with progress) */}
        <g
          transform={`translate(0, ${-tilt * 0.8}) rotate(${tilt}, 225, 110)`}
          style={{ transition: 'opacity 0.5s ease' }}
        >
          {/* Open toolbox */}
          <rect
            x="195" y="78" width="60" height="38" rx="4"
            fill="hsl(var(--pipe-green)/0.9)"
            stroke="hsl(var(--pipe-green))"
            strokeWidth="1.5"
          />
          {/* Foam cutouts */}
          <rect x="200" y="84" width="12" height="18" rx="3" fill="hsl(var(--background))" opacity="0.7" />
          <rect x="216" y="84" width="10" height="18" rx="3" fill="hsl(var(--background))" opacity="0.7" />
          <rect x="230" y="84" width="8" height="18" rx="3" fill="hsl(var(--background))" opacity="0.7" />
          <rect x="242" y="84" width="8" height="18" rx="3" fill="hsl(var(--background))" opacity="0.7" />
          {/* Tools in foam */}
          <rect x="202" y="86" width="8" height="14" rx="2" fill="hsl(var(--brass))" opacity={progress} style={{ transition: 'opacity 0.5s ease' }} />
          <rect x="218" y="87" width="6" height="12" rx="2" fill="hsl(var(--clay))" opacity={progress} style={{ transition: 'opacity 0.5s ease 0.1s' }} />
          <rect x="231" y="88" width="5" height="10" rx="2" fill="hsl(var(--water-green))" opacity={progress} style={{ transition: 'opacity 0.5s ease 0.2s' }} />
          {/* Handle */}
          <path d="M 210 78 Q 225 68 240 78" stroke="hsl(var(--brass))" strokeWidth="2.5" fill="none" />
        </g>

        {/* Water line on foam (progress driven) */}
        <line
          x1="195" y1="88"
          x2={195 + 55 * progress}
          y2="88"
          stroke="hsl(var(--water-green))"
          strokeWidth="1.5"
          opacity={progress * 0.7}
          strokeLinecap="round"
          style={{ transition: 'all 0.6s ease' }}
        />
      </svg>

      <p className="absolute bottom-0 left-0 right-0 text-center text-xs text-ink/30 italic">
        Ici, on laisse votre maison plus propre qu'on ne l'a trouvée.
      </p>
    </div>
  );
}