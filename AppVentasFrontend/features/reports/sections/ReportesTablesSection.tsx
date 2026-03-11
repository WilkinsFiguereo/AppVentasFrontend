"use client";

import React from "react";
import { Package, User } from "lucide-react";
import { reportesTheme as t } from "../theme/reportes.theme";
import { PRODUCTOS_TOP, CLIENTES_TOP } from "../data/reportes.data";

// ─── Tabla Productos Top ──────────────────────────────────────────────
function ProductosTopTable() {
  const maxIngresos = Math.max(...PRODUCTOS_TOP.map((p) => p.ingresos));

  return (
    <div style={{
      background: "white", borderRadius: 16,
      border: `1px solid ${t.border}`, padding: "24px",
      flex: 1,
    }}>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 15, fontWeight: 700, color: t.textPrimary }}>
          Productos más vendidos
        </h2>
        <p style={{ fontSize: 12, color: t.textDisabled, marginTop: 4 }}>
          Por ingresos generados
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {PRODUCTOS_TOP.map((p, i) => (
          <div key={p.nombre}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {/* Ranking */}
                <div style={{
                  width: 24, height: 24, borderRadius: 8,
                  background: i === 0 ? t.brand600 : t.bgAlt,
                  color: i === 0 ? "white" : t.textDisabled,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, fontWeight: 700, flexShrink: 0,
                }}>
                  {i + 1}
                </div>
                <div style={{
                  width: 32, height: 32, borderRadius: 8,
                  background: t.brand100, color: t.brand600,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <Package size={15} />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: t.textPrimary }}>{p.nombre}</div>
                  <div style={{ fontSize: 11, color: t.textDisabled }}>{p.categoria} · {p.unidades} unid.</div>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: t.textPrimary, fontFamily: "'DM Mono', monospace" }}>
                  ${p.ingresos.toLocaleString()}
                </div>
                <div style={{ fontSize: 11, color: t.textDisabled }}>{p.porcentaje}% del total</div>
              </div>
            </div>
            {/* Barra de progreso */}
            <div style={{ height: 4, background: t.bgAlt, borderRadius: 4 }}>
              <div style={{
                height: "100%", borderRadius: 4,
                width: `${(p.ingresos / maxIngresos) * 100}%`,
                background: i === 0 ? t.brand400 : t.brand100,
                transition: "width 0.5s ease",
              }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Tabla Clientes Top ───────────────────────────────────────────────
function ClientesTopTable() {
  return (
    <div style={{
      background: "white", borderRadius: 16,
      border: `1px solid ${t.border}`, padding: "24px",
      flex: 1,
    }}>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 15, fontWeight: 700, color: t.textPrimary }}>
          Clientes principales
        </h2>
        <p style={{ fontSize: 12, color: t.textDisabled, marginTop: 4 }}>
          Por volumen de compra
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {CLIENTES_TOP.map((c, i) => (
          <div key={c.nombre} style={{
            display: "flex", justifyContent: "space-between",
            alignItems: "center", padding: "12px",
            borderRadius: 10, background: t.bgAlt,
            transition: "background 0.15s",
          }}
            className="table-row"
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {/* Avatar */}
              <div style={{
                width: 36, height: 36, borderRadius: "50%",
                background: `linear-gradient(135deg, ${t.brand600}, ${t.brand400})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "white", fontSize: 13, fontWeight: 700, flexShrink: 0,
              }}>
                {c.nombre.charAt(0)}
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: t.textPrimary }}>
                  {c.nombre}
                </div>
                <div style={{ fontSize: 11, color: t.textDisabled }}>{c.email}</div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: t.textPrimary, fontFamily: "'DM Mono', monospace" }}>
                  ${c.total.toLocaleString()}
                </div>
                <div style={{ fontSize: 11, color: t.textDisabled }}>{c.facturas} facturas</div>
              </div>
              <span style={{
                padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700,
                background: c.status === "activo" ? t.successBg : t.bgAlt,
                color: c.status === "activo" ? t.success : t.textDisabled,
              }}>
                {c.status === "activo" ? "Activo" : "Inactivo"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Section principal ─────────────────────────────────────────────────
export function ReportesTablesSection() {
  return (
    <div style={{
      display: "grid", gridTemplateColumns: "1fr 1fr",
      gap: 16,
      animation: "slideIn 0.5s ease 0.2s both",
    }}>
      <ProductosTopTable />
      <ClientesTopTable />
    </div>
  );
}