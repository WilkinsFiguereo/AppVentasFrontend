// src/features/my-orders/sections/MyOrdersSection.tsx
"use client";

import { useMyOrders }  from "../hooks/useMyOrders";
import { StatsStrip }   from "../ui/StatsStrip";
import { OrderCard }    from "../ui/OrderCard";
import { FILTER_TABS }  from "../data/constants";
import Navbar from "src/features/home/sections/Navbar/Navbar";
import { useState } from "react";

export function MyOrdersSection() {
  const {
    orders, fetchState, errorMsg,
    activeFilter, setActiveFilter,
    expandedId, toggleExpand,
    counts, stats, reload,
  } = useMyOrders();
  const [cartCount, setCartCount] = useState(0);

  return (
    <>
      <Navbar cart={cartCount} />
      <div className="mo-page">
        
        {/* ── Header ─────────────────────────────────────── */}
        <div className="mo-header">
          <div>
            <h1 className="mo-title">Mis pedidos</h1>
            <p className="mo-sub">Historial y seguimiento de tus compras</p>
          </div>
          <button className="mo-reload-btn" onClick={reload} disabled={fetchState === "loading"}>
            {fetchState === "loading" ? "Actualizando…" : "↻ Actualizar"}
          </button>
        </div>

        {/* ── Stats ──────────────────────────────────────── */}
        {fetchState === "success" && (
          <StatsStrip {...stats} />
        )}

        {/* ── Filter tabs ────────────────────────────────── */}
        <div className="mo-filters">
          {FILTER_TABS.map((tab) => (
            (counts[tab.id] > 0 || tab.id === "all") ? (
              <button
                key={tab.id}
                className={`mo-filter-btn${activeFilter === tab.id ? " active" : ""}`}
                onClick={() => setActiveFilter(tab.id)}
              >
                {tab.label}
                {counts[tab.id] > 0 && (
                  <span className="mo-filter-count">{counts[tab.id]}</span>
                )}
              </button>
            ) : null
          ))}
        </div>

        {/* ── Content ────────────────────────────────────── */}
        {fetchState === "loading" && (
          <div className="mo-loading">
            <div className="mo-spinner" />
            <p>Cargando tus pedidos…</p>
          </div>
        )}

        {fetchState === "error" && (
          <div className="mo-error">
            <span className="mo-error-icon">⚠️</span>
            <p className="mo-error-title">No se pudieron cargar los pedidos</p>
            <p className="mo-error-msg">{errorMsg}</p>
            <button className="mo-reload-btn" onClick={reload}>Reintentar</button>
          </div>
        )}

        {fetchState === "success" && orders.length === 0 && (
          <div className="mo-empty">
            <span className="mo-empty-icon">📭</span>
            <p className="mo-empty-title">Sin pedidos en este estado</p>
            <p className="mo-empty-sub">Cuando realices compras aparecerán aquí</p>
            <button className="mo-reload-btn" onClick={() => setActiveFilter("all")}>
              Ver todos
            </button>
          </div>
        )}

        {fetchState === "success" && orders.length > 0 && (
          <div className="mo-list">
            {orders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                expanded={expandedId === order.id}
                onToggle={() => toggleExpand(order.id)}
              />
            ))}
          </div>
        )}

      </div>
    </>
  );
}