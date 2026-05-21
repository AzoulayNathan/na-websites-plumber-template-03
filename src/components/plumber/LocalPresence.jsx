import React, { useState, useEffect, useRef } from 'react';
import { SectionDivider } from './WaterLine';
import useScrollReveal from '@/lib/useScrollReveal';

export default function LocalPresence({ config }) {
  const ref = useScrollReveal();
  const [hovered, setHovered] = useState(null);
  const [pulse, setPulse] = useState(null);

  const areas = [
    config.serviceArea1,
    config.serviceArea2,
    config.serviceArea3,
    config.serviceArea4,
    config.serviceArea5,
  ];

  const positions = [
    { angle: -65, dist: 108 },
    { angle: -15, dist: 118 },
    { angle: 35, dist: 100 },
    { angle: 105, dist: 112 },
    { angle: 155, dist: 104 },
  ];

  const cx = 170, cy = 170;

  return (
    <>
      <SectionDivider />
      <section id="local" className="py-16 md:py-28">
        <div className="max-w-4xl mx-auto px-5 md:px-8">
          <div ref={ref} className="reveal text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-ink mb-3">
              Autour de {config.city}
            </h2>
            <p className="text-ink/50 max-w-md mx-auto font-light">
              Un réseau de présence locale, comme un plan de quartier élégant.
            </p>
          </div>

          {/* Desktop: crystal network map */}
          <div className="hidden md:flex justify-center mb-6">
            <div className="relative" style={{ width: 340, height: 340 }}>
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 340 340" fill="none">
                <defs>
                  <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="hsl(var(--water-green))" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="hsl(var(--water-green))" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Subtle glow behind center */}
                <circle cx={cx} cy={cy} r="50" fill="url(#centerGlow)" />

                {/* Connection lines */}
                {positions.map((pos, i) => {
                  const rad = (pos.angle * Math.PI) / 180;
                  const x = cx + Math.cos(rad) * pos.dist;
                  const y = cy + Math.sin(rad) * pos.dist;
                  const isHovered = hovered === i;
                  return (
                    <g key={i}>
                      {/* Ghost track */}
                      <line x1={cx} y1={cy} x2={x} y2={y}
                        stroke="hsl(var(--border))" strokeWidth="1" opacity="0.4" />
                      {/* Active water line */}
                      <line x1={cx} y1={cy} x2={x} y2={y}
                        stroke="hsl(var(--water-green))"
                        strokeWidth={isHovered ? 2 : 0}
                        opacity={isHovered ? 0.7 : 0}
                        style={{ transition: 'all 0.3s ease' }}
                      />
                      {/* Flow dot */}
                      {isHovered && (
                        <circle r="3" fill="hsl(var(--water-green))" opacity="0.8">
                          <animateMotion
                            path={`M ${cx} ${cy} L ${x} ${y}`}
                            dur="1s" repeatCount="indefinite"
                          />
                        </circle>
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* Center node */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div
                  className="w-20 h-20 rounded-full bg-pipe-green flex items-center justify-center"
                  style={{ boxShadow: '0 4px 20px hsl(var(--pipe-green)/0.3)' }}
                >
                  <span className="text-porcelain text-xs font-sans font-medium tracking-wide text-center leading-tight px-2">
                    {config.city}
                  </span>
                </div>
              </div>

              {/* Crystal area nodes */}
              {areas.map((area, i) => {
                const rad = (positions[i].angle * Math.PI) / 180;
                const x = cx + Math.cos(rad) * positions[i].dist;
                const y = cy + Math.sin(rad) * positions[i].dist;
                const isHovered = hovered === i;

                return (
                  <div
                    key={area}
                    className="absolute -translate-x-1/2 -translate-y-1/2 cursor-default z-10"
                    style={{ left: x, top: y }}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    {/* Crystal shape */}
                    <div
                      className="relative"
                      style={{
                        transform: isHovered ? 'translateY(-3px) scale(1.05)' : 'translateY(0) scale(1)',
                        transition: 'transform 0.3s ease',
                      }}
                    >
                      <svg width="10" height="14" viewBox="0 0 10 14" className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <polygon
                          points="5,0 10,5 5,14 0,5"
                          fill={isHovered ? 'hsl(var(--water-green))' : 'hsl(var(--pale-blue))'}
                          opacity={isHovered ? 0.8 : 0.5}
                          style={{ transition: 'all 0.3s ease' }}
                        />
                      </svg>
                      <div className={`px-3 py-1.5 rounded-sm border text-xs font-sans transition-all duration-300 mt-1 ${
                        isHovered
                          ? 'bg-water-green/10 border-water-green/50 text-ink'
                          : 'bg-background border-border/60 text-ink/50'
                      }`}>
                        {area}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile */}
          <div className="md:hidden relative">
            <div className="absolute left-3 top-0 bottom-0 w-px bg-border" aria-hidden="true" />
            <div className="space-y-3 pl-8">
              {areas.map((area, i) => (
                <div key={area} className="flex items-center gap-3 relative">
                  <div className="absolute -left-5 w-2 h-2 rounded-full bg-water-green/40 border border-water-green/60" />
                  <svg width="8" height="12" viewBox="0 0 10 14" className="flex-shrink-0">
                    <polygon points="5,0 10,5 5,14 0,5" fill="hsl(var(--water-green))" opacity="0.4" />
                  </svg>
                  <div className="px-4 py-3 bg-background rounded-sm border border-border/50 text-sm text-ink/70 flex-1">
                    {area}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-center text-xs text-ink/35 mt-8 italic">
            Précisez votre secteur lors de l'appel ou de la demande de devis.
          </p>
        </div>
      </section>
    </>
  );
}