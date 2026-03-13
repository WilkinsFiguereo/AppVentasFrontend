// src/features/services/ui/ServiceCard.tsx

import type { Service, ViewMode } from "../types/services.types";
import { BILLING_LABELS } from "../data/constants";

const CATEGORY_ACCENT: Record<string, string> = {
  "Soporte & IT":   "#dbeafe",
  "Cloud & Hosting":"#e0f2fe",
  "Software":       "#ede9fe",
  "Consultoría":    "#d1fae5",
  "Seguridad":      "#fee2e2",
  "Comunicación":   "#fce7f3",
};

const fmt = (n: number) =>
  n.toLocaleString("es-DO", { minimumFractionDigits: 2 });

interface Props {
  service: Service;
  mode: ViewMode;
  onHire: (s: Service) => void;
  onDetail: (id: number) => void;
}

export function ServiceCard({ service: s, mode, onHire, onDetail }: Props) {
  const bg      = CATEGORY_ACCENT[s.category] ?? "#F1F5F9";
  const billing = BILLING_LABELS[s.billing] ?? "";

  if (mode === "list") {
    return (
      <div className="sc-list">
        <div className="sc-list-emoji" style={{ background: bg }}>{s.emoji}</div>
        <div className="sc-list-body">
          <div className="sc-list-top">
            <span className="sc-list-name">{s.name}</span>
            <div className="sc-list-badges">
              {s.featured && <span className="sc-badge sc-badge--feat">Destacado</span>}
              {s.popular  && <span className="sc-badge sc-badge--pop">Popular</span>}
            </div>
          </div>
          <p className="sc-list-desc">{s.description}</p>
          <span className="sc-list-cat">{s.category}</span>
        </div>
        <div className="sc-list-right">
          <div className="sc-list-price">
            <span className="sc-price-num">${fmt(s.list_price)}</span>
            <span className="sc-price-billing">{billing}</span>
          </div>
          <div className="sc-list-actions">
            <button className="sc-btn-ghost" onClick={() => onDetail(s.id)}>Ver más</button>
            <button className="sc-btn-hire"  onClick={() => onHire(s)}>Contratar</button>
          </div>
        </div>
      </div>
    );
  }

  // ── Grid card ──────────────────────────────────────
  return (
    <div className="sc-grid">
      <div className="sc-grid-top">
        <div className="sc-grid-emoji" style={{ background: bg }}>{s.emoji}</div>
        <div className="sc-grid-badges">
          {s.featured && <span className="sc-badge sc-badge--feat">Destacado</span>}
          {s.popular  && <span className="sc-badge sc-badge--pop">Popular</span>}
        </div>
      </div>

      <div className="sc-grid-body">
        <p className="sc-grid-cat">{s.category}</p>
        <h3 className="sc-grid-name">{s.name}</h3>
        <p className="sc-grid-desc">{s.description}</p>
      </div>

      <div className="sc-grid-footer">
        <div className="sc-price">
          <span className="sc-price-num">${fmt(s.list_price)}</span>
          <span className="sc-price-billing">{billing}</span>
        </div>
        <div className="sc-grid-actions">
          <button className="sc-btn-ghost" onClick={() => onDetail(s.id)}>Info</button>
          <button className="sc-btn-hire"  onClick={() => onHire(s)}>Contratar</button>
        </div>
      </div>
    </div>
  );
}