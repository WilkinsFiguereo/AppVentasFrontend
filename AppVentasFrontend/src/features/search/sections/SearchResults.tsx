"use client";

import { useState } from "react";

import Navbar from "../../home/sections/Navbar/Navbar";
import { SORT_OPTIONS, useSearch } from "../hooks/useSearch";
import type { Product, SortOption } from "../types/search.types";
import { ProductCard } from "../ui/ProductCard";
import { SearchSidebar } from "../ui/SearchSidebar";

const RESULTS_PER_PAGE = 8;

type SearchResultsProps = {
  initialQuery?: string;
};

export function SearchResults({ initialQuery = "" }: SearchResultsProps) {
  const { filters, results, categories, priceRanges, loading, error, updateFilter, resetFilters } = useSearch(initialQuery);
  const [page, setPage] = useState(1);

  const activePills: Array<{ label: string; clear: () => void }> = [];

  if (filters.category !== "all") {
    const category = categories.find((item) => item.id === filters.category);
    activePills.push({
      label: category?.label ?? filters.category,
      clear: () => updateFilter("category", "all"),
    });
  }

  if (filters.minPrice !== null || filters.maxPrice !== null) {
    const label = filters.maxPrice === null ? `+$${filters.minPrice}` : `$${filters.minPrice}-$${filters.maxPrice}`;

    activePills.push({
      label,
      clear: () => {
        updateFilter("minPrice", null);
        updateFilter("maxPrice", null);
      },
    });
  }

  if (filters.minRating !== null) {
    activePills.push({
      label: `${filters.minRating}+ estrellas`,
      clear: () => updateFilter("minRating", null),
    });
  }

  if (filters.inStockOnly) {
    activePills.push({
      label: "En stock",
      clear: () => updateFilter("inStockOnly", false),
    });
  }

  const totalPages = Math.max(1, Math.ceil(results.length / RESULTS_PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const paginated = results.slice((safePage - 1) * RESULTS_PER_PAGE, safePage * RESULTS_PER_PAGE);

  function handlePageChange(nextPage: number) {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleAddToCart(product: Product) {
    console.log("Added to cart:", product.id);
  }

  return (
    <>
      <Navbar cart={0} />

      <div className="search-page">
        <SearchSidebar
          filters={filters}
          categories={categories}
          priceRanges={priceRanges}
          onFilterChange={(key, value) => {
            updateFilter(key, value);
            setPage(1);
          }}
          onReset={() => {
            resetFilters();
            setPage(1);
          }}
        />

        <main className="search-main">
          <div className="results-header">
            <div className="results-meta">
              <h1 className="results-query">
                {filters.query ? (
                  <>
                    Resultados para <span>&quot;{filters.query}&quot;</span>
                  </>
                ) : (
                  "Todos los productos"
                )}
              </h1>
              <p className="results-count">{results.length} productos encontrados</p>
            </div>

            <div className="sort-wrap">
              <span className="sort-label">Ordenar por</span>
              <select
                className="sort-select"
                value={filters.sortBy}
                onChange={(event) => updateFilter("sortBy", event.target.value as SortOption)}
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {activePills.length > 0 && (
            <div className="filter-pills">
              {activePills.map((pill, index) => (
                <span key={`${pill.label}-${index}`} className="pill">
                  {pill.label}
                  <button className="pill-x" onClick={pill.clear} aria-label={`Quitar ${pill.label}`}>
                    x
                  </button>
                </span>
              ))}
            </div>
          )}

          {loading ? (
            <div className="empty-state">
              <p className="empty-title">Cargando productos...</p>
            </div>
          ) : error ? (
            <div className="empty-state">
              <p className="empty-title">No se pudieron cargar los productos</p>
              <p className="empty-sub">{error}</p>
            </div>
          ) : paginated.length === 0 ? (
            <div className="empty-state">
              <p className="empty-title">Sin resultados</p>
              <p className="empty-sub">Intenta con otros terminos o ajusta los filtros</p>
            </div>
          ) : (
            <>
              <div className="product-list">
                {paginated.map((product) => (
                  <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
                ))}
              </div>

              {totalPages > 1 && (
                <nav className="pagination" aria-label="Paginas">
                  <button
                    className="page-btn page-btn--nav"
                    onClick={() => handlePageChange(safePage - 1)}
                    disabled={safePage === 1}
                  >
                    {"<"}
                  </button>

                  {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => (
                    <button
                      key={number}
                      className={`page-btn${number === safePage ? " page-btn--active" : ""}`}
                      onClick={() => handlePageChange(number)}
                      aria-current={number === safePage ? "page" : undefined}
                    >
                      {number}
                    </button>
                  ))}

                  <button
                    className="page-btn page-btn--nav"
                    onClick={() => handlePageChange(safePage + 1)}
                    disabled={safePage === totalPages}
                  >
                    {">"}
                  </button>
                </nav>
              )}
            </>
          )}
        </main>
      </div>
    </>
  );
}
