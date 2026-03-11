// ─────────────────────────────────────────────────────────────────────────────
// 📦 Dashboard Feature — Barrel Export
// Importa siempre desde "@/features/dashboard", nunca desde rutas internas.
// Ejemplo: import { DashboardPage } from "@/features/dashboard"
// ─────────────────────────────────────────────────────────────────────────────

// ── Página principal ──────────────────────────────────────────────────────────
export { default as DashboardPage } from "./page/DashboardPage";

// ── Tipos públicos ────────────────────────────────────────────────────────────
export type {
  Product,
  StatCard,
  StockStatus,
  InvoiceStatus,
  NavItem,
  DashboardTheme,
} from "./types/dashboard.types";

// ── Theme (por si otra feature necesita la paleta) ────────────────────────────
export { dashboardTheme } from "./theme/dashboard.theme";

// ── Hook (por si se usa en un layout superior) ────────────────────────────────
export { useDashboard } from "./hooks/useDashboard";