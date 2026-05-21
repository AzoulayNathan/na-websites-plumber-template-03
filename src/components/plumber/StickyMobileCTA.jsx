import React, { useState, useEffect } from 'react';
import { Phone, FileText } from 'lucide-react';

export default function StickyMobileCTA({ config }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 md:hidden transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="bg-pipe-green/95 backdrop-blur-sm border-t border-water-green/10 px-4 py-3 flex gap-3 safe-area-bottom">
        <a
          href={`tel:${config.phone.replace(/\s/g, '')}`}
          className="flex-1 flex items-center justify-center gap-2 bg-porcelain text-pipe-green py-3 rounded-sm text-sm font-medium active:scale-[0.97] transition-transform"
        >
          <Phone className="w-4 h-4" />
          Call
        </a>
        <a
          href={`mailto:${config.email}?subject=Quote request`}
          className="flex-1 flex items-center justify-center gap-2 border border-porcelain/20 text-porcelain py-3 rounded-sm text-sm font-medium active:scale-[0.97] transition-transform"
        >
          <FileText className="w-4 h-4" />
          Quote
        </a>
      </div>
    </div>
  );
}