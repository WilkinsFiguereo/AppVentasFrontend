"use client";

import React, { useMemo } from "react";
import {
  Search, LayoutGrid, LayoutList,
  ArrowUpDown, ArrowUp, ArrowDown,
  Eye, Pencil, Trash2, Package,
} from "lucide-react";
import { Producto, VistaMode, OrdenCampo, OrdenDir } from "../types/productos.types";
import { StockBadge } from "../ui/ProductoCard";
import { productosTheme as t } from "../theme/productos.theme";
// categories will be computed from current productos list

interface ProductosTableSectionProps {
  productos: Producto[];
  search: string;
  categoriaActiva: string;
  vistaMode: VistaMode;
  ordenCampo: OrdenCampo;
  ordenDir: OrdenDir;
  totalCount: number;
  onSearchChange: (v: string) => void;
  onCategoriaChange: (v: string) => void;
  onVistaModeChange: (v: VistaMode) => void;
  onToggleOrden: (campo: OrdenCampo) => void;
  onView: (p: Producto) => void;
  onEdit: (p: Producto) => void;
  onDelete: (p: Producto) => void;
}

// ─── Icono de orden en columna ────────────────────────────────────────
function OrdenIcon({ campo, activo, dir }: { campo: OrdenCampo; activo: OrdenCampo; dir: OrdenDir }) {
  if (campo !== activo) return <ArrowUpDown size={12} style={{ opacity: 0.3 }} />;
  return dir === "asc"
    ? <ArrowUp size={12} style={{ color: t.brand400 }} />
    : <ArrowDown size={12} style={{ color: t.brand400 }} />;
}

