"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { DealsFilters, DealTag, DealCategory } from "../types/deals.types";
import { MOCK_DEALS } from "../data/mockDeals";

const DEFAULT_FILTERS: DealsFilters = {
  category: "all",
  minDiscount: 0,
  tag: "all",
};

function calcDiscount(price: number, original: number) {
  return Math.round((1 - price / original) * 100);
}

export function useDeals() {
  const [filters, setFilters] = useState<DealsFilters>(DEFAULT_FILTERS);
  const [activeBanner, setActiveBanner] = useState(0);

  // Auto-rotate banner every 5s
  useEffect(() => {
    const t = setInterval(() => setActiveBanner((p) => (p + 1) % 3), 5_000);
    return () => clearInterval(t);
  }, []);

  const updateFilter = useCallback(
    <K extends keyof DealsFilters>(key: K, value: DealsFilters[K]) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const resetFilters = useCallback(() => setFilters(DEFAULT_FILTERS), []);

  const results = useMemo(() => {
    return MOCK_DEALS.filter((deal) => {
      if (filters.category !== "all" && deal.category !== filters.category) return false;
      if (filters.minDiscount > 0 && calcDiscount(deal.price, deal.originalPrice) < filters.minDiscount) return false;
      if (filters.tag !== "all" && deal.tag !== filters.tag) return false;
      return true;
    });
  }, [filters]);

  // Flash deals (tag === "flash" and has expiry)
  const flashDeals = useMemo(
    () => MOCK_DEALS.filter((d) => d.tag === "flash" && d.expiresAt),
    []
  );

  return { filters, results, flashDeals, activeBanner, setActiveBanner, updateFilter, resetFilters };
}

// Countdown hook
export function useCountdown(isoTarget?: string) {
  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0, expired: false });

  useEffect(() => {
    if (!isoTarget) return;
    function tick() {
      const diff = new Date(isoTarget!).getTime() - Date.now();
      if (diff <= 0) { setTimeLeft({ h: 0, m: 0, s: 0, expired: true }); return; }
      const h = Math.floor(diff / 3_600_000);
      const m = Math.floor((diff % 3_600_000) / 60_000);
      const s = Math.floor((diff % 60_000) / 1_000);
      setTimeLeft({ h, m, s, expired: false });
    }
    tick();
    const t = setInterval(tick, 1_000);
    return () => clearInterval(t);
  }, [isoTarget]);

  return timeLeft;
}