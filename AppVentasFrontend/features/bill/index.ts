// ─────────────────────────────────────────────────────────────────────────────
// 🧾 Facturas Feature — Barrel Export
// Importa siempre desde "@/features/facturas", nunca desde rutas internas.
// Ejemplo: import { FacturasPage } from "@/features/facturas"
// ─────────────────────────────────────────────────────────────────────────────

export { default as FacturasPage } from "./page/FacturasPage";

export type {
  Factura,
  FacturaStatus,
  VistaMode,
} from "./types/facturas.types";