// ─── Vista Tabla ─────────────────────────────────────────────────────
function VistaTabla({ productos, ordenCampo, ordenDir, onToggleOrden, onView, onEdit, onDelete }: {
  productos: Producto[];
  ordenCampo: OrdenCampo;
  ordenDir: OrdenDir;
  onToggleOrden: (c: OrdenCampo) => void;
  onView: (p: Producto) => void;
  onEdit: (p: Producto) => void;
  onDelete: (p: Producto) => void;
}) {
  const headers: { label: string; campo?: OrdenCampo }[] = [
    { label: "Producto",   campo: "nombre"    },
    { label: "SKU"                            },
    { label: "Categoría",  campo: "categoria" },
    { label: "Stock",      campo: "stock"     },
    { label: "Precio",     campo: "precio"    },
    { label: "Costo"                          },
    { label: "Margen"                         },
    { label: "Proveedor"                      },
    { label: "Acciones"                       },
  ];

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: t.bgAlt }}>
            {headers.map(({ label, campo }) => (
              <th
                key={label}
                onClick={() => campo && onToggleOrden(campo)}
                style={{
                  padding: "10px 16px", textAlign: "left",
                  fontSize: 11, fontWeight: 700, color: t.textDisabled,
                  letterSpacing: "0.06em", textTransform: "uppercase",
                  whiteSpace: "nowrap",
                  cursor: campo ? "pointer" : "default",
                  userSelect: "none",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  {label}
                  {campo && <OrdenIcon campo={campo} activo={ordenCampo} dir={ordenDir} />}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => {
            const margen = (((p.precio - p.costo) / p.precio) * 100).toFixed(0);
            return (
              <tr key={p.id} className="table-row"
                style={{ borderTop: `1px solid ${t.border}`, transition: "background 0.15s" }}>

                {/* Producto */}
                <td style={{ padding: "14px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 10,
                      background: t.brand100, color: t.brand600,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                    }}>
                      <Package size={16} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 13, color: t.textPrimary }}>
                        {p.nombre}
                      </div>
                      <div style={{ fontSize: 11, color: t.textDisabled, fontFamily: "'DM Mono', monospace" }}>
                        {p.id}
                      </div>
                    </div>
                  </div>
                </td>

                {/* SKU */}
                <td style={{ padding: "14px 16px" }}>
                  <span style={{ fontSize: 11, fontFamily: "'DM Mono', monospace", color: t.textSecondary }}>
                    {p.sku}
                  </span>
                </td>

                {/* Categoría */}
                <td style={{ padding: "14px 16px" }}>
                  <span style={{
                    background: t.bgAlt, color: t.textSecondary,
                    padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600,
                  }}>
                    {p.categoria}
                  </span>
                </td>

                {/* Stock */}
                <td style={{ padding: "14px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: 8,
                      background: p.stock === 0 ? t.errorBg : p.stock <= 6 ? t.warningBg : t.successBg,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 12, fontWeight: 700, fontFamily: "'DM Mono', monospace",
                      color: p.stock === 0 ? t.error : p.stock <= 6 ? t.warning : t.success,
                    }}>
                      {p.stock}
                    </div>
                    <StockBadge status={p.stockStatus} />
                  </div>
                </td>

                {/* Precio */}
                <td style={{ padding: "14px 16px", fontFamily: "'DM Mono', monospace", fontWeight: 600, fontSize: 13, color: t.textPrimary }}>
                  ${p.precio.toFixed(2)}
                </td>

                {/* Costo */}
                <td style={{ padding: "14px 16px", fontFamily: "'DM Mono', monospace", fontSize: 13, color: t.textSecondary }}>
                  ${p.costo.toFixed(2)}
                </td>

                {/* Margen */}
                <td style={{ padding: "14px 16px" }}>
                  <span style={{
                    background: Number(margen) >= 30 ? t.successBg : t.warningBg,
                    color: Number(margen) >= 30 ? t.success : t.warning,
                    padding: "3px 10px", borderRadius: 20,
                    fontSize: 11, fontWeight: 700,
                  }}>
                    {margen}%
                  </span>
                </td>

                {/* Proveedor */}
                <td style={{ padding: "14px 16px", fontSize: 12, color: t.textSecondary }}>
                  {p.proveedor}
                </td>

                {/* Acciones */}
                <td style={{ padding: "14px 16px" }}>
                  <div style={{ display: "flex", gap: 4 }}>
                    <button className="action-btn" title="Ver" style={{ color: t.brand400 }}
                      onClick={() => onView(p)}>
                      <Eye size={15} />
                    </button>
                    <button className="action-btn" title="Editar" style={{ color: t.textSecondary }}
                      onClick={() => onEdit(p)}>
                      <Pencil size={15} />
                    </button>
                    <button className="action-btn" title="Eliminar" style={{ color: t.error }}
                      onClick={() => onDelete(p)}>
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ─── Vista Grilla ─────────────────────────────────────────────────────
function VistaGrilla({ productos, onView, onEdit, onDelete }: {
  productos: Producto[];
  onView: (p: Producto) => void;
  onEdit: (p: Producto) => void;
  onDelete: (p: Producto) => void;
}) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
      gap: 16, padding: "20px 24px",
    }}>
      {productos.map((p) => {
        const margen = (((p.precio - p.costo) / p.precio) * 100).toFixed(0);
        return (
          <div key={p.id} className="stat-card" style={{
            borderRadius: 14, background: "white",
            border: `1px solid ${t.border}`, padding: "18px",
            transition: "all 0.2s ease",
          }}>
            {/* Icono + badge */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: t.brand100, color: t.brand600,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Package size={20} />
              </div>
              <StockBadge status={p.stockStatus} />
            </div>

            {/* Info */}
            <div style={{ fontWeight: 700, fontSize: 13, color: t.textPrimary, marginBottom: 4, lineHeight: 1.3 }}>
              {p.nombre}
            </div>
            <div style={{ fontSize: 11, color: t.textDisabled, fontFamily: "'DM Mono', monospace", marginBottom: 12 }}>
              {p.sku}
            </div>

            {/* Precio y stock */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <span style={{ fontSize: 18, fontWeight: 700, color: t.textPrimary, fontFamily: "'DM Mono', monospace" }}>
                ${p.precio.toFixed(0)}
              </span>
              <span style={{
                background: Number(margen) >= 30 ? t.successBg : t.warningBg,
                color: Number(margen) >= 30 ? t.success : t.warning,
                padding: "2px 8px", borderRadius: 20,
                fontSize: 11, fontWeight: 700,
              }}>
                {margen}% margen
              </span>
            </div>

            {/* Stock bar */}
            <div style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 10, color: t.textDisabled }}>Stock</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: t.textSecondary }}>{p.stock} unid.</span>
              </div>
              <div style={{ height: 4, background: t.bgAlt, borderRadius: 4 }}>
                <div style={{
                  height: "100%", borderRadius: 4,
                  width: `${Math.min((p.stock / 35) * 100, 100)}%`,
                  background: p.stock === 0 ? t.error : p.stock <= 6 ? t.warning : t.success,
                  transition: "width 0.4s ease",
                }} />
              </div>
            </div>

            {/* Acciones */}
            <div style={{ display: "flex", gap: 6, borderTop: `1px solid ${t.border}`, paddingTop: 12 }}>
              <button className="action-btn" style={{ flex: 1, justifyContent: "center", display: "flex", color: t.brand400 }}
                onClick={() => onView(p)}>
                <Eye size={14} />
              </button>
              <button className="action-btn" style={{ flex: 1, justifyContent: "center", display: "flex", color: t.textSecondary }}
                onClick={() => onEdit(p)}>
                <Pencil size={14} />
              </button>
              <button className="action-btn" style={{ flex: 1, justifyContent: "center", display: "flex", color: t.error }}
                onClick={() => onDelete(p)}>
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Section principal ────────────────────────────────────────────────
export function ProductosTableSection({
  productos, search, categoriaActiva, vistaMode,
  ordenCampo, ordenDir, totalCount,
  onSearchChange, onCategoriaChange, onVistaModeChange,
  onToggleOrden, onView, onEdit, onDelete,
}: ProductosTableSectionProps) {
  const cleanProductos = useMemo(() => {
    return productos.filter((p) => {
      const type = (p.type ?? "").toLowerCase();
      const categoria = (p.categoria ?? "").toLowerCase();
      const isServiceType = type.includes("service") || type.includes("servicio");
      const isServiceCategory = categoria.includes("servicio") || categoria.includes("service");
      return !isServiceType && !isServiceCategory;
    });
  }, [productos]);

  return (
    <div style={{
      background: "white", borderRadius: 16,
      border: `1px solid ${t.border}`,
      animation: "slideIn 0.5s ease 0.2s both",
    }}>
      {/* ── Toolbar ── */}
      <div style={{
        padding: "16px 24px", borderBottom: `1px solid ${t.border}`,
        display: "flex", justifyContent: "space-between",
        alignItems: "center", flexWrap: "wrap", gap: 12,
      }}>
        {/* Filtros de categoría */}
        <div style={{ display: "flex", gap: 6 }}>
          {React.useMemo(() => {
            const cats = ["Todas", ...new Set(cleanProductos.map((p) => p.categoria))];
            return cats;
          }, [cleanProductos]).map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoriaChange(cat)}
              style={{
                padding: "6px 14px", borderRadius: 20, border: "none",
                fontSize: 12, fontWeight: 600, cursor: "pointer",
                transition: "all 0.15s",
                background: categoriaActiva === cat ? t.brand600 : t.bgAlt,
                color: categoriaActiva === cat ? "white" : t.textSecondary,
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Buscador + toggle vista */}
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            background: t.bgAlt, border: `1px solid ${t.border}`,
            borderRadius: 10, padding: "8px 14px",
          }}>
            <Search size={14} style={{ color: t.textDisabled }} />
            <input
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Buscar producto o SKU..."
              style={{
                border: "none", background: "transparent", outline: "none",
                fontSize: 13, color: t.textPrimary, width: 180, fontFamily: "inherit",
              }}
            />
          </div>

          {/* Toggle tabla / grilla */}
          <div style={{
            display: "flex", border: `1px solid ${t.border}`,
            borderRadius: 10, overflow: "hidden",
          }}>
            <button
              onClick={() => onVistaModeChange("tabla")}
              style={{
                padding: "8px 12px", border: "none", cursor: "pointer",
                background: vistaMode === "tabla" ? t.brand600 : "white",
                color: vistaMode === "tabla" ? "white" : t.textSecondary,
                transition: "all 0.15s", display: "flex", alignItems: "center",
              }}
            >
              <LayoutList size={15} />
            </button>
            <button
              onClick={() => onVistaModeChange("grilla")}
              style={{
                padding: "8px 12px", border: "none", cursor: "pointer",
                background: vistaMode === "grilla" ? t.brand600 : "white",
                color: vistaMode === "grilla" ? "white" : t.textSecondary,
                transition: "all 0.15s", display: "flex", alignItems: "center",
              }}
            >
              <LayoutGrid size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Contenido ── */}
      {vistaMode === "tabla" ? (
        <VistaTabla
          productos={cleanProductos}
          ordenCampo={ordenCampo}
          ordenDir={ordenDir}
          onToggleOrden={onToggleOrden}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ) : (
        <VistaGrilla productos={cleanProductos} onView={onView} onEdit={onEdit} onDelete={onDelete} />
      )}

      {/* ── Footer ── */}
      <div style={{
        padding: "14px 24px", borderTop: `1px solid ${t.border}`,
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <span style={{ fontSize: 12, color: t.textDisabled }}>
          Mostrando {cleanProductos.length} de {totalCount} productos
        </span>
        <div style={{ display: "flex", gap: 6 }}>
          {[1, 2, 3].map((n) => (
            <button key={n} style={{
              width: 30, height: 30, borderRadius: 8,
              border: `1px solid ${n === 1 ? t.brand600 : t.border}`,
              background: n === 1 ? t.brand600 : "white",
              color: n === 1 ? "white" : t.textSecondary,
              fontSize: 12, fontWeight: 600, cursor: "pointer",
            }}>{n}</button>
          ))}
        </div>
      </div>
    </div>
  );
}
