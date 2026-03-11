"use client";

import { FeaturedBanner } from "../types/deals.types";

interface HeroBannerProps {
  banners: FeaturedBanner[];
  active: number;
  onDotClick: (i: number) => void;
}

export function HeroBanner({ banners, active, onDotClick }: HeroBannerProps) {
  const b = banners[active];

  return (
    <div className="hero-banner" style={{ background: `linear-gradient(135deg, ${b.bgFrom} 0%, ${b.bgTo} 100%)` }}>
      {/* Grid pattern overlay */}
      <div className="hero-grid" />
      {/* Glow orb */}
      <div className="hero-orb" />

      <div className="hero-content">
        <div className="hero-left">
          <div className="hero-discount-pill">−{b.discount}% OFF</div>
          <h2 className="hero-title">{b.title}</h2>
          <p className="hero-sub">{b.subtitle}</p>
          <button className="hero-cta">{b.cta} →</button>
        </div>
        <div className="hero-right">
          <div className="hero-emoji">{b.emoji}</div>
        </div>
      </div>

      {/* Dots */}
      <div className="hero-dots">
        {banners.map((_, i) => (
          <button
            key={i}
            className={`hero-dot${i === active ? " hero-dot--active" : ""}`}
            onClick={() => onDotClick(i)}
            aria-label={`Banner ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}