import React from 'react';

export default function WaterLine({ className = '' }) {
  return (
    <div className={`pointer-events-none select-none ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 2 120"
        className="w-[2px] h-full mx-auto"
        preserveAspectRatio="none"
      >
        <line
          x1="1" y1="0" x2="1" y2="120"
          stroke="hsl(var(--water-green))"
          strokeWidth="1.5"
          className="water-line-draw"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

export function WaterDot({ size = 8, className = '' }) {
  return (
    <div
      className={`rounded-full bg-water-green/40 border border-water-green/60 ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    />
  );
}

export function SectionDivider() {
  return (
    <div className="flex flex-col items-center py-6" aria-hidden="true">
      <div className="w-px h-16 bg-gradient-to-b from-transparent via-water-green/30 to-transparent" />
      <WaterDot size={6} className="my-2" />
      <div className="w-px h-16 bg-gradient-to-b from-transparent via-water-green/30 to-transparent" />
    </div>
  );
}