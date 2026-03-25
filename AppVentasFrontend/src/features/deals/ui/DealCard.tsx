"use client";

import { Deal } from "../types/deals.types";
import { useCountdown } from "../hooks/useDeals";

const CATEGORY_ICONS: Record<string, string> = {
  electronics: "💻", software: "📦", services: "🛠️",
  hardware: "🖧", accessories: "⌨️",
};
const CATEGORY_BG: Record<string, string> = {
  electronics: "#dbeafe", software: "#ede9fe", services: "#d1fae5",
  hardware: "#ffedd5", accessories: "#fce7f3",
};
const CATEGORY_LABELS: Record<string, string> = {
  electronics: "Electrónica", software: "Software", services: "Servicios",
  hardware: "Hardware", accessories: "Accesorios",
};

const TAG_CONFIG = {
  flash:    { label: "⚡ Flash",        cls: "tag--flash"    },
  top:      { label: "🏆 Más vendido",  cls: "tag--top"      },
  expiring: { label: "⏳ Por vencer",   cls: "tag--expiring" },
  new:      { label: "✨ Nuevo",        cls: "tag--new"      },
};

function pad(n: number) { return String(n).padStart(2, "0"); }

function Countdown({ expiresAt }: { expiresAt: string }) {
  const { h, m, s, expired } = useCountdown(expiresAt);
  if (expired) return <span className="countdown expired">Expirada</span>;
  return (
    <div className="countdown">
      <span className="countdown-unit">{pad(h)}<em>h</em></span>
      <span className="countdown-sep">:</span>
      <span className="countdown-unit">{pad(m)}<em>m</em></span>
      <span className="countdown-sep">:</span>
      <span className="countdown-unit">{pad(s)}<em>s</em></span>
    </div>
  );
}

function calcDiscount(price: number, original: number) {
  return Math.round((1 - price / original) * 100);
}

interface DealCardProps {
  deal: Deal;
  onAddToCart: (deal: Deal) => void;
}

export function DealCard({ deal, onAddToCart }: DealCardProps) {
  const discount = calcDiscount(deal.price, deal.originalPrice);
  const tag = deal.tag ? TAG_CONFIG[deal.tag] : null;
  const isService = deal.category === "services";

  return (
    <div className={`deal-card${!deal.inStock ? " deal-card--out" : ""}`}>

      {/* Image area */}
      <div className="deal-img" style={{ background: CATEGORY_BG[deal.category] }}>
        <span className="deal-emoji">{CATEGORY_ICONS[deal.category]}</span>
        <div className="deal-discount-badge">−{discount}%</div>
        {tag && <span className={`deal-tag ${tag.cls}`}>{tag.label}</span>}
      </div>

      {/* Body */}
      <div className="deal-body">
        <div className="deal-meta">
          <span className="deal-brand">{deal.brand}</span>
          <span className="deal-cat">{CATEGORY_LABELS[deal.category]}</span>
        </div>

        <h3 className="deal-name">{deal.name}</h3>
        <p className="deal-desc">{deal.description}</p>

        {/* Rating */}
        <div className="deal-rating">
          <span className="deal-stars">{"★".repeat(Math.floor(deal.rating))}{"☆".repeat(5 - Math.floor(deal.rating))}</span>
          <span className="deal-rating-score">{deal.rating.toFixed(1)}</span>
          <span className="deal-rating-count">({deal.reviewCount.toLocaleString()})</span>
        </div>

        {/* Sold bar */}
        {deal.soldPercent !== undefined && (
          <div className="deal-stock-bar-wrap">
            <div className="deal-stock-bar">
              <div className="deal-stock-fill" style={{ width: `${deal.soldPercent}%` }} />
            </div>
            <span className="deal-stock-label">{deal.soldPercent}% vendido</span>
          </div>
        )}

        {/* Countdown */}
        {deal.expiresAt && (
          <div className="deal-countdown-row">
            <span className="deal-countdown-label">Termina en:</span>
            <Countdown expiresAt={deal.expiresAt} />
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="deal-footer">
        <div className="deal-prices">
          <span className="deal-price">
            ${deal.price.toLocaleString("es-DO", { minimumFractionDigits: 2 })}
            {isService && <span className="deal-period"></span>}
          </span>
          <span className="deal-original">${deal.originalPrice.toLocaleString("es-DO", { minimumFractionDigits: 2 })}</span>
        </div>
        <button
          className="deal-btn"
          disabled={!deal.inStock}
          onClick={() => onAddToCart(deal)}
        >
          {deal.inStock ? (isService ? "Contratar" : "Agregar") : "Sin stock"}
        </button>
      </div>
    </div>
  );
}