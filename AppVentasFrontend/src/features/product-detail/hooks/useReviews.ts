// app/src/features/product-detail/hooks/useReviews.ts
"use client";

import { useCallback, useEffect, useState } from "react";

const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8009"
).replace(/\/$/, "");

// ── Types ─────────────────────────────────────────────────────────────────────

export type Review = {
  id: number;
  author: string;
  /** Initials used by ReviewCard to render the avatar circle */
  avatar: string;
  rating: number;
  comment: string;
  date: string;
};

export type ReviewStats = {
  avg: number;
  total: number;
  distribution: Record<"1" | "2" | "3" | "4" | "5", number>;
};

type ApiReviewsResponse = {
  ok: boolean;
  product_id: number;
  total_reviews: number;
  stats: ReviewStats;
  reviews: {
    review_id: number;
    author: string;
    rating: number;
    comment: string;
    date: string;
  }[];
};

type SubmitPayload = { comment: string; rating: number };
type SubmitResult = { ok: boolean; error?: Record<string, string> | string };

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useReviews(productId: number | null) {
  const [reviews, setReviews]     = useState<Review[]>([]);
  const [stats, setStats]         = useState<ReviewStats | null>(null);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState<string | null>(null);
  const [showAll, setShowAll]     = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // ── fetch ──────────────────────────────────────────────────────────────────
  const fetchReviews = useCallback(async () => {
    if (!productId) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `${API_BASE_URL}/api/products/${productId}/reviews?limit=100`,
        { method: "GET", cache: "no-store" }
      );

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const body = (await res.json()) as ApiReviewsResponse;

      if (!body.ok) throw new Error("API returned ok=false");

      const mapped: Review[] = body.reviews.map((r) => ({
        id:      r.review_id,
        author:  r.author,
        avatar:  toInitials(r.author),
        rating:  r.rating,
        comment: stripHtml(r.comment),
        date:    r.date,
      }));

      setReviews(mapped);
      setStats(body.stats);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error cargando reseñas");
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  // ── submit ─────────────────────────────────────────────────────────────────
  const submitReview = useCallback(
    async (payload: SubmitPayload): Promise<SubmitResult> => {
      if (!productId) return { ok: false, error: "ID de producto inválido" };

      setSubmitting(true);
      setSubmitError(null);

      try {
        const form = new FormData();
        form.append("comment", payload.comment);
        form.append("rating",  String(payload.rating));

        const res = await fetch(
          `${API_BASE_URL}/api/products/${productId}/reviews`,
          { method: "POST", body: form }
        );

        const body = await res.json();

        if (!body.ok) {
          const msg =
            typeof body.error === "object"
              ? Object.values(body.error).join(" ")
              : body.error || "Error al enviar reseña";
          setSubmitError(msg);
          return { ok: false, error: body.error };
        }

        // Optimistically prepend the new review
        if (body.review) {
          const newReview: Review = {
            id:      body.review.review_id,
            author:  body.review.author,
            avatar:  toInitials(body.review.author),
            rating:  body.review.rating,
            comment: body.review.comment,
            date:    body.review.date,
          };
          setReviews((prev) => [newReview, ...prev]);
          if (body.stats) setStats(body.stats);
        }

        return { ok: true };
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Error de conexión";
        setSubmitError(msg);
        return { ok: false, error: msg };
      } finally {
        setSubmitting(false);
      }
    },
    [productId]
  );

  // ── derived ────────────────────────────────────────────────────────────────
  const visibleReviews = showAll ? reviews : reviews.slice(0, 2);

  return {
    reviews,
    stats,
    loading,
    error,
    showAll,
    setShowAll,
    visibleReviews,
    submitting,
    submitError,
    submitReview,
    refresh: fetchReviews,
  };
}

// ── utils ─────────────────────────────────────────────────────────────────────

/** Strip basic HTML tags that Odoo may include in mail.message body */
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

/**
 * Derives 2-char initials from a name for the ReviewCard avatar.
 * Always returns at least "??" so charCodeAt never receives undefined.
 */
function toInitials(name: string): string {
  const clean = (name || "").trim();
  if (!clean) return "??";
  const parts = clean.split(/\s+/);
  if (parts.length === 1) {
    // Single word: first two chars, uppercased
    return (clean[0] + (clean[1] ?? clean[0])).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}