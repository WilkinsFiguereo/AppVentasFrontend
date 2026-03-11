// app/src/features/product-detail/hooks/useGallery.ts
"use client";

import { useState } from "react";

export function useGallery(images: string[]) {
  const [main, setMain] = useState(0);

  const select = (idx: number) => {
    if (idx < 0 || idx >= images.length) return;
    setMain(idx);
  };

  return { main, setMain: select };
}
