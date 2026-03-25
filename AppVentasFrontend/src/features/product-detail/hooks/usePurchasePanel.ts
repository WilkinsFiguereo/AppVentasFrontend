// app/src/features/product-detail/hooks/usePurchasePanel.ts
"use client";

import { useState } from "react";
import type { ProductDetail } from "../types/product-detail.types";

export function usePurchasePanel(product: ProductDetail) {
  const [qty, setQty] = useState(1);
  const [inCart, setInCart] = useState(false);

  const price = product.price;

  const incQty = () => setQty((q) => q + 1);
  const decQty = () => setQty((q) => Math.max(1, q - 1));

  return {
    qty,
    incQty,
    decQty,
    inCart,
    setInCart,
    price,
  };
}
