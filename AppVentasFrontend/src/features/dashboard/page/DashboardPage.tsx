"use client";

import React from "react";

// ── Feature imports ──────────────────────────────────────────────────
import { useDashboard }        from "../hooks/useDashboard";
import { dashboardTheme as t, globalStyles } from "../theme/dashboard.theme";
import { NAV_ITEMS }           from "../data/chart.data";
import { PRODUCTS_DATA }       from "../data/dashboard.data";

// ── UI primitives ────────────────────────────────────────────────────
// dashboards.tsx está en la raíz de dashboard/, por eso es ../dashboards
import { Sidebar, Toast }      from "../dashboards";

// ── Sections ─────────────────────────────────────────────────────────
import { SalesChartSection }   from "../sections/SalesChartSection";
import { StatsSection }        from "../sections/StatsSection";
import { UsersTableSection }   from "../sections/UsersTableSection";

export default function DashboardPage() {
  const {
    search,
    toastVisible,
    toastMsg,
    filteredProducts,
    setSearch,
    showToast,
  } = useDashboard();

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        background: t.bgMain,
        color: t.textPrimary,
      }}
    >
      {/* ── Global Styles ── */}
      <style>{globalStyles(t)}</style>

      {/* ── Sidebar ── */}
      <Sidebar navItems={NAV_ITEMS} />

      {/* ── Main Content ── */}
      <main style={{ flex: 1, overflow: "auto", padding: "32px" }}>

        {/* Section 1: Header + Acciones Rápidas */}
        <SalesChartSection
          onNewInvoice={() => showToast("📄 Factura generada correctamente")}
          onAddProduct={() => showToast("📦 Producto agregado al inventario")}
        />

        {/* Section 2: Stat Cards */}
        <StatsSection />

        {/* Section 3: Tabla de Productos & Facturas */}
        <UsersTableSection
          products={filteredProducts}
          search={search}
          onSearchChange={setSearch}
          onAction={showToast}
          totalCount={PRODUCTS_DATA.length}
        />
      </main>

      {/* ── Toast Global ── */}
      <Toast message={toastMsg} visible={toastVisible} />
    </div>
  );
}