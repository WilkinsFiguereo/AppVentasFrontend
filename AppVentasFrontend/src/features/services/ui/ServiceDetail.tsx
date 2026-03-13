// src/features/services/ui/ServiceDetail.tsx

import type { Service } from "../types/services.types";
import { BILLING_LABELS } from "../data/constants";

const fmt = (n: number) =>
  n.toLocaleString("es-DO", { minimumFractionDigits: 2 });

interface Props {
  service: Service;
  onClose: () => void;
  onHire:  (s: Service) => void;
}

export function ServiceDetail({ service: s, onClose, onHire }: Props) {
  const billing = BILLING_LABELS[s.billing] ?? "";

  return (
    <div className="sd-overlay" onClick={onClose}>
      <div className="sd-drawer" onClick={(e) => e.stopPropagation()}>

        {/* Close */}
        <button className="sd-close" onClick={onClose} aria-label="Cerrar">×</button>

        {/* Header */}
        <div className="sd-header">
          <div className="sd-emoji">{s.emoji}</div>
          <div>
            <p className="sd-cat">{s.category}</p>
            <h2 className="sd-name">{s.name}</h2>
            <p className="sd-code">{s.default_code}</p>
          </div>
        </div>

        {/* Badges */}
        <div className="sd-badges">
          {s.featured && <span className="sc-badge sc-badge--feat">Destacado</span>}
          {s.popular  && <span className="sc-badge sc-badge--pop">Popular</span>}
          <span className="sd-billing-badge">
            {s.billing === "monthly"   && "Facturación mensual"}
            {s.billing === "annual"    && "Facturación anual"}
            {s.billing === "one-time"  && "Pago único"}
            {s.billing === "hourly"    && "Por hora"}
          </span>
        </div>

        {/* Description */}
        <div className="sd-section">
          <p className="sd-section-label">Descripción</p>
          <p className="sd-description">{s.description}</p>
        </div>

        {/* Includes */}
        <div className="sd-section">
          <p className="sd-section-label">Incluye</p>
          <ul className="sd-includes">
            <li>✓ Onboarding y configuración inicial</li>
            <li>✓ Soporte por email y chat</li>
            <li>✓ Acceso al panel de cliente</li>
            {s.billing === "monthly" && <li>✓ Cancelación en cualquier momento</li>}
            {s.billing === "annual"  && <li>✓ 2 meses gratis al pagar anual</li>}
            {s.featured              && <li>✓ Consultor dedicado</li>}
          </ul>
        </div>

        {/* Price + CTA */}
        <div className="sd-footer">
          <div>
            <p className="sd-price-label">Precio</p>
            <div className="sd-price">
              <span className="sd-price-num">${fmt(s.list_price)}</span>
              <span className="sd-price-billing">{billing}</span>
            </div>
          </div>
          <button className="sd-hire-btn" onClick={() => onHire(s)}>
            Contratar ahora →
          </button>
        </div>

      </div>
    </div>
  );
}