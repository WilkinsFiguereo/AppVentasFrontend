// app/src/features/product-detail/hooks/useToast.ts
"use client";

import { useCallback, useRef, useState } from "react";
import type { ToastState } from "../types/product-detail.types";

export function useToast(timeoutMs = 2800) {
  const [toast, setToast] = useState<ToastState>(null);
  const tRef = useRef<number | null>(null);

  const showToast = useCallback((msg: string, type: "success" | "info" = "success") => {
    setToast({ msg, type });
    if (tRef.current) window.clearTimeout(tRef.current);
    tRef.current = window.setTimeout(() => setToast(null), timeoutMs);
  }, [timeoutMs]);

  return { toast, showToast, clear: () => setToast(null) };
}
