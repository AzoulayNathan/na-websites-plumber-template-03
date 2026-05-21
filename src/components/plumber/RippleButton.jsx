import React, { useState, useCallback } from 'react';

export default function RippleButton({
  children,
  variant = 'primary',
  href,
  onClick,
  className = '',
  ...props
}) {
  const [ripples, setRipples] = useState([]);

  const handleClick = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples(prev => [...prev, { x, y, id }]);
    setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 700);
    onClick?.(e);
  }, [onClick]);

  const baseStyles = "relative overflow-hidden inline-flex items-center justify-center font-sans font-medium transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-water-green";

  const variants = {
    primary: "bg-pipe-green text-porcelain px-7 py-3.5 rounded-sm text-[15px] tracking-wide hover:bg-ink active:scale-[0.97]",
    secondary: "border border-ink/20 text-ink bg-transparent px-7 py-3.5 rounded-sm text-[15px] tracking-wide hover:bg-ink/5 active:scale-[0.97]",
    ghost: "text-ink/70 px-4 py-2 text-sm hover:text-ink underline-offset-4 hover:underline",
  };

  const Tag = href ? 'a' : 'button';

  return (
    <Tag
      href={href}
      onClick={handleClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
      {ripples.map(r => (
        <span
          key={r.id}
          className="absolute rounded-full bg-water-green/20 pointer-events-none"
          style={{
            left: r.x - 20,
            top: r.y - 20,
            width: 40,
            height: 40,
            animation: 'ripple 0.6s ease-out forwards',
          }}
        />
      ))}
    </Tag>
  );
}