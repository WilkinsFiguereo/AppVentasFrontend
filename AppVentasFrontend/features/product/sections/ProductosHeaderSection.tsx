"use client";

import React from "react";
import { Plus, Download } from "lucide-react";
import { productosTheme as t } from "../theme/productos.theme";

interface ProductosHeaderSectionProps {
  totalFiltrados: number;
  onAgregar: () => void;
  onExportar: () => void;
}

export function ProductosHeaderSection({
  totalFiltrados,
  onAgregar,
  onExportar,
}: ProductosHeaderSectionProps) {
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
          Productos
        </h1>
        <p style={{ fontSize: 13, color: t.textSecondary, marginTop: 4 }}>
          Gestión de inventario ·{" "}
          <span style={{ color: t.brand400, fontWeight: 600 }}>
            {totalFiltrados} productos
          </span>
        </p>
      </div>

      {/* Acciones Rápidas */}
      <div style={{ display: "flex", gap: 10 }}>
        <button className="btn-secondary" onClick={onExportar}>
          <Download size={15} /> Exportar
        </button>
        <button className="btn-primary" onClick={onAgregar}>
          <Plus size={15} /> Nuevo Producto
        </button>
      </div>
    </div>
  );
}