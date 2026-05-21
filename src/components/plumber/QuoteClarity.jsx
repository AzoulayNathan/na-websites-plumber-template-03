import React, { useState } from 'react';
import { SectionDivider } from './WaterLine';
import useScrollReveal from '@/lib/useScrollReveal';
import RippleButton from './RippleButton';
import { FileText } from 'lucide-react';

const checklist = [
  "Type de problème",
  "Adresse ou secteur",
  "Photos si utiles",
  "Disponibilité souhaitée",
  "Équipement ou détails si disponibles",
];

export default function QuoteClarity({ config }) {
  const ref = useScrollReveal();
  const [checked, setChecked] = useState([]);
  const [penActive, setPenActive] = useState(false);

  const toggle = (i) => {
    setPenActive(true);
    setTimeout(() => setPenActive(false), 600);
    setChecked(prev =>
      prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]
    );
  };

  const allChecked = checked.length === checklist.length;

  return (
    <>
      <SectionDivider />
      <section id="quote" className="py-16 md:py-28 bg-pale-blue/15">
        <div className="max-w-2xl mx-auto px-5 md:px-8">
          <div ref={ref} className="reveal">
            <h2 className="font-serif text-3xl md:text-4xl text-ink mb-3 text-center">
              Un travail planifié mérite une demande claire.
            </h2>
            <p className="text-ink/50 text-center max-w-lg mx-auto font-light mb-10">
              Pour les installations, remplacements ou travaux non urgents, une demande de devis aide à clarifier la situation.
            </p>

            {/* 3D floating paper form */}
            <div
              className="relative max-w-md mx-auto"
              style={{
                perspective: 600,
              }}
            >
              {/* Shadow paper layer (depth) */}
              <div
                className="absolute inset-0 rounded-sm bg-border/30"
                style={{ transform: 'translateY(6px) translateX(4px)', zIndex: 0 }}
              />

              {/* Main vellum paper */}
              <div
                className="relative bg-background border border-border/50 rounded-sm p-6 md:p-8"
                style={{
                  boxShadow: '0 12px 40px hsl(var(--ink)/0.06)',
                  zIndex: 1,
                  background: 'linear-gradient(160deg, hsl(var(--background)), hsl(var(--pale-blue)/0.12))',
                }}
              >
                {/* Top ruled line */}
                <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-clay/20 to-transparent" />

                {/* Pen indicator */}
                <div className="flex items-center justify-between mb-5">
                  <p className="text-xs tracking-[0.15em] uppercase text-ink/30 font-medium">
                    Ce qu'il faut inclure
                  </p>
                  <div
                    className="flex items-center gap-1.5 text-[10px] text-ink/30 transition-opacity"
                    style={{ opacity: penActive ? 1 : 0.4 }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M 10 2 L 14 6 L 5 14 L 1 14 L 1 10 Z" fill="hsl(var(--clay))" opacity="0.7" />
                      <line x1="8" y1="4" x2="12" y2="8" stroke="hsl(var(--porcelain))" strokeWidth="1" />
                    </svg>
                    <span>Stylo actif</span>
                  </div>
                </div>

                {/* Animated checkboxes */}
                <div className="space-y-3 mb-8">
                  {checklist.map((item, i) => {
                    const isChecked = checked.includes(i);
                    return (
                      <button
                        key={i}
                        onClick={() => toggle(i)}
                        className="w-full flex items-center gap-3 group text-left"
                      >
                        {/* Checkbox with pen-draw effect */}
                        <div
                          className="relative w-5 h-5 border rounded-[3px] flex-shrink-0 flex items-center justify-center transition-all duration-300"
                          style={{
                            borderColor: isChecked ? 'hsl(var(--water-green))' : 'hsl(var(--border))',
                            background: isChecked ? 'hsl(var(--water-green)/0.1)' : 'transparent',
                          }}
                        >
                          {isChecked && (
                            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                              <path
                                d="M 1 4 L 3.5 6.5 L 9 1"
                                stroke="hsl(var(--water-green))"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                style={{ animation: 'drawCheck 0.3s ease forwards' }}
                              />
                              <style>{`@keyframes drawCheck { from{stroke-dashoffset:20;stroke-dasharray:20} to{stroke-dashoffset:0;stroke-dasharray:20} }`}</style>
                            </svg>
                          )}
                        </div>

                        {/* Ink line through text when checked */}
                        <span
                          className="text-sm font-light relative transition-colors duration-300"
                          style={{
                            color: isChecked ? 'hsl(var(--ink)/0.4)' : 'hsl(var(--ink)/0.65)',
                          }}
                        >
                          {item}
                          {isChecked && (
                            <span
                              className="absolute left-0 top-1/2 h-px bg-water-green/40"
                              style={{ animation: 'strikeThrough 0.3s ease forwards', width: 0 }}
                            >
                              <style>{`@keyframes strikeThrough { from{width:0} to{width:100%} }`}</style>
                            </span>
                          )}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Progress bar */}
                <div className="h-px bg-border mb-6 relative overflow-hidden">
                  <div
                    className="absolute left-0 top-0 h-full bg-water-green transition-all duration-500"
                    style={{ width: `${(checked.length / checklist.length) * 100}%` }}
                  />
                </div>

                <RippleButton
                  variant={allChecked ? 'primary' : 'secondary'}
                  href={`mailto:${config.email}?subject=Demande de devis`}
                  className="w-full justify-center"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  {allChecked ? 'Envoyer la demande de devis ✓' : 'Demander un devis'}
                </RippleButton>

                <p className="text-center text-xs text-ink/30 mt-5 italic">
                  Pour les fuites urgentes ou l'eau qui remonte, appelez directement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}