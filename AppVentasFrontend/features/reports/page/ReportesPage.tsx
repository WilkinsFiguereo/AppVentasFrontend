"use client";

import React from "react";
import { useReportes }                        from "../hooks/useReportes";
import { reportesTheme as t, globalStyles }   from "../theme/reportes.theme";
import { Toast }                              from "../ui/ReporteUI";
import { ReportesHeaderSection }              from "../sections/ReportesHeaderSection";
import { ReportesStatsSection }               from "../sections/ReportesStatsSection";
import { ReportesGraficaSection }             from "../sections/ReportesGraficaSection";
import { ReportesTablesSection }              from "../sections/ReportesTablesSection";
import { Sidebar }                            from "../../dashboard/dashboards";
import { NAV_ITEMS }                          from "../../dashboard/data/chart.data";

export default function ReportesPage() {
  const {
    periodo, toastVisible, toastMsg,
    datosGrafica, setPeriodo, showToast,
  } = useReportes();

  return (
    <div style={{
      display: "flex", minHeight: "100vh",
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      background: t.bgMain, color: t.textPrimary,
    }}>
      <style>{globalStyles(t)}</style>

      <Sidebar navItems={NAV_ITEMS} />

      <main style={{ flex: 1, overflow: "auto", padding: "32px" }}>
        <ReportesHeaderSection
          periodo={periodo}
          onPeriodoChange={setPeriodo}
          onExportar={() => showToast("Reporte exportado correctamente")}
        />
        <ReportesStatsSection />
        <ReportesGraficaSection datos={datosGrafica} />
        <ReportesTablesSection />
      </main>

      <Toast message={toastMsg} visible={toastVisible} />
    </div>
  );
}