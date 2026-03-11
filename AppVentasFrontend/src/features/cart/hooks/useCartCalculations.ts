/* ═══════════════════════════════════════════════════════
   HOOK: useCartCalculations
   Location: src/features/cart/hooks/useCartCalculations.ts
   
   Calcula subtotal, descuentos, impuestos y total del carrito
═══════════════════════════════════════════════════════ */

import { useMemo } from "react";
import type { CartItem, PromoCode, OrderSummary } from "../types";

const TAX_RATE = 0.18; // 18% IVA

export function useCartCalculations(
  items: CartItem[],
  promoDiscount: PromoCode | null
): OrderSummary {
  return useMemo(() => {
    // Calcular subtotal
    const subtotal = items.reduce((acc, item) => {
      const itemTotal =
        item.price *
        item.quantity *
        item.users *
        (item.billingCycle === "annual" ? 12 : 1);
      return acc + itemTotal;
    }, 0);

    // Calcular descuento
    const discount = promoDiscount ? subtotal * promoDiscount.discount : 0;

    // Calcular impuestos sobre el subtotal menos descuento
    const tax = (subtotal - discount) * TAX_RATE;

    // Calcular total
    const total = subtotal - discount + tax;

    return {
      subtotal,
      discount,
      tax,
      total,
    };
  }, [items, promoDiscount]);
}