import React, { useState } from 'react';
import siteConfig from '@/lib/siteConfig';
import Preloader from '@/components/plumber/Preloader';
import ScrollWaterThread from '@/components/plumber/ScrollWaterThread';
import HeroSection from '@/components/plumber/HeroSection';
import ArtisanPromise from '@/components/plumber/ArtisanPromise';
import ServiceBoard from '@/components/plumber/ServiceBoard';
import DiagnosticTool from '@/components/plumber/DiagnosticTool';
import InterventionMindset from '@/components/plumber/InterventionMindset';
import LocalPresence from '@/components/plumber/LocalPresence';
import QuoteClarity from '@/components/plumber/QuoteClarity';
import FAQSection from '@/components/plumber/FAQSection';
import FinalContact from '@/components/plumber/FinalContact';
import StickyMobileCTA from '@/components/plumber/StickyMobileCTA';
import Footer from '@/components/plumber/Footer';

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {/* Preloader */}
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}

      {/* Scroll-driven water thread */}
      <ScrollWaterThread />

      <div
        className="min-h-screen bg-background font-sans"
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.5s ease',
        }}
      >
        {/* Minimal sticky header */}
        <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-sm border-b"
          style={{ background: 'hsl(var(--porcelain)/0.88)', borderColor: 'hsl(var(--brass)/0.12)' }}>
          <div className="max-w-6xl mx-auto px-5 md:px-8 h-14 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              {/* Tiny drop mark */}
              <svg width="10" height="13" viewBox="0 0 10 13" fill="none" aria-hidden="true">
                <path d="M5 0 C5 0 0 5 0 8 C0 11 2.5 13 5 13 C7.5 13 10 11 10 8 C10 5 5 0 5 0Z"
                  fill="hsl(var(--water-green))" opacity="0.7" />
              </svg>
              <span className="font-serif text-lg text-ink tracking-wide">{siteConfig.businessName}</span>
            </div>
            <a
              href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
              className="hidden md:inline-flex items-center gap-1.5 text-sm transition-colors font-light"
              style={{ color: 'hsl(var(--ink)/0.5)' }}
              onMouseEnter={e => e.currentTarget.style.color = 'hsl(var(--ink))'}
              onMouseLeave={e => e.currentTarget.style.color = 'hsl(var(--ink)/0.5)'}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M 2 1 C 1 2 1 4 3 6 C 5 8 7 8 8 7 L 10 9 C 10 9 9 11 7 10 C 5 9 1 6 1 4 C 1 2 2 1 2 1Z"
                  stroke="hsl(var(--ink)/0.5)" strokeWidth="0.8" fill="none" />
              </svg>
              {siteConfig.phone}
            </a>
          </div>
        </header>

        <main className="pt-14">
          <HeroSection config={siteConfig} />
          <ArtisanPromise />
          <ServiceBoard config={siteConfig} />
          <DiagnosticTool config={siteConfig} />
          <InterventionMindset />
          <LocalPresence config={siteConfig} />
          <QuoteClarity config={siteConfig} />
          <FAQSection config={siteConfig} />
          <FinalContact config={siteConfig} />
        </main>

        <Footer config={siteConfig} />
        <StickyMobileCTA config={siteConfig} />

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Plumber",
              "name": siteConfig.businessName,
              "telephone": siteConfig.phone,
              "email": siteConfig.email,
              "areaServed": [siteConfig.city, siteConfig.serviceArea1, siteConfig.serviceArea2, siteConfig.serviceArea3, siteConfig.serviceArea4, siteConfig.serviceArea5],
            }),
          }}
        />
      </div>
    </>
  );
}