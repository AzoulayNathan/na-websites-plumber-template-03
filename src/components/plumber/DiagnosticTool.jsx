import React, { useState } from 'react';
import { SectionDivider } from './WaterLine';
import useScrollReveal from '@/lib/useScrollReveal';
import RippleButton from './RippleButton';
import { Phone, FileText } from 'lucide-react';

const options = [
  {
    label: "Eau qui fuit",
    emoji: "💧",
    explanation: "Localisez d'où vient l'eau et coupez l'arrivée d'eau si accessible.",
    action: "Si l'eau se répand, appelez directement.",
    cta: "call",
    visual: <LeakVisual />,
  },
  {
    label: "L'eau ne s'écoule pas",
    emoji: "🌀",
    explanation: "Évitez de forcer si l'eau remonte ou revient.",
    action: "Appelez en décrivant quelle installation est concernée.",
    cta: "call",
    visual: <DrainVisual />,
  },
  {
    label: "Pas d'eau chaude",
    emoji: "🌡️",
    explanation: "Notez si le problème touche un seul robinet ou toute la maison.",
    action: "Demandez de l'aide ou envoyez les détails du chauffe-eau.",
    cta: "quote",
    visual: <HeaterVisual />,
  },
  {
    label: "Un robinet ou WC à remplacer",
    emoji: "🔧",
    explanation: "Des photos et les détails de l'équipement peuvent aider à clarifier la demande.",
    action: "Demandez un devis pour des travaux planifiés.",
    cta: "quote",
    visual: <FaucetVisual />,
  },
  {
    label: "Je planifie des travaux",
    emoji: "📐",
    explanation: "Décrivez la pièce, les équipements, l'accès et le timing souhaité.",
    action: "Envoyez une demande de devis.",
    cta: "quote",
    visual: <PlanVisual />,
  },
];

