import { type LucideIcon } from "lucide-react";

export type StockStatus = "ok" | "bajo" | "agotado";
export type ProductCategory =
  | "Electrónica"
  | "Periféricos"
  | "Audio"
  | "Mobiliario"
  | "Accesorios";

export interface Producto {
  id: string;
  nombre: string;
  sku: string;
  categoria: ProductCategory;
  stock: number;
  stockStatus: StockStatus;
  precio: number;
  costo: number;
  proveedor: string;
  ultimaActualizacion: string;
}

export interface ProductoStatCard {
  label: string;
  value: string;
  Icon: LucideIcon;
  delta: string;
  color: string;
  bg: string;
}

export type VistaMode = "tabla" | "grilla";

export type OrdenCampo = "nombre" | "stock" | "precio" | "categoria";
export type OrdenDir = "asc" | "desc";