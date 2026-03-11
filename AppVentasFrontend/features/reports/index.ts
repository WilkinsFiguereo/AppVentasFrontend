// ─────────────────────────────────────────────────────────────────────────────
// 📊 Reportes Feature — Barrel Export
// Importa siempre desde "@/features/reportes", nunca desde rutas internas.
// Ejemplo: import { ReportesPage } from "@/features/reportes"
// ─────────────────────────────────────────────────────────────────────────────

export { default as ReportesPage } from "./page/ReportesPage";

export type {
  PeriodoFiltro,
  ReporteStatCard,
  ProductoTop,
  ClienteTop,
} from "./types/reportes.types";