function LeakVisual() {
  return (
    <svg viewBox="0 0 200 100" width="100%" height="80" fill="none">
      <rect x="20" y="20" width="160" height="30" rx="8" fill="hsl(var(--brass)/0.6)" stroke="hsl(var(--brass))" strokeWidth="2" />
      <rect x="20" y="20" width="160" height="30" rx="8" fill="hsl(var(--clay)/0.1)" />
      {/* Crack */}
      <path d="M 90 22 L 95 35 L 88 50" stroke="hsl(var(--clay))" strokeWidth="2" strokeLinecap="round" />
      {/* Water drops */}
      <ellipse cx="91" cy="58" rx="4" ry="6" fill="hsl(var(--water-green))" opacity="0.7">
        <animate attributeName="cy" values="55;65;55" dur="1.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.7;0.2;0.7" dur="1.5s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="89" cy="70" rx="3" ry="4" fill="hsl(var(--water-green))" opacity="0.4">
        <animate attributeName="cy" values="68;80;68" dur="2s" begin="0.5s" repeatCount="indefinite" />
      </ellipse>
      {/* Valve closing */}
      <circle cx="165" cy="35" r="12" fill="hsl(var(--pipe-green))" opacity="0.9" />
      <line x1="159" y1="29" x2="171" y2="41" stroke="white" strokeWidth="2" />
      <line x1="171" y1="29" x2="159" y2="41" stroke="white" strokeWidth="2" />
    </svg>
  );
}
function DrainVisual() {
  return (
    <svg viewBox="0 0 200 100" width="100%" height="80" fill="none">
      <rect x="30" y="15" width="140" height="50" rx="6" fill="hsl(var(--pale-blue)/0.4)" stroke="hsl(var(--border))" strokeWidth="1.5" />
      {/* Swirl */}
      <path d="M 100 40 C 110 30 120 40 110 50 C 100 60 90 50 100 40" stroke="hsl(var(--water-green))" strokeWidth="2" fill="none">
        <animateTransform attributeName="transform" type="rotate" values="0 100 45;360 100 45" dur="2s" repeatCount="indefinite" />
      </path>
      <circle cx="100" cy="45" r="4" fill="hsl(var(--water-green))" opacity="0.5" />
      {/* Blocked indicator */}
      <rect x="85" y="72" width="30" height="8" rx="4" fill="hsl(var(--clay))" opacity="0.7" />
      <line x1="95" y1="76" x2="115" y2="76" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function HeaterVisual() {
  return (
    <svg viewBox="0 0 200 100" width="100%" height="80" fill="none">
      <rect x="75" y="10" width="50" height="70" rx="8" fill="hsl(var(--pale-blue)/0.3)" stroke="hsl(var(--brass))" strokeWidth="2" />
      <circle cx="100" cy="45" r="14" fill="hsl(var(--background))" stroke="hsl(var(--border))" strokeWidth="1" />
      <path d="M 94 50 Q 100 36 106 50 Q 100 40 94 50" fill="hsl(var(--clay))" opacity="0.6">
        <animate attributeName="opacity" values="0.4;0.8;0.4" dur="1.5s" repeatCount="indefinite" />
      </path>
      <line x1="100" y1="10" x2="100" y2="0" stroke="hsl(var(--border))" strokeWidth="2" />
      <line x1="100" y1="80" x2="100" y2="95" stroke="hsl(var(--border))" strokeWidth="2" />
    </svg>
  );
}
function FaucetVisual() {
  return (
    <svg viewBox="0 0 200 100" width="100%" height="80" fill="none">
      <path d="M 60 30 L 90 30 L 90 50 C 90 64 100 70 110 70 L 130 70" stroke="hsl(var(--brass))" strokeWidth="8" strokeLinecap="round" fill="none" />
      <path d="M 60 30 L 90 30 L 90 50 C 90 64 100 70 110 70 L 130 70" stroke="hsl(var(--clay))" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.4" />
      <circle cx="60" cy="30" r="10" fill="hsl(var(--brass))" />
      <line x1="55" y1="25" x2="65" y2="35" stroke="hsl(var(--porcelain))" strokeWidth="2" />
      <line x1="65" y1="25" x2="55" y2="35" stroke="hsl(var(--porcelain))" strokeWidth="2" />
    </svg>
  );
}
function PlanVisual() {
  return (
    <svg viewBox="0 0 200 100" width="100%" height="80" fill="none">
      <rect x="20" y="15" width="160" height="70" rx="3" fill="hsl(var(--pale-blue)/0.2)" stroke="hsl(var(--border))" strokeWidth="1" />
      <line x1="20" y1="30" x2="180" y2="30" stroke="hsl(var(--border))" strokeWidth="0.5" />
      {/* Blueprint lines */}
      <rect x="30" y="38" width="60" height="38" rx="2" fill="none" stroke="hsl(var(--water-green))" strokeWidth="1" strokeDasharray="3 2" />
      <rect x="100" y="38" width="70" height="38" rx="2" fill="none" stroke="hsl(var(--water-green))" strokeWidth="1" strokeDasharray="3 2" opacity="0.5" />
      <line x1="90" y1="57" x2="100" y2="57" stroke="hsl(var(--clay))" strokeWidth="1.5" />
      {/* Pencil */}
      <path d="M 140 20 L 155 10 L 160 15 L 145 25 Z" fill="hsl(var(--clay))" opacity="0.8" />
    </svg>
  );
}

export default function DiagnosticTool({ config }) {
  const ref = useScrollReveal();
  const [selected, setSelected] = useState(null);

  return (
    <>
      <SectionDivider />
      <section id="diagnostic" className="py-16 md:py-28" style={{ background: 'hsl(var(--pale-blue)/0.25)' }}>
        <div className="max-w-3xl mx-auto px-5 md:px-8">
          <div ref={ref} className="reveal text-center mb-12">
            {/* Copper wires radiating */}
            <div className="flex justify-center mb-6" aria-hidden="true">
              <svg width="80" height="40" viewBox="0 0 80 40" fill="none">
                {[0, 1, 2, 3, 4].map(i => {
                  const angle = (-60 + i * 30) * Math.PI / 180;
                  return (
                    <line
                      key={i}
                      x1="40" y1="40"
                      x2={40 + Math.cos(angle) * 34}
                      y2={40 + Math.sin(angle) * 34}
                      stroke={i === 2 ? 'hsl(var(--water-green))' : 'hsl(var(--brass))'}
                      strokeWidth={i === 2 ? 2 : 1}
                      opacity={i === 2 ? 1 : 0.4}
                    />
                  );
                })}
                <circle cx="40" cy="40" r="5" fill="hsl(var(--brass))" />
              </svg>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-ink mb-3">
              Que se passe-t-il chez vous ?
            </h2>
            <p className="text-ink/50 max-w-md mx-auto font-light">
              Choisissez la situation la plus proche. L'objectif : trouver la prochaine étape claire, pas tout diagnostiquer en ligne.
            </p>
          </div>

          {/* Wire options */}
          <div className="space-y-2">
            {options.map((opt, i) => (
              <WireOption
                key={i}
                option={opt}
                isSelected={selected === i}
                onClick={() => setSelected(selected === i ? null : i)}
                config={config}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function WireOption({ option, isSelected, onClick, config, index }) {
  return (
    <div className="rounded-sm overflow-hidden">
      <button
        onClick={onClick}
        className={`w-full text-left px-5 py-4 flex items-center gap-4 transition-all duration-300 ${
          isSelected
            ? 'bg-background border-l-2 border-water-green'
            : 'bg-background/60 hover:bg-background border-l-2 border-transparent'
        }`}
        aria-expanded={isSelected}
      >
        {/* Copper wire end + label */}
        <span className="text-lg flex-shrink-0">{option.emoji}</span>
        <div
          className="flex-shrink-0 h-px flex-grow-0 transition-all duration-300"
          style={{
            width: isSelected ? 24 : 12,
            background: isSelected ? 'hsl(var(--water-green))' : 'hsl(var(--brass))',
            height: 2,
          }}
        />
        <span className={`font-sans text-sm md:text-base transition-colors ${
          isSelected ? 'text-ink font-medium' : 'text-ink/65'
        }`}>
          {option.label}
        </span>
        <div
          className="ml-auto w-2 h-2 rounded-full flex-shrink-0 transition-colors"
          style={{ background: isSelected ? 'hsl(var(--water-green))' : 'hsl(var(--border))' }}
        />
      </button>

      {/* Animated schema — the 3D visual explanation */}
      <div
        className="overflow-hidden transition-all duration-500"
        style={{ maxHeight: isSelected ? 320 : 0, opacity: isSelected ? 1 : 0 }}
      >
        <div className="px-5 pb-5 pt-3 ml-4 border-l border-water-green/20">
          {/* Visual schema */}
          <div
            className="rounded-sm bg-background border border-border/40 p-4 mb-4"
            style={{
              transform: isSelected ? 'translateY(0)' : 'translateY(8px)',
              transition: 'transform 0.4s ease 0.1s',
            }}
          >
            {option.visual}
          </div>
          <p className="text-ink/55 text-sm leading-relaxed mb-2 font-light">{option.explanation}</p>
          <p className="text-clay text-sm font-medium mb-4">{option.action}</p>
          {option.cta === 'call' ? (
            <RippleButton href={`tel:${config.phone.replace(/\s/g, '')}`} className="text-sm px-5 py-2.5">
              <Phone className="w-3.5 h-3.5 mr-2" />
              Appeler {config.businessName}
            </RippleButton>
          ) : (
            <RippleButton variant="secondary" href="#quote" className="text-sm px-5 py-2.5">
              <FileText className="w-3.5 h-3.5 mr-2" />
              Demander un devis
            </RippleButton>
          )}
        </div>
      </div>
    </div>
  );
}