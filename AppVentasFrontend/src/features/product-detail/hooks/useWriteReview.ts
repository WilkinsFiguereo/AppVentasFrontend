// app/src/features/product-detail/hooks/useWriteReview.ts
"use client";

import { useState } from "react";

export function useWriteReview() {
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const canSubmit = !!rating && !!title && !!body;

  const submit = (onSubmit?: (data: { rating: number; title: string; body: string }) => void) => {
    if (!canSubmit) return;
    setSubmitted(true);
    onSubmit?.({ rating, title, body });
  };

  return {
    rating, setRating,
    title, setTitle,
    body, setBody,
    submitted,
    canSubmit,
    submit,
  };
}
