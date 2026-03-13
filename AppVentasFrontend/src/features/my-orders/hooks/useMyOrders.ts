// src/features/my-orders/hooks/useMyOrders.ts
"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import type { CustomerOrder, FetchState, OrderFilter } from "../types/my-orders.types";
import { ODOO_URL, MOCK_ORDERS } from "../data/constants";

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === "true";

export function useMyOrders() {
  const [orders, setOrders] = useState<CustomerOrder[]>([]);
  const [fetchState, setFetchState] = useState<FetchState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [activeFilter, setActiveFilter] = useState<OrderFilter>("all");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  // ── Load orders ─────────────────────────────────
  const loadOrders = useCallback(async () => {
    setFetchState("loading");
    setErrorMsg("");

    if (USE_MOCK) {
      await new Promise((r) => setTimeout(r, 600));

      setOrders(MOCK_ORDERS);
      setFetchState("success");

      const first = MOCK_ORDERS.find(
        (o) => o.status === "pending" || o.status === "shipped"
      );

      if (first) setExpandedId(first.id);
      return;
    }

    try {
      const res = await fetch(`${ODOO_URL}/api/pos/my-orders`, {
        method: "GET",
        credentials: "include", // 👈 necesario para sesión Odoo
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const json = await res.json();

      if (json.success && Array.isArray(json.data)) {
        setOrders(json.data);
        setFetchState("success");

        const first = json.data.find(
          (o: CustomerOrder) =>
            o.status === "pending" || o.status === "shipped"
        );

        if (first) setExpandedId(first.id);
      } else {
        throw new Error(json.message ?? "Error al cargar pedidos");
      }

    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Error desconocido";
      setErrorMsg(msg);
      setFetchState("error");
    }
  }, []);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  // ── Filtered orders ─────────────────────────────
  const filteredOrders = useMemo(
    () =>
      activeFilter === "all"
        ? orders
        : orders.filter((o) => o.status === activeFilter),
    [orders, activeFilter]
  );

  // ── Filter counts ───────────────────────────────
  const counts = useMemo(() => {
    const c: Record<string, number> = { all: orders.length };

    orders.forEach((o) => {
      c[o.status] = (c[o.status] ?? 0) + 1;
    });

    return c;
  }, [orders]);

  // ── Stats ───────────────────────────────────────
  const stats = useMemo(
    () => ({
      total: orders.length,
      pending: orders.filter(
        (o) => o.status === "pending" || o.status === "confirmed"
      ).length,
      inTransit: orders.filter((o) => o.status === "shipped").length,
      delivered: orders.filter((o) => o.status === "delivered").length,
      spent: orders
        .filter((o) => o.status !== "cancelled" && o.status !== "refunded")
        .reduce((acc, o) => acc + o.amount_total, 0),
    }),
    [orders]
  );

  // ── Expand order ────────────────────────────────
  const toggleExpand = useCallback((id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  }, []);

  return {
    orders: filteredOrders,
    allOrders: orders,
    fetchState,
    errorMsg,
    activeFilter,
    setActiveFilter,
    expandedId,
    toggleExpand,
    counts,
    stats,
    reload: loadOrders,
  };
}