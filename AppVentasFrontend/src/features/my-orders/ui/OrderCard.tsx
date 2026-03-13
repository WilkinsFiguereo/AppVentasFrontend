// src/features/my-orders/ui/OrderCard.tsx

import type { CustomerOrder } from "../types/my-orders.types";
import { STATUS_CFG } from "../data/constants";

const fmt = (n: number) =>
  n.toLocaleString("es-DO", { minimumFractionDigits: 2 });

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("es-DO", {
    day: "2-digit", month: "short", year: "numeric",
  });

interface Props {
  order: CustomerOrder;
  expanded: boolean;
  onToggle: () => void;
}

export function OrderCard({ order, expanded, onToggle }: Props) {
  const cfg =
  STATUS_CFG[order.status] ??
  {
    label: "Desconocido",
    color: "#6b7280",
    bg: "#f3f4f6",
    border: "#d1d5db",
    icon: "•",
  };
  return (
    <article className={`oc${expanded ? " oc--open" : ""}`}>

      {/* ── SUMMARY ROW ─────────────────────────────────── */}
      <div className="oc-row" onClick={onToggle} role="button" tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && onToggle()}>

        {/* Left: emojis + info */}
        <div className="oc-left">
          <div className="oc-emojis">
            {order.lines.slice(0, 3).map((l) => (
              <div key={l.product_id} className="oc-bubble">{l.emoji}</div>
            ))}
            {order.lines.length > 3 && (
              <div className="oc-bubble oc-bubble--more">+{order.lines.length - 3}</div>
            )}
          </div>

          <div className="oc-meta">
            <div className="oc-meta-top">
              <span className="oc-name">{order.name}</span>
              <span
                className="oc-status"
                style={{ color: cfg.color, background: cfg.bg, borderColor: cfg.border }}
              >
                {cfg.icon} {cfg.label}
              </span>
            </div>
            <p className="oc-products">
              {order.lines.map((l) => l.name).join(" · ")}
            </p>
            <p className="oc-date">📅 {fmtDate(order.date)}</p>
          </div>
        </div>

        {/* Right: total + arrow */}
        <div className="oc-right">
          <span className="oc-total">${fmt(order.amount_total)}</span>
          <span className="oc-items">
            {order.lines.length} {order.lines.length === 1 ? "producto" : "productos"}
          </span>
          <span className={`oc-arrow${expanded ? " oc-arrow--open" : ""}`} aria-hidden>›</span>
        </div>
      </div>

      {/* ── DETAIL ──────────────────────────────────────── */}
      {expanded && (
        <div className="oc-detail">

          {/* Tracking timeline */}
          <div className="oc-section">
            <p className="oc-section-label">Seguimiento</p>
            <div className="oc-timeline">
              {(order.tracking ?? []).map((step, i) => (
                <div
                  key={i}
                  className={`tl-step${step.done ? " tl-step--done" : ""}${step.active ? " tl-step--active" : ""}`}
                >
                  <div className="tl-connector">
                    <div className="tl-dot" />
                    {i < order.tracking.length - 1 && (
                      <div className={`tl-line${step.done ? " tl-line--done" : ""}`} />
                    )}
                  </div>
                  <div className="tl-info">
                    <span className="tl-label">{step.label}</span>
                    <span className="tl-date">{step.date ?? "—"}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Two columns */}
          <div className="oc-cols">

            {/* Products */}
            <div className="oc-section">
              <p className="oc-section-label">Productos</p>
              <div className="oc-lines">
                {order.lines.map((line) => (
                  <div key={line.product_id} className="oc-line">
                    <div className="oc-line-img">{line.emoji}</div>
                    <div className="oc-line-info">
                      <p className="oc-line-name">{line.name}</p>
                      <p className="oc-line-qty">x{line.qty}</p>
                    </div>
                    <span className="oc-line-price">${fmt(line.subtotal)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary + address */}
            <div className="oc-section-stack">
              <div className="oc-section">
                <p className="oc-section-label">Pago</p>
                <div className="oc-breakdown">
                  <div className="oc-brow">
                    <span>Método</span>
                    <span>{order.payment_method}</span>
                  </div>
                  <div className="oc-brow oc-brow--total">
                    <span>Total</span>
                    <span>${fmt(order.amount_total)}</span>
                  </div>
                </div>
              </div>

              <div className="oc-section">
                <p className="oc-section-label">Dirección</p>
                <div className="oc-addr">
                  <span>📍</span>
                  <span>{order.shipping_address}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Actions */}
          <div className="oc-actions">
            {(order.status === "shipped") && (
              <button className="oc-btn oc-btn--primary">Rastrear envío</button>
            )}
            {order.status === "delivered" && (
              <button className="oc-btn oc-btn--primary">Volver a comprar</button>
            )}
            {(order.status === "pending" || order.status === "confirmed" || order.status === "shipped" || order.status === "delivered") && (
              <button className="oc-btn oc-btn--ghost">Descargar factura</button>
            )}
            {(order.status === "pending" || order.status === "confirmed") && (
              <button className="oc-btn oc-btn--danger">Cancelar pedido</button>
            )}
          </div>

        </div>
      )}
    </article>
  );
}