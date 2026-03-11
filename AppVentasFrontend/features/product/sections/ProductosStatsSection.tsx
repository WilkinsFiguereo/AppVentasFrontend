"use client";

import React from "react";
import { ProductoStatCard } from "../ui/ProductoCard";
import { Package, AlertTriangle, XCircle, Tag } from "lucide-react";
import type { Producto } from "../types/productos.types";
import { productosTheme as t } from "../theme/productos.theme";

interface ProductosStatsSectionProps {
  productos: Producto[];
}

export function ProductosStatsSection({ productos }: ProductosStatsSectionProps) {
  const total = productos.length;
  const stockBajo = productos.filter((p) => p.stockStatus === "bajo").length;
  const agotados = productos.filter((p) => p.stockStatus === "agotado").length;
  const categorias = new Set(productos.map((p) => p.categoria)).size;

  const stats = [
    {
      label: "Total Productos",
      value: String(total),
      Icon: Package,
      delta: "+0 este mes",
      color: t.brand400,
      bg: t.brand100,
    },
    {
      label: "Stock Bajo",
      value: String(stockBajo),
      Icon: AlertTriangle,
      delta: "Requieren reorden",
      color: t.warning,
      bg: t.warningBg,
    },
    {
      label: "Agotados",
      value: String(agotados),
      Icon: XCircle,
      delta: "Sin existencias",
      color: t.error,
      bg: t.errorBg,
    },
    {
      label: "Categorías",
      value: String(categorias),
      Icon: Tag,
      delta: "Activas",
      color: t.success,
      bg: t.successBg,
    },
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
      {stats.map((stat) => (
        <ProductoStatCard key={stat.label} stat={stat} />
      ))}
    </div>
  );
}