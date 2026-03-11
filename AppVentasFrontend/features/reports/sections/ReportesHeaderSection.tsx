"use client";

import React from "react";
import { Download } from "lucide-react";
import { reportesTheme as t } from "../theme/reportes.theme";
import { PeriodoFiltro } from "../types/reportes.types";
import { PERIODOS } from "../data/reportes.data";

interface ReportesHeaderSectionProps {
  periodo: PeriodoFiltro;
  onPeriodoChange: (p: PeriodoFiltro) => void;
  onExportar: () => void;
}

export function ReportesHeaderSection({ periodo, onPeriodoChange, onExportar }: ReportesHeaderSectionProps) {
  return (
    <div style={{
      display: "flex", justifyContent: "space-between",
      alignItems: "flex-start", marginBottom: 28,
      animation: "slideIn 0.4s ease",
    }}>
      <div>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: t.textPrimary, letterSpacing: "-0.02em" }}>
          Reportes
        </h1>
        <p style={{ fontSize: 13, color: t.textSecondary, marginTop: 4 }}>
          Análisis de rendimiento y métricas clave
        </p>
      </div>

      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        {/* Selector de periodo */}
        <div style={{
          display: "flex", border: `1px solid ${t.border}`,
          borderRadius: 10, overflow: "hidden",
        }}>
          {PERIODOS.map((p) => (
            <button
              key={p.key}
              onClick={() => onPeriodoChange(p.key as PeriodoFiltro)}
              style={{
                padding: "8px 14px", border: "none", cursor: "pointer",
                fontSize: 12, fontWeight: 600, transition: "all 0.15s",
                background: periodo === p.key ? t.brand600 : "white",
                color: periodo === p.key ? "white" : t.textSecondary,
              }}
            >
              {p.label}
            </button>
          ))}
        </div>

        <button className="btn-secondary" onClick={onExportar}>
          <Download size={15} /> Exportar
        </button>
      </div>
    </div>
  );
}