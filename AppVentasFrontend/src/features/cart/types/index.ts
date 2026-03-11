/* ═══════════════════════════════════════════════════════
   TYPES
   Location: src/features/cart/types/index.ts
═══════════════════════════════════════════════════════ */

export interface CartItem {
  id: number;
  name: string;
  category: string;
  img: string;
  price: number;
  quantity: number;
  billingCycle: "monthly" | "annual";
  users: number;
}

export interface PromoCode {
  discount: number;
  description: string;
}

export interface PromoCodes {
  [code: string]: PromoCode;
}

export interface OrderSummary {
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
}