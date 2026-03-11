"use client";

import React from "react";
import { StatCard } from "../ui/StatCard";
import { STATS_DATA, CHART_SERIES } from "../data/chart.data";

export function StatsSection() {
  const chartSeriesArray = [
    CHART_SERIES.ventas,
    CHART_SERIES.pendientes,
    CHART_SERIES.cobros,
    CHART_SERIES.vencidas,
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 16,
        marginBottom: 24,
        animation: "slideIn 0.5s ease 0.1s both",
      }}
    >
      {STATS_DATA.map((stat, i) => (
        <StatCard key={stat.label} stat={stat} chartData={chartSeriesArray[i]} />
      ))}
    </div>
  );
}