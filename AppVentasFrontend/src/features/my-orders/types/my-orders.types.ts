// src/features/my-orders/types/my-orders.types.ts

export type OrderStatus =
  | "pending"    // Pendiente — pago confirmando
  | "confirmed"  // Confirmado — en preparación
  | "shipped"    // En camino
  | "delivered"  // Entregado
  | "cancelled"  // Cancelado
  | "refunded";  // Reembolsado

export type OrderFilter = "all" | OrderStatus;

export interface OrderLine {
  product_id: number;
  name: string;
  emoji: string;
  qty: number;
  price_unit: number;
  subtotal: number;
}

export interface TrackingStep {
  label: string;
  date: string | null;
  done: boolean;
  active: boolean;
}

export interface CustomerOrder {
  id: number;
  name: string;                  // e.g. "POS/00041"
  date: string;                  // ISO string
  status: OrderStatus;
  amount_total: number;
  lines: OrderLine[];
  tracking: TrackingStep[];
  payment_method: string;
  shipping_address: string;
}

export type FetchState = "idle" | "loading" | "success" | "error";