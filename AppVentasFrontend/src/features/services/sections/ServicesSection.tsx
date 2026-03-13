// src/features/services/sections/ServicesSection.tsx
"use client";

import { useServices }   from "../hooks/useServices";
import { ServiceCard }   from "../ui/ServiceCard";
import { SORT_OPTIONS }  from "../data/constants";
import type { Service }  from "../types/services.types";
import Navbar from "../../home/sections/Navbar/Navbar";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function ServicesSection() {
  const {
    services, allCount, fetchState, errorMsg, load,
    search, setSearch,
    category, setCategory, categories, categoryCounts,
    sort, setSort,
    viewMode, setViewMode,
    showing,
  } = useServices();
  const router = useRouter();
  const [cartCount, setCartCount] = useState(0);
  const goToProduct = (serviceId: number) => {
    router.push(`/navigation/products/${serviceId}`);
  };
  

  function handleHire(s: Service) {
    // TODO: connect to cart / checkout
    alert(`"${s.name}" agregado al carrito`);
  }

  return (
    <div className="sv-page">
      
    <Navbar cart={cartCount} />
      {/* ── HERO ─────────────────────────────────────────── */}
      <div className="sv-hero">
        <div className="sv-hero-content">
          <p className="sv-hero-eyebrow">Catálogo de servicios</p>
          <h1 className="sv-hero-title">Soluciones para tu empresa</h1>
          <p className="sv-hero-sub">
            Todos los servicios disponibles. Busca, filtra y contrata en segundos.
          </p>
        </div>

        <div className="sv-search-wrap">
          <svg className="sv-search-icon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            className="sv-search"
            type="text"
            placeholder="Buscar por nombre, código, categoría…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button className="sv-search-clear" onClick={() => setSearch("")}>×</button>
          )}
        </div>
      </div>

      {/* ── BODY ─────────────────────────────────────────── */}
      <div className="sv-body">

        {/* Sidebar — categories derived from Odoo data */}
        <aside className="sv-sidebar">
          <p className="sv-sidebar-label">Categorías</p>
          <nav className="sv-cat-nav">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`sv-cat-btn${category === cat ? " active" : ""}`}
                onClick={() => setCategory(cat)}
              >
                <span className="sv-cat-name">{cat}</span>
                {categoryCounts[cat] != null && (
                  <span className="sv-cat-count">{categoryCounts[cat]}</span>
                )}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main */}
        <main className="sv-main">

          {/* Toolbar */}
          <div className="sv-toolbar">
            <p className="sv-count">
              {fetchState === "success" && (
                <>
                  {showing} {showing === 1 ? "servicio" : "servicios"}
                  {(search || category !== "Todos") ? ` de ${allCount}` : ""}
                </>
              )}
            </p>
            <div className="sv-toolbar-right">
              <select
                className="sv-sort"
                value={sort}
                onChange={(e) => setSort(e.target.value as typeof sort)}
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.id} value={o.id}>{o.label}</option>
                ))}
              </select>
              <div className="sv-view-btns">
                <button className={`sv-view-btn${viewMode === "grid" ? " active" : ""}`} onClick={() => setViewMode("grid")}>⊞</button>
                <button className={`sv-view-btn${viewMode === "list" ? " active" : ""}`} onClick={() => setViewMode("list")}>☰</button>
              </div>
            </div>
          </div>

          {/* Loading */}
          {fetchState === "loading" && (
            <div className="sv-state">
              <div className="sv-spinner" />
              <p>Cargando servicios desde Odoo…</p>
            </div>
          )}

          {/* Error */}
          {fetchState === "error" && (
            <div className="sv-state sv-state--error">
              <span>⚠️</span>
              <p>{errorMsg}</p>
              <button className="sv-retry-btn" onClick={load}>Reintentar</button>
            </div>
          )}

          {/* Empty */}
          {fetchState === "success" && services.length === 0 && (
            <div className="sv-state">
              <span style={{ fontSize: "2rem" }}>🔍</span>
              <p>No hay servicios con ese criterio</p>
              <button className="sv-retry-btn" onClick={() => { setSearch(""); setCategory("Todos"); }}>
                Limpiar filtros
              </button>
            </div>
          )}

          {/* Results */}
          {fetchState === "success" && services.length > 0 && (
            <div className={viewMode === "grid" ? "sv-grid" : "sv-list"}>
              {services.map((s) => (
                <ServiceCard
                  key={s.id}
                  service={s}
                  mode={viewMode}
                  onHire={handleHire}
                  onDetail={goToProduct}
                />
              ))}
            </div>
          )}

        </main>
      </div>

    </div>
  );
}

export default ServicesSection;
