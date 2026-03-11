"use client";

import Navbar from "../../home/sections/Navbar/Navbar"; // ⚠️ ajusta la ruta si es necesario

import { useDeals } from "../hooks/useDeals";
import { HeroBanner } from "../ui/HeroBanner";
import { DealCard } from "../ui/DealCard";
import { Deal } from "../types/deals.types";
import {
  FEATURED_BANNERS,
  DEAL_CATEGORIES,
  DISCOUNT_FILTERS,
  TAG_FILTERS,
} from "../data/mockDeals";

function calcDiscount(price: number, original: number) {
  return Math.round((1 - price / original) * 100);
}

export function DealsSection() {
  const {
    filters,
    results,
    activeBanner,
    setActiveBanner,
    updateFilter,
    resetFilters,
  } = useDeals();

  function handleAddToCart(deal: Deal) {
    console.log("Add to cart:", deal.id);
  }

  const hasFilters =
    filters.category !== "all" ||
    filters.minDiscount > 0 ||
    filters.tag !== "all";

  const avgDiscount = results.length
    ? Math.round(
        results.reduce(
          (acc, d) => acc + calcDiscount(d.price, d.originalPrice),
          0
        ) / results.length
      )
    : 0;

  const maxDiscount = results.length
    ? Math.max(...results.map((d) => calcDiscount(d.price, d.originalPrice)))
    : 0;

  return (
    <div className="deals-page">

      {/* 🔥 NAVBAR AGREGADO AQUÍ */}
      <Navbar cart={0} />

      {/* Hero banner */}
      <HeroBanner
        banners={FEATURED_BANNERS}
        active={activeBanner}
        onDotClick={setActiveBanner}
      />

      {/* Stats strip */}
      <div className="deals-stats-strip">
        <div className="deals-stat">
          <span className="deals-stat-num">{results.length}</span>
          <span className="deals-stat-label">ofertas activas</span>
        </div>

        <div className="deals-stat-divider" />

        <div className="deals-stat">
          <span className="deals-stat-num">−{avgDiscount}%</span>
          <span className="deals-stat-label">descuento promedio</span>
        </div>

        <div className="deals-stat-divider" />

        <div className="deals-stat">
          <span className="deals-stat-num">−{maxDiscount}%</span>
          <span className="deals-stat-label">mejor descuento</span>
        </div>

        <div className="deals-stat-divider" />

        <div className="deals-stat">
          <span className="deals-stat-num">
            ⚡ {FEATURED_BANNERS.length}
          </span>
          <span className="deals-stat-label">ofertas flash</span>
        </div>
      </div>

      <div className="deals-layout">

        {/* Sidebar */}
        <aside className="deals-sidebar">

          <div className="sidebar-section">
            <p className="sidebar-title">Categorías</p>
            <ul className="cat-list">
              {DEAL_CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <button
                    className={`cat-item${
                      filters.category === cat.id ? " cat-item--active" : ""
                    }`}
                    onClick={() => updateFilter("category", cat.id)}
                  >
                    <span>
                      {cat.emoji} {cat.label}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="sidebar-section">
            <p className="sidebar-title">Descuento mínimo</p>
            <ul className="price-list">
              {DISCOUNT_FILTERS.map((f) => (
                <li key={f.value}>
                  <label className="price-item">
                    <input
                      type="radio"
                      name="discount"
                      checked={filters.minDiscount === f.value}
                      onChange={() =>
                        updateFilter("minDiscount", f.value)
                      }
                    />
                    {f.label}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div className="sidebar-section">
            <p className="sidebar-title">Tipo de oferta</p>
            <ul className="price-list">
              {TAG_FILTERS.map((f) => (
                <li key={f.value}>
                  <label className="price-item">
                    <input
                      type="radio"
                      name="tag"
                      checked={filters.tag === f.value}
                      onChange={() =>
                        updateFilter("tag", f.value as any)
                      }
                    />
                    {f.label}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {hasFilters && (
            <div className="sidebar-section">
              <button
                className="sidebar-clear"
                onClick={resetFilters}
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </aside>

        {/* Main */}
        <main className="deals-main">

          <div className="deals-results-header">
            <div>
              <h2 className="deals-results-title">
                {filters.category === "all" && filters.tag === "all"
                  ? "Todas las ofertas"
                  : "Resultados filtrados"}
              </h2>
              <p className="deals-results-count">
                {results.length} ofertas encontradas
              </p>
            </div>
          </div>

          {results.length === 0 ? (
            <div className="deals-empty">
              <div className="deals-empty-icon">🏷️</div>
              <p className="deals-empty-title">
                Sin ofertas con esos filtros
              </p>
              <p className="deals-empty-sub">
                Prueba cambiando la categoría o el descuento mínimo
              </p>
              <button
                className="deals-empty-btn"
                onClick={resetFilters}
              >
                Ver todas las ofertas
              </button>
            </div>
          ) : (
            <div className="deals-grid">
              {results.map((deal) => (
                <DealCard
                  key={deal.id}
                  deal={deal}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          )}

        </main>
      </div>
    </div>
  );
}