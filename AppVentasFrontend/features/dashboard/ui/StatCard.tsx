"use client";

import React from "react";
import { StatCardData } from "../data/chart.data";
import { dashboardTheme as t } from "../theme/dashboard.theme";

// ─── Mini Sparkline Chart ────────────────────────────────────────────
interface MiniChartProps {
  data: number[];
  color: string;
}

export function MiniChart({ data, color }: MiniChartProps) {
  const max = Math.max(...data);
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 36 }}>
      {data.map((v, i) => (
        <div
          key={i}
          style={{
            width: 8,
            height: `${(v / max) * 100}%`,
            background: color,
            borderRadius: 3,
            opacity: i === data.length - 1 ? 1 : 0.4,
            transition: "height 0.3s ease",
          }}
        />
      ))}
    </div>
  );
}

// ─── StatCard Component ──────────────────────────────────────────────
interface StatCardProps {
  stat: StatCardData;
  chartData?: number[];
}

export function StatCard({ stat, chartData = [40, 55, 45, 60, 52, 70, 68] }: StatCardProps) {
  const { Icon } = stat; // ← referencia, se renderiza como <Icon />

  return (
    <div
      className="stat-card"
      style={{
        borderRadius: 16,
        padding: "20px 24px",
        background: "white",
        border: `1px solid ${t.border}`,
        transition: "all 0.2s ease",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div
          style={{
            width: 42, height: 42, borderRadius: 12,
            background: stat.bg,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: stat.color,
          }}
        >
          <Icon size={20} />
        </div>
        <MiniChart data={chartData} color={stat.color} />
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