import React, { useState, useEffect, useRef } from 'react';
import { SectionDivider } from './WaterLine';
import useScrollReveal from '@/lib/useScrollReveal';

// Services as "atelier gestures"
const gestures = [
  {
    glyph: "~",
    gesture: "Diagnostiquer",
    label: "Urgence",
    service: "Réparation de fuite",
    client: "Vous entendez un bruit d'eau ou voyez une tache humide. L'objectif est de localiser la source avant de toucher quoi que ce soit.",
    detail: "Coupez l'arrivée d'eau si accessible. Éloignez les appareils électriques.",
    cta: "Appelez directement si l'eau se répand.",
    accent: 'water-green',
    accentHsl: 'var(--water-green)',
  },
  {
    glyph: "↓",
    gesture: "Déboucher",
    label: "Écoulement",
    service: "Canalisation bouchée",
    client: "L'eau ne part plus, ou repart lentement. Le problème peut être local ou plus profond dans la colonne.",
    detail: "Ne forcez pas si l'eau commence à remonter.",
    cta: "Appelez en indiquant quelle installation est concernée.",
    accent: 'clay',
    accentHsl: 'var(--clay)',
  },
  {
    glyph: "°",
    gesture: "Rétablir",
    label: "Eau chaude",
    service: "Chauffe-eau & ballon",
    client: "Plus d'eau chaude, ou le ballon fuit. On vérifie si c'est urgent, un réglage, ou un remplacement à planifier.",
    detail: "Notez si le problème touche un robinet ou toute la maison.",
    cta: "Demandez un devis ou envoyez des détails.",
    accent: 'brass',
    accentHsl: 'var(--brass)',
  },
  {
    glyph: "+",
    gesture: "Installer",
    label: "Équipement",
    service: "Robinetterie & sanitaires",
    client: "Nouveau robinet, WC, douche ou évier à poser. On comprend les raccordements, l'accès et le timing avant de commencer.",
    detail: "Décrivez la pièce, les équipements et le calendrier souhaité.",
    cta: "Demandez un devis pour les travaux planifiés.",
    accent: 'pipe-green',
    accentHsl: 'var(--pipe-green)',
  },
  {
    glyph: "◎",
    gesture: "Vérifier",
    label: "Prévention",
    service: "Inspection & maintenance",
    client: "Contrôle préventif, inspection avant rénovation ou vérification d'une installation existante pour éviter les mauvaises surprises.",
    detail: "Précisez si l'accès est limité ou si les canalisations sont anciennes.",
    cta: "Demandez un devis en décrivant l'étendue des travaux.",
    accent: 'water-green',
    accentHsl: 'var(--water-green)',
  },
  {
    glyph: "∿",
    gesture: "Nettoyer",
    label: "Entretien",
    service: "Détartrage & nettoyage",
    client: "Pression réduite, tartre visible, robinets qui grincent. Un entretien régulier prolonge la durée de vie des équipements.",
    detail: "Précisez les équipements et la date de la dernière intervention si connue.",
    cta: "Demandez un devis.",
    accent: 'clay',
    accentHsl: 'var(--clay)',
  },
];

