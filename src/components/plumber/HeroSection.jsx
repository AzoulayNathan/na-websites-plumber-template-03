import React, { useEffect, useRef, useState } from 'react';
import useScrollReveal from '@/lib/useScrollReveal';
import RippleButton from './RippleButton';
import { Phone } from 'lucide-react';

export default function HeroSection({ config }) {
  const ref = useScrollReveal();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="hero" className="relative min-h-[96vh] flex items-center overflow-hidden" style={{ background: 'hsl(var(--porcelain))' }}>

      {/* Ceramic tile grid — very subtle, warm */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="tile" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              {/* Tile border */}
              <rect x="1" y="1" width="58" height="58" fill="none" stroke="hsl(var(--brass))" strokeWidth="0.3" opacity="0.18" />
              {/* Center cross detail */}
              <circle cx="30" cy="30" r="1.2" fill="hsl(var(--brass))" opacity="0.12" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#tile)" />
        </svg>
        {/* Radial warm wash bottom-right */}
        <div className="absolute bottom-0 right-0 w-2/3 h-2/3" style={{
          background: 'radial-gradient(ellipse at 80% 100%, hsl(var(--pale-blue)/0.35) 0%, transparent 65%)'
        }} />
      </div>

      <div className="w-full max-w-6xl mx-auto px-5 md:px-8 py-28 md:py-0">
        <div className="grid md:grid-cols-2 gap-14 md:gap-20 items-center">

          {/* ── Copy side ── */}
          <div ref={ref} className="reveal order-2 md:order-1">

            {/* Craft badge */}
            <div className="inline-flex items-center gap-2 mb-7">
              <span className="w-4 h-px bg-brass/60" />
              <p className="text-[11px] tracking-[0.22em] uppercase text-brass font-medium">
                Plombier artisan · {config.city}
              </p>
            </div>

            <h1 className="font-serif text-[2.6rem] md:text-5xl lg:text-[3.2rem] leading-[1.1] text-ink mb-6" style={{ letterSpacing: '-0.01em' }}>
              Une fuite, un bouchon,<br />
              une installation.<br />
              <em className="not-italic text-pipe-green">Expliqué avant d'agir.</em>
            </h1>

            <p className="text-ink/55 text-base md:text-lg leading-relaxed max-w-[22rem] mb-2 font-light">
              {config.businessName} intervient à {config.city} et autour — avec une explication claire avant chaque étape.
            </p>

            <p className="text-ink/30 text-sm italic mb-10 font-light">
              Urgence ou planifié, chaque situation mérite clarté.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-10">
              <PhoneButton config={config} />
              <RippleButton variant="secondary" href="#quote">
                Demander un devis
              </RippleButton>
            </div>

            {/* Trust row */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {[
                { dot: true, label: 'Artisan local' },
                { label: 'Explication avant travaux' },
                { label: 'Devis clair' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  {i > 0 && <span className="w-px h-3 bg-border" />}
                  {item.dot && <PulseDot />}
                  <span className="text-[11px] text-ink/35 tracking-widest uppercase">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Atelier illustration ── */}
          <div className="order-1 md:order-2 flex justify-center items-center" aria-hidden="true">
            <AtelierScene mounted={mounted} businessName={config.businessName} />
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to top, hsl(var(--background)), transparent)' }} />
    </section>
  );
}

/* ── Phone button with heartbeat ── */
function PhoneButton({ config }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={`tel:${config.phone.replace(/\s/g, '')}`}
      className="relative inline-flex items-center gap-2 px-6 py-3 rounded-sm font-medium text-sm transition-all duration-300"
      style={{
        background: hovered ? 'hsl(var(--pipe-green))' : 'hsl(var(--ink))',
        color: 'hsl(var(--porcelain))',
        boxShadow: hovered ? '0 4px 20px hsl(var(--pipe-green)/0.35)' : '0 2px 12px hsl(var(--ink)/0.18)',
        transform: hovered ? 'translateY(-1px)' : 'translateY(0)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Phone className="w-3.5 h-3.5" style={{ animation: hovered ? 'phoneBuzz 0.4s ease' : 'none' }} />
      Appeler {config.businessName}
      <style>{`@keyframes phoneBuzz{0%,100%{transform:rotate(0)}25%{transform:rotate(-8deg)}75%{transform:rotate(8deg)}}`}</style>
    </a>
  );
}

/* ── Pulsing dot ── */
function PulseDot() {
  return (
    <span className="relative flex h-2 w-2">
      <span className="absolute inline-flex h-full w-full rounded-full bg-water-green opacity-40"
        style={{ animation: 'ping 2s cubic-bezier(0,0,0.2,1) infinite' }} />
      <span className="relative inline-flex rounded-full h-2 w-2 bg-water-green/70" />
      <style>{`@keyframes ping{75%,100%{transform:scale(2);opacity:0}}`}</style>
    </span>
  );
}

/* ── Main atelier workbench illustration ── */
function AtelierScene({ mounted, businessName }) {
  const [hoverPipe, setHoverPipe] = useState(false);

  return (
    <div className="relative w-full max-w-[420px] select-none">
      {/* Workbench surface shadow */}
      <div className="absolute inset-x-4 bottom-2 h-6 rounded-full"
        style={{ background: 'hsl(var(--ink)/0.06)', filter: 'blur(8px)' }} />

      <svg viewBox="0 0 420 400" className="w-full" fill="none">
        <defs>
          <linearGradient id="benchGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--card))" />
            <stop offset="100%" stopColor="hsl(var(--muted))" />
          </linearGradient>
          <linearGradient id="copperGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--clay))" stopOpacity="0.9" />
            <stop offset="50%" stopColor="hsl(var(--brass))" />
            <stop offset="100%" stopColor="hsl(var(--clay))" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="copperH" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="hsl(var(--clay))" stopOpacity="0.7" />
            <stop offset="50%" stopColor="hsl(var(--brass))" />
            <stop offset="100%" stopColor="hsl(var(--clay))" stopOpacity="0.7" />
          </linearGradient>
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <clipPath id="benchClip">
            <rect x="20" y="220" width="380" height="140" rx="4" />
          </clipPath>
        </defs>

        {/* ── Workbench surface ── */}
        <rect x="20" y="250" width="380" height="120" rx="4" fill="url(#benchGrad)" stroke="hsl(var(--border))" strokeWidth="1" />
        {/* Wood grain lines */}
        {[265, 278, 290, 302, 316].map(y => (
          <line key={y} x1="20" y1={y} x2="400" y2={y} stroke="hsl(var(--border))" strokeWidth="0.4" opacity="0.5" />
        ))}
        {/* Bench top edge highlight */}
        <line x1="20" y1="251" x2="400" y2="251" stroke="hsl(var(--porcelain))" strokeWidth="1" opacity="0.6" />

        {/* ── Ceramic tile sample on bench ── */}
        <rect x="290" y="220" width="90" height="90" rx="3" fill="hsl(var(--pale-blue)/0.6)" stroke="hsl(var(--brass))" strokeWidth="1.2" />
        <rect x="295" y="225" width="80" height="80" rx="2" fill="none" stroke="hsl(var(--brass))" strokeWidth="0.4" opacity="0.3" />
        <circle cx="335" cy="265" r="2" fill="hsl(var(--brass))" opacity="0.3" />
        {/* Tile shadow */}
        <rect x="292" y="308" width="86" height="4" rx="2" fill="hsl(var(--ink)/0.06)" />

        {/* ── Main copper pipe — horizontal ── */}
        {/* Shadow */}
        <rect x="49" y="198" width="202" height="14" rx="7" fill="hsl(var(--ink)/0.08)" />
        {/* Body */}
        <rect x="48" y="192" width="204" height="14" rx="7" fill="url(#copperH)" />
        {/* Highlight shine */}
        <rect x="52" y="193" width="196" height="4" rx="2" fill="hsl(var(--porcelain))" opacity="0.2" />

        {/* ── Vertical pipe drop ── */}
        <rect x="134" y="108" width="14" height="90" rx="7" fill="url(#copperGrad)" />
        <rect x="135" y="110" width="4" height="85" rx="2" fill="hsl(var(--porcelain))" opacity="0.15" />

        {/* ── Elbow joint ── */}
        <circle cx="141" cy="200" r="12" fill="hsl(var(--brass))" />
        <circle cx="141" cy="200" r="7" fill="hsl(var(--clay))" opacity="0.5" />
        <circle cx="141" cy="200" r="3" fill="hsl(var(--porcelain))" opacity="0.5" />

        {/* ── Valve on horizontal pipe ── */}
        <g transform="translate(220, 199)"
          style={{ cursor: 'pointer' }}
          onMouseEnter={() => setHoverPipe(true)}
          onMouseLeave={() => setHoverPipe(false)}
        >
          {/* Valve body */}
          <rect x="-16" y="-10" width="32" height="20" rx="4" fill="hsl(var(--brass))" />
          <rect x="-12" y="-7" width="24" height="14" rx="3" fill="hsl(var(--clay))" opacity="0.45" />
          {/* Handle */}
          <rect
            x="-3" y="-18" width="6" height="12" rx="3"
            fill="hsl(var(--pipe-green))"
            style={{
              transform: hoverPipe ? 'rotate(90deg)' : 'rotate(0deg)',
              transformOrigin: '0 0',
              transition: 'transform 0.4s ease',
            }}
          />
          {/* Hover ring */}
          {hoverPipe && (
            <circle r="22" fill="none" stroke="hsl(var(--water-green))" strokeWidth="1" opacity="0.4">
              <animate attributeName="r" values="18;26" dur="0.8s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.4;0" dur="0.8s" repeatCount="indefinite" />
            </circle>
          )}
        </g>

        {/* ── Water flow inside pipe ── */}
        <clipPath id="pipeClip">
          <rect x="48" y="192" width="204" height="14" rx="7" />
        </clipPath>
        <rect x="48" y="196" width="204" height="5" fill="hsl(var(--water-green))" opacity={mounted ? 0.2 : 0}
          style={{ transition: 'opacity 1.5s ease' }} clipPath="url(#pipeClip)" />
        <rect x="48" y="196" width="40" height="5" fill="hsl(var(--water-green))" opacity={mounted ? 0.5 : 0}
          style={{ transition: 'opacity 1.5s ease' }} clipPath="url(#pipeClip)">
          <animate attributeName="x" values="30;220;30" dur="3s" repeatCount="indefinite" />
        </rect>

        {/* ── Water drop falling ── */}
        {mounted && (
          <ellipse cx="141" cy="215" rx="3.5" ry="5" fill="hsl(var(--water-green))" opacity="0.6">
            <animate attributeName="cy" values="215;248;215" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6;0.1;0.6" dur="2s" repeatCount="indefinite" />
          </ellipse>
        )}

        {/* ── Wrench tool on bench ── */}
        <g transform="translate(60, 258)">
          {/* Shadow */}
          <ellipse cx="44" cy="58" rx="38" ry="4" fill="hsl(var(--ink)/0.06)" />
          {/* Handle */}
          <rect x="14" y="8" width="60" height="10" rx="5" fill="hsl(var(--border))" stroke="hsl(var(--ink)/0.15)" strokeWidth="0.5" />
          <rect x="16" y="9" width="56" height="4" rx="2" fill="hsl(var(--porcelain))" opacity="0.35" />
          {/* Head */}
          <rect x="0" y="3" width="18" height="20" rx="4" fill="hsl(var(--border))" stroke="hsl(var(--ink)/0.15)" strokeWidth="0.5" />
          <rect x="4" y="8" width="10" height="9" rx="2" fill="hsl(var(--porcelain))" opacity="0.25" />
        </g>

        {/* ── Small notepad ── */}
        <g transform="translate(170, 255)">
          <rect x="0" y="0" width="44" height="56" rx="2" fill="hsl(var(--background))" stroke="hsl(var(--border))" strokeWidth="1" />
          <rect x="0" y="0" width="44" height="9" rx="2" fill="hsl(var(--clay))" opacity="0.25" />
          {[18, 27, 36, 45].map(y => (
            <line key={y} x1="6" y1={y} x2="38" y2={y} stroke="hsl(var(--border))" strokeWidth="0.6" />
          ))}
          {/* Water green tick */}
          <path d="M 6 36 L 10 40 L 18 30" stroke="hsl(var(--water-green))" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
          {/* Shadow */}
          <rect x="2" y="54" width="40" height="3" rx="1.5" fill="hsl(var(--ink)/0.05)" />
        </g>

        {/* ── Copper elbow on bench ── */}
        <g transform="translate(235, 260)">
          <rect x="0" y="18" width="34" height="10" rx="5" fill="url(#copperH)" opacity="0.8" />
          <rect x="12" y="0" width="10" height="22" rx="5" fill="url(#copperGrad)" opacity="0.8" />
          <circle cx="17" cy="22" r="7" fill="hsl(var(--brass))" opacity="0.7" />
          <circle cx="17" cy="22" r="3.5" fill="hsl(var(--clay))" opacity="0.5" />
        </g>

        {/* ── Business name watermark ── */}
        <text x="210" y="390" fontSize="9" fill="hsl(var(--ink))" opacity="0.18"
          fontFamily="var(--font-serif)" textAnchor="middle" letterSpacing="2">
          {businessName}
        </text>

        {/* ── Measurement annotation ── */}
        <g opacity="0.2">
          <line x1="48" y1="183" x2="252" y2="183" stroke="hsl(var(--ink))" strokeWidth="0.5" />
          <line x1="48" y1="180" x2="48" y2="186" stroke="hsl(var(--ink))" strokeWidth="0.5" />
          <line x1="252" y1="180" x2="252" y2="186" stroke="hsl(var(--ink))" strokeWidth="0.5" />
          <text x="150" y="180" fontSize="7" fill="hsl(var(--ink))" textAnchor="middle" fontFamily="var(--font-sans)">ø 22 mm</text>
        </g>
      </svg>
    </div>
  );
}