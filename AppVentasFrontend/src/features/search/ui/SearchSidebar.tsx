"use client";

import type { PriceRange, SearchCategory } from "../hooks/useSearch";
import type { SearchFilters } from "../types/search.types";

type SearchSidebarProps = {
  filters: SearchFilters;
  categories: SearchCategory[];
  priceRanges: PriceRange[];
  onFilterChange: <K extends keyof SearchFilters>(key: K, value: SearchFilters[K]) => void;
  onReset: () => void;
};

const RATING_OPTIONS: Array<{ value: number | null; label: string }> = [
  { value: null, label: "Cualquiera" },
  { value: 5, label: "5.0" },
  { value: 4, label: "4.0+" },
  { value: 3, label: "3.0+" },
];

function stars(value: number) {
  return "*".repeat(value) + "-".repeat(5 - value);
}

export function SearchSidebar({
  filters,
  categories,
  priceRanges,
  onFilterChange,
  onReset,
}: SearchSidebarProps) {
  const hasActiveFilters =
    filters.category !== "all" ||
    filters.minPrice !== null ||
    filters.maxPrice !== null ||
    filters.minRating !== null ||
    filters.inStockOnly;

  return (
    <aside className="search-sidebar">
      <div className="sidebar-section">
        <p className="sidebar-title">Categorias</p>
        <ul className="cat-list">
          {categories.map((category) => (
            <li key={category.id}>
              <button
                className={`cat-item${filters.category === category.id ? " cat-item--active" : ""}`}
                onClick={() => onFilterChange("category", category.id)}
              >
                {category.label}
                <span className="cat-count">{category.count}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar-section">
        <p className="sidebar-title">Precio</p>
        <ul className="price-list">
          {priceRanges.map((range) => {
            const checked = filters.minPrice === range.min && filters.maxPrice === range.max;

            return (
              <li key={range.label}>
                <label className="price-item">
                  <input
                    type="radio"
                    name="price"
                    checked={checked}
                    onChange={() => {
                      onFilterChange("minPrice", range.min);
                      onFilterChange("maxPrice", range.max);
                    }}
                  />
                  {range.label}
                </label>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="sidebar-section">
        <p className="sidebar-title">Calificacion minima</p>
        <ul className="rating-list">
          {RATING_OPTIONS.map((option) => (
            <li key={String(option.value)}>
              <label className="rating-item">
                <input
                  type="radio"
                  name="rating"
                  checked={filters.minRating === option.value}
                  onChange={() => onFilterChange("minRating", option.value)}
                />
                {option.value === null ? option.label : `${stars(option.value)} ${option.label}`}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar-section">
        <p className="sidebar-title">Disponibilidad</p>
        <div className="toggle-row">
          <span>Solo en stock</span>
          <button
            role="switch"
            aria-checked={filters.inStockOnly}
            className={`toggle${filters.inStockOnly ? " toggle--on" : ""}`}
            onClick={() => onFilterChange("inStockOnly", !filters.inStockOnly)}
          />
        </div>
      </div>

      {hasActiveFilters && (
        <div className="sidebar-section">
          <button className="sidebar-clear" onClick={onReset}>
            Limpiar filtros
          </button>
        </div>
      )}
    </aside>
  );
}
