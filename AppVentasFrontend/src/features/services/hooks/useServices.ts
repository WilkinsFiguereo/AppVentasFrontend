// src/features/services/hooks/useServices.ts
"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import type { Service, FetchState, SortOption, ViewMode } from "../types/services.types";

const ODOO_URL = process.env.NEXT_PUBLIC_ODOO_URL ?? "http://localhost:8009";

// ─── Map raw Odoo response → Service ─────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapService(p: any): Service {
  return {
    id:           p.id,
    name:         p.name         ?? "",
    default_code: p.default_code ?? "",
    description:  p.description  ?? "",
    list_price:   p.list_price   ?? 0,
    cost_price:   p.cost_price   ?? 0,
    // category comes as { id, name } from _app_serialize_service()
    category:     p.category?.name ?? "General",
    billing:      p.billing       ?? "monthly",
  };
}

export function useServices() {
  // ── Server data ──────────────────────────────────────────────────────────
  const [services,    setServices]    = useState<Service[]>([]);
  const [fetchState,  setFetchState]  = useState<FetchState>("idle");
  const [errorMsg,    setErrorMsg]    = useState("");

  // ── UI filters ───────────────────────────────────────────────────────────
  const [search,      setSearch]      = useState("");
  const [category,    setCategory]    = useState("Todos");
  const [sort,        setSort]        = useState<SortOption>("name_asc");
  const [viewMode,    setViewMode]    = useState<ViewMode>("grid");
  const [selectedId,  setSelectedId]  = useState<number | null>(null);

  // ── Fetch from Odoo ───────────────────────────────────────────────────────
  const load = useCallback(async () => {
    setFetchState("loading");
    setErrorMsg("");

    try {
      const res = await fetch(`${ODOO_URL}/api/service/list?limit=200`, {
        
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const json = await res.json();

      if (!json.success) throw new Error(json.message ?? "Error desconocido");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setServices((json.data?.items ?? []).map((p: any) => mapService(p)));
      setFetchState("success");
    } catch (e: unknown) {
      setErrorMsg(e instanceof Error ? e.message : "Error al cargar servicios");
      setFetchState("error");
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  // ── Derive categories dynamically from what Odoo returns ─────────────────
  const categories = useMemo(() => {
    const cats = Array.from(new Set(services.map((s) => s.category))).sort();
    return ["Todos", ...cats];
  }, [services]);

  // ── Category counts ───────────────────────────────────────────────────────
  const categoryCounts = useMemo(() => {
    const c: Record<string, number> = { Todos: services.length };
    services.forEach((s) => { c[s.category] = (c[s.category] ?? 0) + 1; });
    return c;
  }, [services]);

  // ── Filtered + sorted ────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    let list = [...services];

    if (category !== "Todos") {
      list = list.filter((s) => s.category === category);
    }

    const q = search.toLowerCase().trim();
    if (q) {
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q) ||
          s.default_code.toLowerCase().includes(q),
      );
    }

    switch (sort) {
      case "name_asc":   list.sort((a, b) => a.name.localeCompare(b.name));  break;
      case "price_asc":  list.sort((a, b) => a.list_price - b.list_price);   break;
      case "price_desc": list.sort((a, b) => b.list_price - a.list_price);   break;
    }

    return list;
  }, [services, category, search, sort]);

  // ── Detail ────────────────────────────────────────────────────────────────
  const selectedService = useMemo(
    () => services.find((s) => s.id === selectedId) ?? null,
    [services, selectedId],
  );

  const openDetail  = useCallback((id: number) => setSelectedId(id),   []);
  const closeDetail = useCallback(()            => setSelectedId(null), []);

  return {
    services:  filtered,
    allCount:  services.length,
    fetchState, errorMsg, load,
    search, setSearch,
    category, setCategory,
    categories,
    categoryCounts,
    sort, setSort,
    viewMode, setViewMode,
    selectedService, openDetail, closeDetail,
    showing: filtered.length,
  };
}