export default function ServiceBoard() {
  const ref = useScrollReveal();
  const [active, setActive] = useState(null);
  const [hovered, setHovered] = useState(null);

  return (
    <>
      <SectionDivider />
      <section id="services" className="py-16 md:py-28" style={{ background: 'hsl(var(--muted)/0.35)' }}>
        <div className="max-w-4xl mx-auto px-5 md:px-8">

          <div ref={ref} className="reveal text-center mb-14">
            <div className="inline-flex items-center gap-3 mb-5">
              {/* Copper pipe decoration */}
              <svg width="32" height="8" viewBox="0 0 32 8" fill="none">
                <rect x="0" y="3" width="28" height="3" rx="1.5" fill="hsl(var(--brass))" opacity="0.5" />
                <circle cx="30" cy="4" r="3" fill="hsl(var(--brass))" opacity="0.6" />
              </svg>
              <p className="text-[11px] tracking-[0.22em] uppercase text-brass font-medium">Gestes d'atelier</p>
              <svg width="32" height="8" viewBox="0 0 32 8" fill="none">
                <rect x="4" y="3" width="28" height="3" rx="1.5" fill="hsl(var(--brass))" opacity="0.5" />
                <circle cx="2" cy="4" r="3" fill="hsl(var(--brass))" opacity="0.6" />
              </svg>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-ink mb-3">
              Ce que vous cherchez à résoudre.
            </h2>
            <p className="text-ink/45 max-w-lg mx-auto font-light">
              Six gestes, une seule logique : comprendre d'abord, agir ensuite.
            </p>
          </div>

          {/* Service grid */}
          <div className="grid md:grid-cols-2 gap-2">
            {gestures.map((g, i) => (
              <GestureCard
                key={g.gesture}
                gesture={g}
                index={i}
                isActive={active === i}
                isHovered={hovered === i}
                onToggle={() => setActive(active === i ? null : i)}
                onHover={() => setHovered(i)}
                onLeave={() => setHovered(null)}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function GestureCard({ gesture, index, isActive, isHovered, onToggle, onHover, onLeave }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const pref = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (pref) { setVisible(true); return; }
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => setVisible(true), index * 70);
          obs.unobserve(e.target);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [index]);

  return (
    <div
      ref={ref}
      className="rounded-sm overflow-hidden transition-all duration-200"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transition: `opacity 0.5s ease ${index * 0.07}s, transform 0.5s ease ${index * 0.07}s`,
      }}
    >
      <button
        onClick={onToggle}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        className="w-full text-left transition-all duration-300"
        style={{
          background: isActive
            ? 'hsl(var(--background))'
            : isHovered
              ? 'hsl(var(--background)/0.8)'
              : 'hsl(var(--background)/0.5)',
          borderLeft: `2px solid ${isActive || isHovered ? `hsl(${gesture.accentHsl})` : 'transparent'}`,
        }}
        aria-expanded={isActive}
      >
        <div className="px-5 py-4 flex items-center gap-4">
          {/* Glyph — the "craft mark" */}
          <div
            className="flex-shrink-0 w-10 h-10 rounded-sm flex items-center justify-center font-serif text-xl transition-all duration-300"
            style={{
              color: isActive || isHovered ? `hsl(${gesture.accentHsl})` : 'hsl(var(--ink)/0.25)',
              background: isActive || isHovered ? `hsl(${gesture.accentHsl}/0.08)` : 'hsl(var(--muted)/0.5)',
              // Copper wire hover shift
              transform: isHovered && !isActive ? 'translateX(2px)' : 'translateX(0)',
            }}
          >
            {gesture.glyph}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[9px] tracking-[0.18em] uppercase font-medium"
                style={{ color: `hsl(${gesture.accentHsl}/0.7)` }}>
                {gesture.label}
              </span>
              {/* Copper wire decoration — shifts on hover */}
              <div
                className="h-px transition-all duration-300"
                style={{
                  width: isHovered || isActive ? 20 : 10,
                  background: `hsl(${gesture.accentHsl}/0.4)`,
                }}
              />
            </div>
            <h3 className="font-serif text-lg text-ink leading-tight">
              {gesture.gesture} — <span className="text-ink/60 font-sans text-base font-light">{gesture.service}</span>
            </h3>
          </div>

          {/* Toggle */}
          <div
            className="flex-shrink-0 w-5 h-5 flex items-center justify-center text-ink/25 transition-transform duration-300"
            style={{ transform: isActive ? 'rotate(45deg)' : 'none' }}
          >
            <span className="text-lg leading-none">+</span>
          </div>
        </div>
      </button>

      {/* Expanded detail */}
      <div
        className="overflow-hidden transition-all duration-500"
        style={{ maxHeight: isActive ? 200 : 0, opacity: isActive ? 1 : 0 }}
      >
        <div className="px-5 pb-5 pt-1 ml-14 border-l"
          style={{ borderColor: `hsl(${gesture.accentHsl}/0.2)` }}>
          <p className="text-ink/55 text-sm leading-relaxed font-light mb-2">{gesture.client}</p>
          <p className="text-ink/35 text-xs font-light mb-3 italic">{gesture.detail}</p>
          <p className="text-sm font-medium" style={{ color: `hsl(${gesture.accentHsl})` }}>{gesture.cta}</p>
        </div>
      </div>
    </div>
  );
}