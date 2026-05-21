import React, { useEffect, useRef, useState } from 'react';
import useScrollReveal from '@/lib/useScrollReveal';
import { Phone, FileText } from 'lucide-react';

export default function FinalContact({ config }) {
  const ref = useScrollReveal();
  const [mounted, setMounted] = useState(false);
  const [phoneHover, setPhoneHover] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const pref = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (pref) { setMounted(true); return; }
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setMounted(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 md:py-40 overflow-hidden"
      style={{ background: 'hsl(var(--pipe-green))' }}
    >
      {/* Warm ceramic tile overlay on dark */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]" aria-hidden="true">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="ctaTile" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
              <rect x="1" y="1" width="46" height="46" fill="none" stroke="hsl(var(--porcelain))" strokeWidth="0.5" />
              <circle cx="24" cy="24" r="1" fill="hsl(var(--porcelain))" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ctaTile)" />
        </svg>
      </div>

      {/* Converging copper lines from edges */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg viewBox="0 0 800 500" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" fill="none">
          {[
            "M 0 0 C 120 80, 280 200, 400 260",
            "M 800 0 C 680 80, 520 200, 400 260",
            "M 0 500 C 120 420, 280 320, 400 260",
            "M 800 500 C 680 420, 520 320, 400 260",
          ].map((d, i) => (
            <path
              key={i}
              d={d}
              stroke="hsl(var(--brass)/0.18)"
              strokeWidth="1.5"
              strokeDasharray={mounted ? "none" : "6 4"}
              style={{ transition: 'opacity 1s ease' }}
              opacity={mounted ? 0.6 : 0}
            />
          ))}
          {/* Center warm glow */}
          <circle cx="400" cy="260" r={mounted ? 80 : 20} fill="hsl(var(--water-green)/0.07)"
            style={{ transition: 'r 1s ease' }} />
        </svg>
      </div>

      {/* Water line from above */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px"
        style={{
          height: mounted ? '15%' : 0,
          background: 'linear-gradient(to bottom, transparent, hsl(var(--water-green)/0.5))',
          transition: 'height 0.8s ease',
        }} />

      <div className="relative max-w-xl mx-auto px-5 md:px-8 text-center">
        <div ref={ref} className="reveal">

          {/* Small valve mark */}
          <div className="flex justify-center mb-8" aria-hidden="true">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <circle cx="18" cy="18" r="14" stroke="hsl(var(--brass)/0.4)" strokeWidth="1.5" />
              <circle cx="18" cy="18" r="6" fill="hsl(var(--water-green)/0.25)" />
              <circle cx="18" cy="18" r="3" fill="hsl(var(--water-green)/0.5)" />
              <line x1="18" y1="4" x2="18" y2="12" stroke="hsl(var(--brass)/0.5)" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>

          <h2 className="font-serif text-3xl md:text-5xl mb-5 leading-tight" style={{ color: 'hsl(var(--porcelain))' }}>
            Un artisan qui répond.<br />
            <span style={{ color: 'hsl(var(--water-green)/0.85)' }}>Une eau qui coule.</span>
          </h2>

          <p className="text-base font-light leading-relaxed max-w-sm mx-auto mb-10"
            style={{ color: 'hsl(var(--porcelain)/0.5)' }}>
            Appelez {config.businessName} pour les urgences. Envoyez un message avec quelques détails pour les travaux planifiés.
          </p>

          {/* Primary call CTA — brass with heartbeat */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">

            <div className="relative">
              {/* Pulse rings */}
              {[1, 2].map(k => (
                <div key={k} className="absolute inset-0 rounded-sm pointer-events-none"
                  style={{
                    border: '1px solid hsl(var(--water-green)/0.3)',
                    animation: `ctaPulse 2.5s ease-in-out ${k * 0.5}s infinite`,
                  }} />
              ))}
              <a
                href={`tel:${config.phone.replace(/\s/g, '')}`}
                className="relative flex items-center gap-2.5 px-8 py-4 rounded-sm text-sm font-medium transition-all duration-300"
                style={{
                  background: phoneHover ? 'hsl(var(--porcelain))' : 'hsl(var(--porcelain)/0.95)',
                  color: 'hsl(var(--pipe-green))',
                  boxShadow: phoneHover
                    ? '0 8px 32px hsl(var(--ink)/0.3), 0 0 0 2px hsl(var(--water-green)/0.3)'
                    : '0 4px 20px hsl(var(--ink)/0.2)',
                  transform: phoneHover ? 'translateY(-2px)' : 'translateY(0)',
                }}
                onMouseEnter={() => setPhoneHover(true)}
                onMouseLeave={() => setPhoneHover(false)}
              >
                <Phone className="w-4 h-4" style={{ animation: phoneHover ? 'phoneBuzz 0.4s ease' : 'none' }} />
                Appeler {config.businessName}
                <span className="ml-1 text-pipe-green/40 font-light text-xs">{config.phone}</span>
              </a>
            </div>

            <a
              href={`mailto:${config.email}?subject=Demande de devis`}
              className="flex items-center gap-2 px-6 py-4 rounded-sm text-sm font-light transition-all duration-200 hover:bg-porcelain/10"
              style={{
                border: '1px solid hsl(var(--porcelain)/0.18)',
                color: 'hsl(var(--porcelain)/0.65)',
              }}
            >
              <FileText className="w-3.5 h-3.5" />
              Demander un devis
            </a>
          </div>

          {/* Bottom copper rule */}
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-12" style={{ background: 'hsl(var(--brass)/0.25)' }} />
            <p className="text-xs tracking-[0.2em] uppercase" style={{ color: 'hsl(var(--porcelain)/0.25)' }}>
              {config.businessName} · {config.city}
            </p>
            <div className="h-px w-12" style={{ background: 'hsl(var(--brass)/0.25)' }} />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes ctaPulse {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50%       { transform: scale(1.08); opacity: 0.08; }
        }
        @keyframes phoneBuzz {
          0%,100%{ transform: rotate(0); }
          25%    { transform: rotate(-10deg); }
          75%    { transform: rotate(10deg); }
        }
      `}</style>
    </section>
  );
}