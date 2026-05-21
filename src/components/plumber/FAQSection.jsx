import React, { useState, useRef, useEffect } from 'react';
import { SectionDivider } from './WaterLine';
import useScrollReveal from '@/lib/useScrollReveal';

export default function FAQSection({ config }) {
  const ref = useScrollReveal();
  const [open, setOpen] = useState(null);

  const faqs = [
    {
      q: "Appeler ou demander un devis ?",
      a: `Pour les urgences — fuite active, WC bouché, eau qui remonte — appeler est la voie la plus directe. Pour les installations ou remplacements planifiés, une demande de devis permet de décrire la situation calmement.`,
      icon: "~",
    },
    {
      q: "Que faire en cas de fuite ?",
      a: "Si accessible, coupez l'arrivée d'eau principale. Éloignez les appareils électriques de la zone humide. Appelez directement — inutile d'attendre si l'eau se répand.",
      icon: "↓",
    },
    {
      q: `Intervenez-vous à ${config.city} et autour ?`,
      a: `${config.businessName} intervient à ${config.city} et dans les communes proches selon les disponibilités. Précisez votre secteur lors du premier contact.`,
      icon: "◎",
    },
    {
      q: "Puis-je envoyer des photos avant l'intervention ?",
      a: "Oui — des photos d'un équipement, d'une fuite visible ou d'un chauffe-eau aident à mieux préparer l'intervention. Pour les urgences, appelez d'abord, les photos peuvent attendre.",
      icon: "+",
    },
    {
      q: "Comment se passe une première intervention ?",
      a: "On commence par observer et comprendre. Avant de toucher quoi que ce soit, on explique ce qu'on a constaté et ce qui va être fait. Pas de mauvaises surprises.",
      icon: "°",
    },
  ];

  return (
    <>
      <SectionDivider />
      <section id="faq" className="py-16 md:py-28" style={{ background: 'hsl(var(--muted)/0.3)' }}>
        <div className="max-w-2xl mx-auto px-5 md:px-8">
          <div ref={ref} className="reveal">

            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 mb-4">
                <span className="h-px w-6 bg-brass/40" />
                <p className="text-[11px] tracking-[0.22em] uppercase text-brass font-medium">Questions fréquentes</p>
                <span className="h-px w-6 bg-brass/40" />
              </div>
              <h2 className="font-serif text-3xl md:text-4xl text-ink">
                Avant d'appeler
              </h2>
            </div>

            <div className="space-y-2">
              {faqs.map((faq, i) => (
                <FAQItem
                  key={i}
                  faq={faq}
                  index={i}
                  isOpen={open === i}
                  onToggle={() => setOpen(open === i ? null : i)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function FAQItem({ faq, index, isOpen, onToggle }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const pref = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (pref) { setVisible(true); return; }
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTimeout(() => setVisible(true), index * 60); obs.unobserve(e.target); } },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [index]);

  return (
    <div
      ref={ref}
      className="rounded-sm overflow-hidden transition-all duration-300"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(12px)',
        transition: `opacity 0.5s ease ${index * 0.07}s, transform 0.5s ease ${index * 0.07}s`,
        borderLeft: `2px solid ${isOpen ? 'hsl(var(--water-green)/0.6)' : 'hsl(var(--border)/0.4)'}`,
        background: isOpen ? 'hsl(var(--background))' : 'hsl(var(--background)/0.5)',
      }}
    >
      <button
        onClick={onToggle}
        className="w-full text-left px-5 py-4 flex items-center gap-4 hover:bg-pale-blue/10 transition-colors"
        aria-expanded={isOpen}
      >
        {/* Craft glyph as toggle */}
        <div
          className="flex-shrink-0 w-8 h-8 rounded-sm flex items-center justify-center font-serif text-base transition-all duration-300"
          style={{
            color: isOpen ? 'hsl(var(--water-green))' : 'hsl(var(--brass)/0.5)',
            background: isOpen ? 'hsl(var(--water-green)/0.08)' : 'hsl(var(--muted)/0.6)',
            transform: isOpen ? 'rotate(45deg)' : 'rotate(0)',
          }}
        >
          {faq.icon}
        </div>

        <span className="flex-1 font-sans text-sm md:text-base font-medium text-ink/80">
          {faq.q}
        </span>

        {/* Animated copper wire on open */}
        <div
          className="flex-shrink-0 h-px transition-all duration-300"
          style={{
            width: isOpen ? 20 : 8,
            background: isOpen ? 'hsl(var(--water-green)/0.6)' : 'hsl(var(--border))',
          }}
        />
      </button>

      {/* Answer */}
      <div
        className="overflow-hidden"
        style={{
          maxHeight: isOpen ? 180 : 0,
          opacity: isOpen ? 1 : 0,
          transition: 'max-height 0.4s ease, opacity 0.35s ease',
        }}
      >
        <div className="px-5 pb-5 pt-1 ml-12">
          <div className="border-l border-water-green/15 pl-4">
            <p className="text-ink/55 text-sm leading-relaxed font-light">{faq.a}</p>
          </div>
        </div>
      </div>
    </div>
  );
}