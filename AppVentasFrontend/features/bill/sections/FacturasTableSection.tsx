"use client";

import React from "react";
import {
  Search, LayoutList, Columns,
  ArrowUpDown, ArrowUp, ArrowDown,
  Eye, Pencil, Trash2, Send, FileText,
} from "lucide-react";
import { Factura, OrdenCampo, OrdenDir, VistaMode } from "../types/facturas.types";
import { StatusBadge } from "../ui/FacturaUI";
import { facturasTheme as t } from "../theme/facturas.theme";
import { STATUS_FILTERS } from "../data/facturas.data";

interface FacturasTableSectionProps {
  facturas: Factura[];
  search: string;
  filtroActivo: string;
  vistaMode: VistaMode;
  ordenCampo: OrdenCampo;
  ordenDir: OrdenDir;
  totalCount: number;
  onSearchChange: (v: string) => void;
  onFiltroChange: (v: string) => void;
  onVistaModeChange: (v: VistaMode) => void;
  onToggleOrden: (campo: OrdenCampo) => void;
  onAction: (msg: string) => void;
}

// ─── Icono de orden ───────────────────────────────────────────────────
function OrdenIcon({ campo, activo, dir }: { campo: OrdenCampo; activo: OrdenCampo; dir: OrdenDir }) {
  if (campo !== activo) return <ArrowUpDown size={12} style={{ opacity: 0.3 }} />;
  return dir === "asc"
    ? <ArrowUp size={12} style={{ color: t.brand400 }} />
    : <ArrowDown size={12} style={{ color: t.brand400 }} />;
}

