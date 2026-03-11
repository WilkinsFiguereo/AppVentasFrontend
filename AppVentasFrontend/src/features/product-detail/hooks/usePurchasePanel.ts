// app/src/features/product-detail/hooks/usePurchasePanel.ts
"use client";

import { useMemo, useState } from "react";
import type { ProductDetail } from "../types/product-detail.types";

export function usePurchasePanel(product: ProductDetail) {
  const [plan, setPlan] = useState<"monthly" | "annual">("monthly");
  const [qty, setQty] = useState(1);
  const [saved, setSaved] = useState(false);
  const [inCart, setInCart] = useState(false);

  const price = useMemo(() => (plan === "annual" ? product.annualPrice : product.price), [plan, product]);
  const annualDiscount = useMemo(
    () => Math.round((1 - product.annualPrice / product.price) * 100),
    [product]
  );

  const incQty = () => setQty((q) => q + 1);
  const decQty = () => setQty((q) => Math.max(1, q - 1));

  return {
    plan, setPlan,
    qty, incQty, decQty,
    saved, setSaved,
    inCart, setInCart,
    price,
    annualDiscount,
  };
}
