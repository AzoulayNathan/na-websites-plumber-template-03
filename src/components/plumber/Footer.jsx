import React from 'react';

export default function Footer({ config }) {
  return (
    <footer style={{ background: 'hsl(var(--ink))' }} className="text-porcelain/40 pt-14 pb-8 px-5 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Top band */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">

          {/* Brand */}
          <div className="text-center md:text-left">
            <p className="font-serif text-xl text-porcelain/80 mb-1">{config.businessName}</p>
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <span className="w-4 h-px bg-brass/40" />
              <p className="text-[11px] tracking-[0.2em] uppercase text-water-green/60">Plombier artisan · {config.city}</p>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <a
              href={`tel:${config.phone.replace(/\s/g, '')}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm text-sm font-medium transition-all duration-200 hover:bg-porcelain/10"
              style={{ border: '1px solid hsl(var(--porcelain)/0.12)', color: 'hsl(var(--porcelain)/0.7)' }}
            >
              {config.phone}
            </a>
            <a
              href={`mailto:${config.email}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm text-sm font-light transition-all duration-200 hover:bg-porcelain/10"
              style={{ border: '1px solid hsl(var(--porcelain)/0.08)', color: 'hsl(var(--porcelain)/0.45)' }}
            >
              {config.email}
            </a>
          </div>
        </div>

        {/* Copper rule */}
        <div className="h-px w-full mb-6" style={{ background: 'linear-gradient(to right, transparent, hsl(var(--brass)/0.25), transparent)' }} />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px]">
          <p className="text-porcelain/20">
            Disponibilité selon secteur et planning. Précisez votre zone lors du contact.
          </p>
          <p className="text-porcelain/15 tracking-widest">
            {config.city} & environs
          </p>
        </div>
      </div>
    </footer>
  );
}