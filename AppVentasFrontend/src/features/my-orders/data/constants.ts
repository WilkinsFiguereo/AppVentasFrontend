// src/features/my-orders/data/constants.ts

import type { OrderStatus, OrderFilter, CustomerOrder } from "../types/my-orders.types";

export const ODOO_URL = process.env.NEXT_PUBLIC_ODOO_URL ?? "http://localhost:8009";

// ─── Status display config ────────────────────────────────────────────────────
export const STATUS_CFG: Record<
  OrderStatus,
  { label: string; icon: string; color: string; bg: string; border: string }
> = {
  pending:   { label: "Pendiente",      icon: "⏳", color: "#d97706", bg: "#fffbeb", border: "#fde68a" },
  confirmed: { label: "En preparación", icon: "📦", color: "#3B82F6", bg: "#eff6ff", border: "#bfdbfe" },
  shipped:   { label: "En camino",      icon: "🚚", color: "#1E3A8A", bg: "#eff6ff", border: "#bfdbfe" },
  delivered: { label: "Entregado",      icon: "✅", color: "#10B981", bg: "#f0fdf4", border: "#bbf7d0" },
  cancelled: { label: "Cancelado",      icon: "✕",  color: "#EF4444", bg: "#fef2f2", border: "#fecaca" },
  refunded:  { label: "Reembolsado",    icon: "↩",  color: "#7c3aed", bg: "#f5f3ff", border: "#ddd6fe" },
};

// ─── Filter tabs ──────────────────────────────────────────────────────────────
export const FILTER_TABS: { id: OrderFilter; label: string }[] = [
  { id: "all",       label: "Todos"          },
  { id: "pending",   label: "Pendientes"     },
  { id: "confirmed", label: "En preparación" },
  { id: "shipped",   label: "En camino"      },
  { id: "delivered", label: "Entregados"     },
  { id: "cancelled", label: "Cancelados"     },
];

// ─── Mock data (used until Odoo API is ready) ─────────────────────────────────
export const MOCK_ORDERS: CustomerOrder[] = [
  {
    id: 1,
    name: "POS/00041",
    date: "2025-03-10T14:32:00",
    status: "pending",
    amount_total: 1_878.00,
    payment_method: "Visa •••• 4242",
    shipping_address: "Av. Winston Churchill 1099, Piso 8, Santo Domingo",
    lines: [
      { product_id: 1, name: "Laptop ThinkPad X1 Carbon", emoji: "💻", qty: 1, price_unit: 1_649.00, subtotal: 1_649.00 },
      { product_id: 3, name: "Teclado Keychron Q1 Pro",   emoji: "⌨️", qty: 1, price_unit:   199.00, subtotal:   199.00 },
    ],
    tracking: [
      { label: "Pedido recibido",   date: "10 mar, 14:32", done: true,  active: false },
      { label: "Confirmando pago",  date: null,            done: false, active: true  },
      { label: "En preparación",    date: null,            done: false, active: false },
      { label: "En camino",         date: null,            done: false, active: false },
      { label: "Entregado",         date: null,            done: false, active: false },
    ],
  },
  {
    id: 2,
    name: "POS/00038",
    date: "2025-03-05T09:15:00",
    status: "shipped",
    amount_total: 849.00,
    payment_method: "Mastercard •••• 8810",
    shipping_address: "Av. Winston Churchill 1099, Piso 8, Santo Domingo",
    lines: [
      { product_id: 2, name: 'Monitor UltraWide 34" 4K', emoji: "🖥️", qty: 1, price_unit: 849.00, subtotal: 849.00 },
    ],
    tracking: [
      { label: "Pedido recibido",  date: "05 mar, 09:15", done: true,  active: false },
      { label: "Pago confirmado",  date: "05 mar, 09:18", done: true,  active: false },
      { label: "En preparación",   date: "06 mar, 08:00", done: true,  active: false },
      { label: "En camino",        date: "07 mar, 14:00", done: true,  active: true  },
      { label: "Entregado",        date: null,            done: false, active: false },
    ],
  },
  {
    id: 3,
    name: "POS/00031",
    date: "2025-02-20T11:00:00",
    status: "delivered",
    amount_total: 299.00,
    payment_method: "Visa •••• 4242",
    shipping_address: "Av. Winston Churchill 1099, Piso 8, Santo Domingo",
    lines: [
      { product_id: 6, name: "Soporte IT Premium 24/7", emoji: "🛠️", qty: 1, price_unit: 299.00, subtotal: 299.00 },
    ],
    tracking: [
      { label: "Pedido recibido", date: "20 feb, 11:00", done: true, active: false },
      { label: "Pago confirmado", date: "20 feb, 11:02", done: true, active: false },
      { label: "En preparación",  date: "20 feb, 13:00", done: true, active: false },
      { label: "En camino",       date: "21 feb, 09:00", done: true, active: false },
      { label: "Entregado",       date: "22 feb, 15:30", done: true, active: false },
    ],
  },
  {
    id: 4,
    name: "POS/00019",
    date: "2025-01-14T16:40:00",
    status: "cancelled",
    amount_total: 589.00,
    payment_method: "Mastercard •••• 8810",
    shipping_address: "Calle El Conde 55, Santo Domingo",
    lines: [
      { product_id: 9, name: "Switch Cisco SG350 24P", emoji: "🖧", qty: 1, price_unit: 589.00, subtotal: 589.00 },
    ],
    tracking: [
      { label: "Pedido recibido", date: "14 ene, 16:40", done: true,  active: false },
      { label: "Cancelado",       date: "15 ene, 10:00", done: true,  active: true  },
    ],
  },
];