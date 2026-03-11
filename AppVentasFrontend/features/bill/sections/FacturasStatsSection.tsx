"use client";

import React from "react";
import { FacturaStatCardUI } from "../ui/FacturaUI";
import { FACTURAS_STATS } from "../data/facturas.data";

export function FacturasStatsSection() {
  return (
    <div style={{
      display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
      gap: 16, marginBottom: 24,
      animation: "slideIn 0.5s ease 0.1s both",
    }}>
      {FACTURAS_STATS.map((stat) => (
        <FacturaStatCardUI key={stat.label} stat={stat} />
      ))}
    </div>
  );
}