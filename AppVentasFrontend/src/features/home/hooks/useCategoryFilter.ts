// app/src/features/home/hooks/useCategoryFilter.ts
"use client";

import { useMemo, useState } from "react";
import type { Product } from "../types/home.types";

export function useCategoryFilter(products: Product[]) {
  const [cat, setCat] = useState<string>("Todo");

  const visible = useMemo(() => {
    if (cat === "Todo") return products;
    return products.filter((p) => p.cat === cat);
  }, [cat, products]);

  return { cat, setCat, visible };
}
