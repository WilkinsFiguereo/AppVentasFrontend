"use client";

import React from "react";
import { BarChart, DonutChart } from "../ui/ReporteUI";
import { reportesTheme as t } from "../theme/reportes.theme";
import { PuntoGrafica } from "../types/reportes.types";
import { DISTRIBUCION } from "../data/reportes.data";

interface ReportesGraficaSectionProps {
  datos: PuntoGrafica[];
}

export function ReportesGraficaSection({ datos }: ReportesGraficaSectionProps) {
  return (
    <div style={{
      display: "grid", gridTemplateColumns: "1fr 340px",
      gap: 16, marginBottom: 24,
      animation: "slideIn 0.5s ease 0.15s both",
    }}>
      {/* Gráfica de barras */}
      <div style={{
        background: "white", borderRadius: 16,
        border: `1px solid ${t.border}`, padding: "24px",
      }}>
        <div style={{ marginBottom: 20 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: t.textPrimary }}>
            Ventas vs Cobros vs Gastos
          </h2>
          <p style={{ fontSize: 12, color: t.textDisabled, marginTop: 4 }}>
            Comparativa del periodo seleccionado
          </p>
        </div>
        <BarChart datos={datos} />
      </div>

      {/* Donut de distribución */}
      <div style={{
        background: "white", borderRadius: 16,
        border: `1px solid ${t.border}`, padding: "24px",
      }}>
        <div style={{ marginBottom: 20 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: t.textPrimary }}>
            Ventas por Categoría
          </h2>
          <p style={{ fontSize: 12, color: t.textDisabled, marginTop: 4 }}>
            Distribución porcentual
          </p>
        </div>
        <DonutChart datos={DISTRIBUCION} />
      </div>
    </div>
  );
}