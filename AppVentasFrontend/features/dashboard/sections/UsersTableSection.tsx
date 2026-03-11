"use client";

import React from "react";
import { Search, Filter, Eye, Pencil, Trash2 } from "lucide-react";
import { Product } from "../types/dashboard.types";
import { StockBadge, InvoiceBadge } from "../dashboards";
import { dashboardTheme as t } from "../theme/dashboard.theme";

const TABLE_HEADERS = [
  "Producto", "Categoría", "Stock",
  "Precio", "Factura", "Estado", "Fecha", "Acciones",
];

interface UsersTableSectionProps {
  products: Product[];
  search: string;
  onSearchChange: (value: string) => void;
  onAction: (msg: string) => void;
  totalCount: number;
}

export function UsersTableSection({
  products,
  search,
  onSearchChange,
  onAction,
  totalCount,
}: UsersTableSectionProps) {
  return (
    <div
      style={{
        background: t.bgCard,
        borderRadius: 16,
        border: `1px solid ${t.border}`,
        animation: "slideIn 0.5s ease 0.2s both",
      }}
    >
      {/* ── Header ── */}
      <div
        style={{
          padding: "20px 24px",
          borderBottom: `1px solid ${t.border}`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: t.textPrimary }}>
            Inventario &amp; Facturas
          </h2>
          <p style={{ fontSize: 12, color: t.textDisabled, marginTop: 2 }}>
            {products.length} productos encontrados
          </p>
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          {/* Search */}
          <div
            style={{
              display: "flex", alignItems: "center", gap: 8,
              background: t.bgAlt, border: `1px solid ${t.border}`,
              borderRadius: 10, padding: "8px 14px",
            }}
          >
            <span style={{ color: t.textDisabled, display: "flex" }}><Search size={15} /></span>
            <input
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Buscar producto o factura..."
              style={{
                border: "none", background: "transparent", outline: "none",
                fontSize: 13, color: t.textPrimary, width: 200, fontFamily: "inherit",
              }}
            />
          </div>

          {/* Filter btn */}
          <button
            className="action-btn"
            style={{
              border: `1px solid ${t.border}`, padding: "8px 14px",
              display: "flex", alignItems: "center", gap: 6,
              fontSize: 13, color: t.textSecondary,
            }}
          >
            <Filter size={14} /> Filtrar
          </button>
        </div>
      </div>

      {/* ── Table ── */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: t.bgAlt }}>
              {TABLE_HEADERS.map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "10px 16px", textAlign: "left",
                    fontSize: 11, fontWeight: 700, color: t.textDisabled,
                    letterSpacing: "0.06em", textTransform: "uppercase", whiteSpace: "nowrap",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr
                key={p.id}
                className="table-row"
                style={{ borderTop: `1px solid ${t.border}`, transition: "background 0.15s" }}
              >
                {/* Producto */}
                <td style={{ padding: "14px 16px" }}>
                  <div style={{ fontWeight: 600, fontSize: 13, color: t.textPrimary }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: t.textDisabled, fontFamily: "'DM Mono', monospace" }}>
                    {p.id}
                  </div>
                </td>

                {/* Categoría */}
                <td style={{ padding: "14px 16px" }}>
                  <span
                    style={{
                      background: t.bgAlt, color: t.textSecondary,
                      padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600,
                    }}
                  >
                    {p.category}
                  </span>
                </td>

                {/* Stock */}
                <td style={{ padding: "14px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div
                      style={{
                        width: 32, height: 32, borderRadius: 8,
                        background: p.stock === 0 ? t.errorBg : p.stock <= 6 ? t.warningBg : t.successBg,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 12, fontWeight: 700, fontFamily: "'DM Mono', monospace",
                        color: p.stock === 0 ? t.error : p.stock <= 6 ? t.warning : t.success,
                      }}
                    >
                      {p.stock}
                    </div>
                    <StockBadge status={p.stockStatus} />
                  </div>
                </td>

                {/* Precio */}
                <td
                  style={{
                    padding: "14px 16px", fontFamily: "'DM Mono', monospace",
                    fontWeight: 600, fontSize: 13, color: t.textPrimary,
                  }}
                >
                  {p.price}
                </td>

                {/* Factura */}
                <td style={{ padding: "14px 16px" }}>
                  <span style={{ fontSize: 12, fontFamily: "'DM Mono', monospace", color: t.brand400, fontWeight: 500 }}>
                    {p.invoice}
                  </span>
                </td>

                {/* Estado */}
                <td style={{ padding: "14px 16px" }}>
                  <InvoiceBadge status={p.invoiceStatus} />
                </td>

                {/* Fecha */}
                <td style={{ padding: "14px 16px", fontSize: 12, color: t.textSecondary }}>
                  {p.date}
                </td>

                {/* Acciones */}
                <td style={{ padding: "14px 16px" }}>
                  <div style={{ display: "flex", gap: 4 }}>
                    <button className="action-btn" title="Ver"
                      style={{ color: t.brand400 }}
                      onClick={() => onAction(`Abriendo ${p.name}...`)}>
                      <Eye size={15} />
                    </button>
                    <button className="action-btn" title="Editar"
                      style={{ color: t.textSecondary }}
                      onClick={() => onAction(`Editando ${p.name}...`)}>
                      <Pencil size={15} />
                    </button>
                    <button className="action-btn" title="Eliminar"
                      style={{ color: t.error }}
                      onClick={() => onAction(`${p.name} eliminado`)}>
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Footer / Pagination ── */}
      <div
        style={{
          padding: "14px 24px", borderTop: `1px solid ${t.border}`,
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}
      >
        <span style={{ fontSize: 12, color: t.textDisabled }}>
          Mostrando {products.length} de {totalCount} productos
        </span>
        <div style={{ display: "flex", gap: 6 }}>
          {[1, 2, 3].map((n) => (
            <button
              key={n}
              style={{
                width: 30, height: 30, borderRadius: 8,
                border: `1px solid ${n === 1 ? t.brand600 : t.border}`,
                background: n === 1 ? t.brand600 : "white",
                color: n === 1 ? "white" : t.textSecondary,
                fontSize: 12, fontWeight: 600, cursor: "pointer",
              }}
            >
              {n}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}