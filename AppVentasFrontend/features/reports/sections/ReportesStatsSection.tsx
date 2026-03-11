"use client";

import React from "react";
import { ReporteStatCardUI } from "../ui/ReporteUI";
import { REPORTE_STATS } from "../data/reportes.data";

export function ReportesStatsSection() {
  return (
    <div style={{
      display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
      gap: 16, marginBottom: 24,
      animation: "slideIn 0.5s ease 0.1s both",
    }}>
      {REPORTE_STATS.map((stat) => (
        <ReporteStatCardUI key={stat.label} stat={stat} />
      ))}
    </div>
  );
}