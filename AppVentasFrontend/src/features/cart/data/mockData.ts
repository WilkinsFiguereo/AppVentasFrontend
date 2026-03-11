/* ═══════════════════════════════════════════════════════
   MOCK DATA
   Location: src/features/cart/data/mockData.ts
   
   En producción, esto vendría de:
   - Estado global (Redux, Zustand, Context)
   - localStorage para persistencia
   - API para sincronización con el backend
═══════════════════════════════════════════════════════ */

import type { CartItem, PromoCodes } from "../types";

export const CART_ITEMS: CartItem[] = [
  {
    id: 1,
    name: "CRM Profesional",
    category: "Software",
    img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=300&q=80&fit=crop",
    price: 89,
    quantity: 2,
    billingCycle: "monthly",
    users: 5,
  },
  {
    id: 2,
    name: "BI Dashboard Pro",
    category: "Analytics",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&q=80&fit=crop",
    price: 59,
    quantity: 1,
    billingCycle: "annual",
    users: 10,
  },
  {
    id: 5,
    name: "Office Suite Enterprise",
    category: "Licencias",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&q=80&fit=crop",
    price: 129,
    quantity: 1,
    billingCycle: "monthly",
    users: 25,
  },
];

export const PROMO_CODES: PromoCodes = {
  "SCAN25": {
    discount: 0.15,
    description: "15% de descuento por QR scan",
  },
  "FIRST20": {
    discount: 0.20,
    description: "20% de descuento primera compra",
  },
  "ANNUAL30": {
    discount: 0.30,
    description: "30% de descuento en planes anuales",
  },
};