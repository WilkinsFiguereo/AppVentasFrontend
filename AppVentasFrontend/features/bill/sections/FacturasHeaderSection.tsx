"use client";

import React from "react";
import { Plus, Download } from "lucide-react";
import { facturasTheme as t } from "../theme/facturas.theme";

interface FacturasHeaderSectionProps {
  total: number;
  onNuevaFactura: () => void;
  onExportar: () => void;
}

export function FacturasHeaderSection({ total, onNuevaFactura, onExportar }: FacturasHeaderSectionProps) {
  return (
    <div style={{
      display: "flex", justifyContent: "space-between",
      alignItems: "flex-start", marginBottom: 28,
      animation: "slideIn 0.4s ease",
    }}>
      <div>
        <h1 style={{
          fontSize: 26, fontWeight: 700,
          color: t.textPrimary, letterSpacing: "-0.02em",
        }}>
          Facturas
        </h1>
        <p style={{ fontSize: 13, color: t.textSecondary, marginTop: 4 }}>
          Gestión de cobros ·{" "}
          <span style={{ color: t.brand400, fontWeight: 600 }}>{total} facturas</span>
        </p>
      </div>

      {/* Acciones rápidas */}
      <div style={{ display: "flex", gap: 10 }}>
        <button className="btn-secondary" onClick={onExportar}>
          <Download size={15} /> Exportar
        </button>
        <button className="btn-primary" onClick={onNuevaFactura}>
          <Plus size={15} /> Nueva Factura
        </button>
      </div>
    </div>
  );
}