import React, { useEffect, useState } from 'react';

export default function Preloader({ onComplete }) {
  const [phase, setPhase] = useState(0); // 0=drop falling, 1=splash, 2=logo, 3=fade out

  useEffect(() => {
    const pref = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (pref) { onComplete(); return; }
    const t1 = setTimeout(() => setPhase(1), 700);
    const t2 = setTimeout(() => setPhase(2), 1500);
    const t3 = setTimeout(() => setPhase(3), 2800);
    const t4 = setTimeout(() => onComplete(), 3600);
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{
        background: 'hsl(var(--porcelain))',
        opacity: phase === 3 ? 0 : 1,
        transition: 'opacity 0.8s ease',
        pointerEvents: phase === 3 ? 'none' : 'all',
      }}
      aria-hidden="true"
    >
      {/* Warm ceramic tile texture */}
      <div className="absolute inset-0 opacity-[0.04]">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="preloadTile" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
              <rect x="1" y="1" width="46" height="46" fill="none" stroke="hsl(var(--brass))" strokeWidth="0.5" />
              <circle cx="24" cy="24" r="1" fill="hsl(var(--brass))" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#preloadTile)" />
        </svg>
      </div>

      <div className="relative flex flex-col items-center gap-8">
        {/* Animated SVG sequence */}
        <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
          {/* Copper pipe — horizontal, emerges in phase 2 */}
          <g style={{ opacity: phase >= 2 ? 1 : 0, transition: 'opacity 0.6s ease 0.3s' }}>
            <rect x="20" y="88" width="100" height="10" rx="5" fill="hsl(var(--brass))" opacity="0.7" />
            <rect x="22" y="89" width="96" height="3" rx="1.5" fill="hsl(var(--porcelain))" opacity="0.2" />
          </g>

          {/* Elbow joint */}
          <g style={{ opacity: phase >= 2 ? 1 : 0, transition: 'opacity 0.6s ease 0.4s' }}>
            <circle cx="70" cy="93" r="9" fill="hsl(var(--brass))" />
            <circle cx="70" cy="93" r="5" fill="hsl(var(--clay))" opacity="0.5" />
          </g>

          {/* Splash rings — phase 1 */}
          {[1, 2, 3].map((k) => (
            <circle
              key={k}
              cx="70" cy="93" r={k * 14}
              stroke="hsl(var(--water-green))"
              strokeWidth="0.8"
              fill="none"
              style={{
                opacity: phase === 1 ? 0 : 0,
                animation: phase >= 1 ? `preRipple 1.4s ease-out ${(k - 1) * 0.18}s forwards` : 'none',
              }}
            />
          ))}

          {/* Water drop — falls in phase 0 */}
          <g style={{
            opacity: phase === 0 ? 1 : phase === 1 ? 0.6 : 0,
            transform: phase >= 1 ? 'translateY(8px)' : 'translateY(0)',
            transition: 'opacity 0.3s ease, transform 0.3s ease',
          }}>
            <path
              d="M70 22 C70 22 54 46 54 62 C54 72 61 80 70 80 C79 80 86 72 86 62 C86 46 70 22 70 22Z"
              fill="hsl(var(--water-green))"
            />
            {/* Highlight */}
            <ellipse cx="63" cy="52" rx="4" ry="7" fill="hsl(var(--porcelain))" opacity="0.25" transform="rotate(-15 63 52)" />
          </g>

          {/* Splash splash mark */}
          {phase === 1 && (
            <ellipse cx="70" cy="92" rx="22" ry="7" fill="hsl(var(--water-green))" opacity="0.25" />
          )}

          {/* Water line flowing in pipe — phase 2 */}
          {phase >= 2 && (
            <rect x="24" y="91" width="18" height="4" rx="2" fill="hsl(var(--water-green))" opacity="0.55">
              <animate attributeName="x" values="20;100;20" dur="2.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.55;0.15;0.55" dur="2.5s" repeatCount="indefinite" />
            </rect>
          )}
        </svg>

        {/* Brand text — phase 2 */}
        <div
          className="text-center"
          style={{
            opacity: phase >= 2 ? 1 : 0,
            transform: phase >= 2 ? 'translateY(0)' : 'translateY(14px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          <p className="font-serif text-[1.6rem] text-ink tracking-wide leading-none mb-2">
            Atelier Eau Claire
          </p>
          {/* Copper rule */}
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="h-px w-6 bg-brass/40" />
            <p className="text-[10px] tracking-[0.3em] uppercase text-water-green font-light">
              Plombier artisan
            </p>
            <span className="h-px w-6 bg-brass/40" />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes preRipple {
          0%  { opacity: 0.65; transform: scale(0.3); }
          100% { opacity: 0; transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
}