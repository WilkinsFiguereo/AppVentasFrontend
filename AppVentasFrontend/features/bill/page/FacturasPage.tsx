"use client";

import React from "react";
import { useFacturas }                       from "../hooks/useFacturas";
import { facturasTheme as t, globalStyles }  from "../theme/facturas.theme";
import { FACTURAS_DATA }                     from "../data/facturas.data";
import { Toast }                             from "../ui/FacturaUI";
import { FacturasHeaderSection }             from "../sections/FacturasHeaderSection";
import { FacturasStatsSection }              from "../sections/FacturasStatsSection";
import { FacturasTableSection }              from "../sections/FacturasTableSection";
import { Sidebar }                           from "../../dashboard/dashboards";
import { NAV_ITEMS }                         from "../../dashboard/data/chart.data";

export default function FacturasPage() {
  const {
    search, filtroActivo, vistaMode,
    ordenCampo, ordenDir, toastVisible, toastMsg,
    facturasFiltradas,
    setSearch, setFiltroActivo, setVistaMode,
    toggleOrden, showToast,
  } = useFacturas();

  return (
    <div style={{
      display: "flex", minHeight: "100vh",
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      background: t.bgMain, color: t.textPrimary,
    }}>
      <style>{globalStyles(t)}</style>

      <Sidebar navItems={NAV_ITEMS} />

      <main style={{ flex: 1, overflow: "auto", padding: "32px" }}>
        <FacturasHeaderSection
          total={facturasFiltradas.length}
          onNuevaFactura={() => showToast("Nueva factura creada")}
          onExportar={() => showToast("Exportando facturas...")}
        />
        <FacturasStatsSection />
        <FacturasTableSection
          facturas={facturasFiltradas}
          search={search}
          filtroActivo={filtroActivo}
          vistaMode={vistaMode}
          ordenCampo={ordenCampo}
          ordenDir={ordenDir}
          totalCount={FACTURAS_DATA.length}
          onSearchChange={setSearch}
          onFiltroChange={setFiltroActivo}
          onVistaModeChange={setVistaMode}
          onToggleOrden={toggleOrden}
          onAction={showToast}
        />
      </main>

      <Toast message={toastMsg} visible={toastVisible} />
    </div>
  );
}