// app/src/features/product-detail/hooks/useReviews.ts
"use client";

import { useMemo, useState } from "react";
import type { Review } from "../types/product-detail.types";

export function useReviews(all: Review[]) {
  const [showAll, setShowAll] = useState(false);

  const visibleReviews = useMemo(() => {
    return showAll ? all : all.slice(0, 2);
  }, [all, showAll]);

  return { showAll, setShowAll, visibleReviews };
}
