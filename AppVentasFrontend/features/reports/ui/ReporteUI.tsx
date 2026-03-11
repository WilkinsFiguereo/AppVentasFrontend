"use client";

import React from "react";
import { reportesTheme as t } from "../theme/reportes.theme";
import { ReporteStatCard, PuntoGrafica, DistribucionCategoria } from "../types/reportes.types";
import { TrendingUp, TrendingDown } from "lucide-react";

// ─── Stat Card ────────────────────────────────────────────────────────
export function ReporteStatCardUI({ stat }: { stat: ReporteStatCard }) {
  const { Icon } = stat;
  return (
    <div className="stat-card" style={{
      borderRadius: 16, padding: "20px 24px",
      background: "white", border: `1px solid ${t.border}`,
      transition: "all 0.2s ease",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{
          width: 42, height: 42, borderRadius: 12,
          background: stat.bg, color: stat.color,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Icon size={20} />
        </div>
        <div style={{
          display: "flex", alignItems: "center", gap: 4,
          fontSize: 11, fontWeight: 600,
          color: stat.deltaPositivo ? t.success : t.error,
        }}>
          {stat.deltaPositivo
            ? <TrendingUp size={13} />
            : <TrendingDown size={13} />
          }
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
        <div style={{
          fontSize: 11, marginTop: 4, fontWeight: 500,
          color: stat.deltaPositivo ? t.success : t.error,
        }}>
          {stat.delta}
        </div>
      </div>
    </div>
  );
}

// ─── Bar Chart ────────────────────────────────────────────────────────
interface BarChartProps {
  datos: PuntoGrafica[];
}

export function BarChart({ datos }: BarChartProps) {
  const maxVal = Math.max(...datos.flatMap((d) => [d.ventas, d.cobros, d.gastos]));
  const series = [
    { key: "ventas",  label: "Ventas",  color: t.brand400  },
    { key: "cobros",  label: "Cobros",  color: t.success   },
    { key: "gastos",  label: "Gastos",  color: t.error     },
  ] as const;

  return (
    <div>
      {/* Leyenda */}
      <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
        {series.map((s) => (
          <div key={s.key} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 10, height: 10, borderRadius: 3, background: s.color }} />
            <span style={{ fontSize: 12, color: t.textSecondary, fontWeight: 500 }}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Barras */}
      <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 200 }}>
        {datos.map((punto) => (
          <div key={punto.label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <div style={{ display: "flex", gap: 2, alignItems: "flex-end", height: 180, width: "100%" }}>
              {series.map((s) => {
                const val = punto[s.key];
                const h = (val / maxVal) * 100;
                return (
                  <div
                    key={s.key}
                    title={`${s.label}: $${val.toLocaleString()}`}
                    style={{
                      flex: 1, borderRadius: "4px 4px 0 0",
                      height: `${h}%`, background: s.color,
                      opacity: 0.85, transition: "height 0.5s ease",
                      cursor: "pointer",
                    }}
                  />
                );
              })}
            </div>
            <span style={{ fontSize: 10, color: t.textDisabled, whiteSpace: "nowrap" }}>
              {punto.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Donut Chart ──────────────────────────────────────────────────────
interface DonutChartProps {
  datos: DistribucionCategoria[];
}

export function DonutChart({ datos }: DonutChartProps) {
  const total = datos.reduce((s, d) => s + d.valor, 0);
  let acumulado = 0;

  // Construir segmentos como conic-gradient
  const gradientParts = datos.map((d) => {
    const inicio = acumulado;
    acumulado += d.valor;
    return `${d.color} ${inicio}% ${acumulado}%`;
  });
  const gradient = `conic-gradient(${gradientParts.join(", ")})`;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
      {/* Donut */}
      <div style={{ position: "relative", flexShrink: 0 }}>
        <div style={{
          width: 150, height: 150, borderRadius: "50%",
          background: gradient,
        }} />
        {/* Hueco central */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: 80, height: 80, borderRadius: "50%",
          background: "white",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
        }}>
          <span style={{ fontSize: 18, fontWeight: 700, color: t.textPrimary, fontFamily: "'DM Mono', monospace" }}>
            {total}%
          </span>
          <span style={{ fontSize: 9, color: t.textDisabled }}>total</span>
        </div>
      </div>

      {/* Leyenda */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
        {datos.map((d) => (
          <div key={d.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 10, height: 10, borderRadius: 3, background: d.color, flexShrink: 0 }} />
              <span style={{ fontSize: 12, color: t.textSecondary }}>{d.label}</span>
            </div>
            <span style={{ fontSize: 12, fontWeight: 700, color: t.textPrimary, fontFamily: "'DM Mono', monospace" }}>
              {d.valor}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Toast ────────────────────────────────────────────────────────────
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