import { type LucideIcon } from "lucide-react";

export type FacturaStatus = "pagada" | "pendiente" | "vencida" | "borrador";

export interface Factura {
  id: string;
  numero: string;
  cliente: string;
  clienteEmail: string;
  fecha: string;
  fechaVencimiento: string;
  status: FacturaStatus;
  subtotal: number;
  impuesto: number;
  total: number;
  items: number;
}

export interface FacturaStatCard {
  label: string;
  value: string;
  Icon: LucideIcon;
  delta: string;
  color: string;
  bg: string;
}

export type OrdenCampo = "numero" | "cliente" | "fecha" | "total" | "status";
export type OrdenDir   = "asc" | "desc";
export type VistaMode  = "tabla" | "kanban";