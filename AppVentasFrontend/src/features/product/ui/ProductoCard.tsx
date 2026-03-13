"use client";

import React from "react";
import { productosTheme as t } from "../theme/productos.theme";
import { StockStatus } from "../types/productos.types";
import { ProductoStatCardDef } from "../data/productos.data";

// ─── Stock Badge ─────────────────────────────────────────────────────
export function StockBadge({ status }: { status: StockStatus }) {
  const map: Record<StockStatus, { label: string; color: string; bg: string }> = {
    ok:      { label: "En Stock",   color: t.success, bg: t.successBg },
    bajo:    { label: "Stock Bajo", color: t.warning, bg: t.warningBg },
    agotado: { label: "Agotado",    color: t.error,   bg: t.errorBg   },
  };
  const s = map[status];
  return (
    <span style={{
      background: s.bg, color: s.color,
      padding: "3px 10px", borderRadius: 20,
      fontSize: 11, fontWeight: 700, letterSpacing: "0.03em",
    }}>
      {s.label}
    </span>
  );
}

// ─── Stat Card ───────────────────────────────────────────────────────
export function ProductoStatCard({ stat }: { stat: ProductoStatCardDef }) {
  const { Icon } = stat;
  return (
    <div style={{
      borderRadius: 16, padding: "20px 24px",
      background: "white", border: `1px solid ${t.border}`,
      transition: "all 0.2s ease",
    }}
      className="stat-card"
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{
          width: 42, height: 42, borderRadius: 12,
          background: stat.bg, color: stat.color,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Icon size={20} />
        </div>
      </div>
      <div style={{ marginTop: 16 }}>
        <div style={{
          fontSize: 28, fontWeight: 700, color: t.textPrimary,
          letterSpacing: "-0.03em", fontFamily: "'DM Mono', monospace",
        }}>
          {stat.value}
        </div>
        <div style={{ fontSize: 12, fontWeight: 600, color: t.textSecondary, marginTop: 2 }}>
          {stat.label}
        </div>
        <div style={{ fontSize: 11, color: stat.color, marginTop: 4, fontWeight: 500 }}>
          {stat.delta}
        </div>
      </div>
    </div>
  );
}

// ─── Toast ───────────────────────────────────────────────────────────
export function Toast({ message, visible }: { message: string; visible: boolean }) {
  if (!visible) return null;
  return (
    <div style={{
      position: "fixed", bottom: 24, right: 24,
      background: t.brand600, color: "white",
      padding: "12px 20px", borderRadius: 12,
      fontSize: 13, fontWeight: 500,
      boxShadow: "0 8px 24px rgba(30,58,138,0.3)",
      animation: "toastIn 0.3s ease", zIndex: 9999,
      display: "flex", alignItems: "center", gap: 8,
    }}>
      {message}
    </div>
  );
}