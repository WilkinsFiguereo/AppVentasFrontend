"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { listOdooProducts, type OdooProductItem } from "../data/odooClient";
import type { Product, SearchFilters } from "../types/search.types";

export type SearchCategory = {
  id: string;
  label: string;
  count: number;
};

export type PriceRange = {
  label: string;
  min: number;
  max: number | null;
};

export const SORT_OPTIONS = [
  { value: "relevance", label: "Mas relevantes" },
  { value: "price_asc", label: "Menor precio" },
  { value: "price_desc", label: "Mayor precio" },
  { value: "rating", label: "Mejor calificados" },
  { value: "newest", label: "Mas nuevos" },
] as const;

const CATEGORY_LABELS: Record<string, string> = {
  all: "Todos",
  services: "Servicios",
  products: "Productos",
  consumables: "Consumibles",
};

const DEFAULT_FILTERS: SearchFilters = {
  query: "",
  category: "all",
  minPrice: null,
  maxPrice: null,
  minRating: null,
  inStockOnly: false,
  sortBy: "relevance",
};

function mapTypeToCategory(type?: string): string {
  const normalized = (type || "").toLowerCase();
  if (normalized === "service") return "services";
  if (normalized === "consu") return "consumables";
  return "products";
}

function mapOdooProduct(item: OdooProductItem, index: number): Product {
  const price = Number(item.list_price ?? 0);
  const old = Number(item.standard_price ?? 0);
  const hasOffer = old > price;

  return {
    id: String(item.id),
    name: item.name || "Producto sin nombre",
    description: item.description_sale || item.description || "Sin descripcion",
    price,
    originalPrice: hasOffer ? old : undefined,
    category: mapTypeToCategory(item.type),
    brand: item.company_name || "General",
    rating: Number((4 + ((index % 9) + 1) / 10).toFixed(1)),
    reviewCount: 30 + index * 11,
    inStock: item.active !== false,
    badge: hasOffer ? "oferta" : index % 3 === 0 ? "popular" : undefined,
  };
}

function buildPriceRanges(items: Product[]): PriceRange[] {
  if (items.length === 0) {
    return [{ label: "Cualquier precio", min: 0, max: null }];
  }

  const maxPrice = Math.max(...items.map((item) => item.price));
  const step = Math.max(1, Math.ceil(maxPrice / 4));

  return [
    { label: "Cualquier precio", min: 0, max: null },
    { label: `Hasta $${step}`, min: 0, max: step },
    { label: `$${step} - $${step * 2}`, min: step, max: step * 2 },
    { label: `$${step * 2} - $${step * 3}`, min: step * 2, max: step * 3 },
    { label: `Mas de $${step * 3}`, min: step * 3, max: null },
  ];
}

export function useSearch(initialQuery = "") {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState<SearchFilters>({
    ...DEFAULT_FILTERS,
    query: initialQuery,
  });

  useEffect(() => {
    setFilters((prev) => ({ ...DEFAULT_FILTERS, sortBy: prev.sortBy, query: initialQuery }));
  }, [initialQuery]);

  useEffect(() => {
    let cancelled = false;

    const loadProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await listOdooProducts(100, 0);
        const mapped = response.map(mapOdooProduct);

        if (!cancelled) {
          setItems(mapped);
        }
      } catch (err) {
        if (!cancelled) {
          setItems([]);
          setError(err instanceof Error ? err.message : "No se pudo cargar catalogo");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      cancelled = true;
    };
  }, []);

  const categories = useMemo<SearchCategory[]>(() => {
    const grouped = items.reduce<Record<string, number>>((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1;
      return acc;
    }, {});

    const dynamic = Object.keys(grouped)
      .sort()
      .map((id) => ({ id, label: CATEGORY_LABELS[id] || id, count: grouped[id] }));

    return [{ id: "all", label: "Todos", count: items.length }, ...dynamic];
  }, [items]);

  const priceRanges = useMemo(() => buildPriceRanges(items), [items]);

  const updateFilter = useCallback(
    <K extends keyof SearchFilters>(key: K, value: SearchFilters[K]) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const resetFilters = useCallback(() => {
    setFilters((prev) => ({ ...DEFAULT_FILTERS, query: prev.query }));
  }, []);

  const results = useMemo<Product[]>(() => {
    let filtered = [...items];

    if (filters.query.trim()) {
      const q = filters.query.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.brand.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q),
      );
    }

    if (filters.category !== "all") {
      filtered = filtered.filter((item) => item.category === filters.category);
    }

    if (filters.minPrice !== null) filtered = filtered.filter((item) => item.price >= filters.minPrice!);
    if (filters.maxPrice !== null) filtered = filtered.filter((item) => item.price <= filters.maxPrice!);

    if (filters.minRating !== null) filtered = filtered.filter((item) => item.rating >= filters.minRating!);

    if (filters.inStockOnly) filtered = filtered.filter((item) => item.inStock);

    switch (filters.sortBy) {
      case "price_asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        filtered.sort((a, b) => Number(b.badge === "nuevo") - Number(a.badge === "nuevo"));
        break;
      default:
        break;
    }

    return filtered;
  }, [filters, items]);

  return {
    filters,
    results,
    categories,
    priceRanges,
    loading,
    error,
    updateFilter,
    resetFilters,
  };
}