// ─── Vista Tabla ──────────────────────────────────────────────────────
function VistaTabla({ facturas, ordenCampo, ordenDir, onToggleOrden, onAction }: {
  facturas: Factura[];
  ordenCampo: OrdenCampo;
  ordenDir: OrdenDir;
  onToggleOrden: (c: OrdenCampo) => void;
  onAction: (msg: string) => void;
}) {
  const headers: { label: string; campo?: OrdenCampo }[] = [
    { label: "Nº Factura",  campo: "numero"  },
    { label: "Cliente",     campo: "cliente" },
    { label: "Fecha",       campo: "fecha"   },
    { label: "Vencimiento"                   },
    { label: "Items"                         },
    { label: "Subtotal"                      },
    { label: "Impuesto"                      },
    { label: "Total",       campo: "total"   },
    { label: "Estado",      campo: "status"  },
    { label: "Acciones"                      },
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
          {facturas.map((f) => (
            <tr key={f.id} className="table-row"
              style={{ borderTop: `1px solid ${t.border}`, transition: "background 0.15s" }}>

              {/* Nº Factura */}
              <td style={{ padding: "14px 16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{
                    width: 34, height: 34, borderRadius: 9,
                    background: t.brand100, color: t.brand600,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <FileText size={15} />
                  </div>
                  <span style={{
                    fontSize: 12, fontFamily: "'DM Mono', monospace",
                    color: t.brand400, fontWeight: 600,
                  }}>
                    {f.numero}
                  </span>
                </div>
              </td>

              {/* Cliente */}
              <td style={{ padding: "14px 16px" }}>
                <div style={{ fontWeight: 600, fontSize: 13, color: t.textPrimary }}>
                  {f.cliente}
                </div>
                <div style={{ fontSize: 11, color: t.textDisabled }}>
                  {f.clienteEmail}
                </div>
              </td>

              {/* Fecha */}
              <td style={{ padding: "14px 16px", fontSize: 12, color: t.textSecondary }}>
                {f.fecha}
              </td>

              {/* Vencimiento */}
              <td style={{ padding: "14px 16px" }}>
                <span style={{
                  fontSize: 12,
                  color: f.status === "vencida" ? t.error : t.textSecondary,
                  fontWeight: f.status === "vencida" ? 700 : 400,
                }}>
                  {f.fechaVencimiento}
                </span>
              </td>

              {/* Items */}
              <td style={{ padding: "14px 16px" }}>
                <span style={{
                  background: t.bgAlt, color: t.textSecondary,
                  padding: "3px 10px", borderRadius: 20,
                  fontSize: 11, fontWeight: 600,
                }}>
                  {f.items} items
                </span>
              </td>

              {/* Subtotal */}
              <td style={{ padding: "14px 16px", fontFamily: "'DM Mono', monospace", fontSize: 12, color: t.textSecondary }}>
                ${f.subtotal.toFixed(2)}
              </td>

              {/* Impuesto */}
              <td style={{ padding: "14px 16px", fontFamily: "'DM Mono', monospace", fontSize: 12, color: t.textSecondary }}>
                ${f.impuesto.toFixed(2)}
              </td>

              {/* Total */}
              <td style={{ padding: "14px 16px", fontFamily: "'DM Mono', monospace", fontWeight: 700, fontSize: 14, color: t.textPrimary }}>
                ${f.total.toFixed(2)}
              </td>

              {/* Estado */}
              <td style={{ padding: "14px 16px" }}>
                <StatusBadge status={f.status} />
              </td>

              {/* Acciones */}
              <td style={{ padding: "14px 16px" }}>
                <div style={{ display: "flex", gap: 4 }}>
                  <button className="action-btn" title="Ver" style={{ color: t.brand400 }}
                    onClick={() => onAction(`Abriendo ${f.numero}...`)}>
                    <Eye size={15} />
                  </button>
                  <button className="action-btn" title="Editar" style={{ color: t.textSecondary }}
                    onClick={() => onAction(`Editando ${f.numero}...`)}>
                    <Pencil size={15} />
                  </button>
                  {f.status === "borrador" && (
                    <button className="action-btn" title="Enviar" style={{ color: t.success }}
                      onClick={() => onAction(`${f.numero} enviada al cliente`)}>
                      <Send size={15} />
                    </button>
                  )}
                  <button className="action-btn" title="Eliminar" style={{ color: t.error }}
                    onClick={() => onAction(`${f.numero} eliminada`)}>
                    <Trash2 size={15} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Vista Kanban ─────────────────────────────────────────────────────
function VistaKanban({ facturas, onAction }: { facturas: Factura[]; onAction: (msg: string) => void }) {
  const columnas: { key: string; label: string; color: string; bg: string }[] = [
    { key: "borrador",  label: "Borrador",  color: t.textDisabled, bg: t.bgAlt     },
    { key: "pendiente", label: "Pendiente", color: t.warning,      bg: t.warningBg },
    { key: "vencida",   label: "Vencida",   color: t.error,        bg: t.errorBg   },
    { key: "pagada",    label: "Pagada",    color: t.success,      bg: t.successBg },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, padding: "20px 24px" }}>
      {columnas.map((col) => {
        const items = facturas.filter((f) => f.status === col.key);
        const totalCol = items.reduce((sum, f) => sum + f.total, 0);
        return (
          <div key={col.key}>
            {/* Columna header */}
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              marginBottom: 12, padding: "8px 12px",
              background: col.bg, borderRadius: 10,
            }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: col.color }}>
                {col.label}
              </span>
              <span style={{
                background: "white", color: col.color,
                borderRadius: 20, padding: "1px 8px",
                fontSize: 11, fontWeight: 700,
              }}>
                {items.length}
              </span>
            </div>

            {/* Total columna */}
            <div style={{
              fontSize: 11, color: t.textDisabled,
              fontFamily: "'DM Mono', monospace",
              marginBottom: 10, paddingLeft: 4,
            }}>
              ${totalCol.toFixed(2)}
            </div>

            {/* Cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {items.map((f) => (
                <div key={f.id} className="stat-card" style={{
                  borderRadius: 12, background: "white",
                  border: `1px solid ${t.border}`, padding: "14px",
                  transition: "all 0.2s",
                }}>
                  <div style={{
                    fontSize: 11, fontFamily: "'DM Mono', monospace",
                    color: t.brand400, fontWeight: 600, marginBottom: 6,
                  }}>
                    {f.numero}
                  </div>
                  <div style={{ fontWeight: 600, fontSize: 13, color: t.textPrimary, marginBottom: 2 }}>
                    {f.cliente}
                  </div>
                  <div style={{ fontSize: 11, color: t.textDisabled, marginBottom: 10 }}>
                    Vence: {f.fechaVencimiento}
                  </div>
                  <div style={{
                    display: "flex", justifyContent: "space-between",
                    alignItems: "center", borderTop: `1px solid ${t.border}`, paddingTop: 10,
                  }}>
                    <span style={{
                      fontFamily: "'DM Mono', monospace", fontWeight: 700,
                      fontSize: 14, color: t.textPrimary,
                    }}>
                      ${f.total.toFixed(2)}
                    </span>
                    <div style={{ display: "flex", gap: 4 }}>
                      <button className="action-btn" style={{ color: t.brand400 }}
                        onClick={() => onAction(`Abriendo ${f.numero}...`)}>
                        <Eye size={13} />
                      </button>
                      <button className="action-btn" style={{ color: t.textSecondary }}
                        onClick={() => onAction(`Editando ${f.numero}...`)}>
                        <Pencil size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {items.length === 0 && (
                <div style={{
                  padding: "24px", textAlign: "center",
                  color: t.textDisabled, fontSize: 12,
                  border: `2px dashed ${t.border}`, borderRadius: 12,
                }}>
                  Sin facturas
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Section principal ─────────────────────────────────────────────────
export function FacturasTableSection({
  facturas, search, filtroActivo, vistaMode,
  ordenCampo, ordenDir, totalCount,
  onSearchChange, onFiltroChange, onVistaModeChange,
  onToggleOrden, onAction,
}: FacturasTableSectionProps) {
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
        {/* Filtros de status */}
        <div style={{ display: "flex", gap: 6 }}>
          {STATUS_FILTERS.map((f) => (
            <button key={f} onClick={() => onFiltroChange(f)} style={{
              padding: "6px 14px", borderRadius: 20, border: "none",
              fontSize: 12, fontWeight: 600, cursor: "pointer",
              transition: "all 0.15s",
              background: filtroActivo === f ? t.brand600 : t.bgAlt,
              color: filtroActivo === f ? "white" : t.textSecondary,
            }}>
              {f}
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
              placeholder="Buscar factura o cliente..."
              style={{
                border: "none", background: "transparent", outline: "none",
                fontSize: 13, color: t.textPrimary, width: 190, fontFamily: "inherit",
              }}
            />
          </div>

          {/* Toggle tabla / kanban */}
          <div style={{
            display: "flex", border: `1px solid ${t.border}`,
            borderRadius: 10, overflow: "hidden",
          }}>
            <button onClick={() => onVistaModeChange("tabla")} style={{
              padding: "8px 12px", border: "none", cursor: "pointer",
              background: vistaMode === "tabla" ? t.brand600 : "white",
              color: vistaMode === "tabla" ? "white" : t.textSecondary,
              transition: "all 0.15s", display: "flex", alignItems: "center",
            }}>
              <LayoutList size={15} />
            </button>
            <button onClick={() => onVistaModeChange("kanban")} style={{
              padding: "8px 12px", border: "none", cursor: "pointer",
              background: vistaMode === "kanban" ? t.brand600 : "white",
              color: vistaMode === "kanban" ? "white" : t.textSecondary,
              transition: "all 0.15s", display: "flex", alignItems: "center",
            }}>
              <Columns size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Contenido ── */}
      {vistaMode === "tabla" ? (
        <VistaTabla
          facturas={facturas}
          ordenCampo={ordenCampo}
          ordenDir={ordenDir}
          onToggleOrden={onToggleOrden}
          onAction={onAction}
        />
      ) : (
        <VistaKanban facturas={facturas} onAction={onAction} />
      )}

      {/* ── Footer ── */}
      <div style={{
        padding: "14px 24px", borderTop: `1px solid ${t.border}`,
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <span style={{ fontSize: 12, color: t.textDisabled }}>
          Mostrando {facturas.length} de {totalCount} facturas
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