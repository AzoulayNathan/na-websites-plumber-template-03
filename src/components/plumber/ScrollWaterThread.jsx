import React, { useEffect, useRef, useState } from 'react';

/**
 * A thin luminous water thread that runs the full height of the page,
 * drawing itself as the user scrolls. Absolutely positioned behind all content.
 */
export default function ScrollWaterThread() {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) { setProgress(1); return; }

    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        setProgress(maxScroll > 0 ? Math.min(1, scrollY / maxScroll) : 0);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // The SVG path snakes gently left/right across sections
  const totalH = 3600;
  const w = 40;

  // A sinuous path that morphs: vertical → wave → horizontal rule-like → wave
  const pathD = `
    M ${w / 2} 0
    C ${w / 2} 200, ${w / 2} 300, ${w * 0.3} 450
    C ${w * 0.1} 600, ${w * 0.9} 750, ${w / 2} 900
    C ${w * 0.15} 1050, ${w * 0.85} 1200, ${w / 2} 1350
    C ${w / 2} 1500, ${w / 2} 1650, ${w * 0.2} 1800
    C ${w * 0.05} 1950, ${w * 0.95} 2100, ${w / 2} 2250
    C ${w * 0.1} 2400, ${w * 0.9} 2550, ${w / 2} 2700
    C ${w / 2} 2850, ${w / 2} 3000, ${w * 0.3} 3150
    C ${w * 0.1} 3300, ${w * 0.9} 3450, ${w / 2} ${totalH}
  `;

  return (
    <div
      className="fixed left-2 md:left-5 top-0 bottom-0 z-10 pointer-events-none"
      aria-hidden="true"
      style={{ width: w }}
    >
      <svg
        width={w}
        height="100vh"
        viewBox={`0 0 ${w} 100`}
        preserveAspectRatio="none"
        style={{ height: '100%', width: '100%' }}
      >
        <defs>
          <linearGradient id="threadGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--water-green))" stopOpacity="0.9" />
            <stop offset="60%" stopColor="hsl(var(--pale-blue))" stopOpacity="0.6" />
            <stop offset="100%" stopColor="hsl(var(--clay))" stopOpacity="0.8" />
          </linearGradient>
          <filter id="threadGlow">
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Track (ghost line) */}
        <line
          x1={w / 2} y1="0" x2={w / 2} y2="100"
          stroke="hsl(var(--border))"
          strokeWidth="0.5"
          opacity="0.4"
        />

        {/* Animated fill — clip by progress */}
        <clipPath id="progressClip">
          <rect x="0" y="0" width={w} height={`${progress * 100}%`} />
        </clipPath>

        <line
          x1={w / 2} y1="0" x2={w / 2} y2="100"
          stroke="url(#threadGrad)"
          strokeWidth="1.5"
          strokeLinecap="round"
          filter="url(#threadGlow)"
          clipPath="url(#progressClip)"
        />

        {/* Moving droplet at the tip */}
        <circle
          cx={w / 2}
          cy={`${progress * 100}%`}
          r="3"
          fill="hsl(var(--water-green))"
          opacity="0.8"
        >
          <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
}