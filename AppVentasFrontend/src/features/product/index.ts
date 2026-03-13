// ─────────────────────────────────────────────────────────────────────────────
// 📦 Productos Feature — Barrel Export
// Importa siempre desde "@/features/productos", nunca desde rutas internas.
// Ejemplo: import { ProductosPage } from "@/features/productos"
// ─────────────────────────────────────────────────────────────────────────────

export { default as ProductosPage } from "./page/ProductosPage";

export type {
  Producto,
  StockStatus,
  ProductCategory,
  VistaMode,
} from "./types/productos.types";