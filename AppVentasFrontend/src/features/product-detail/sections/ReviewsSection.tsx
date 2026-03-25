// app/src/features/product-detail/sections/ReviewsSection.tsx
"use client";

import { useRouter } from "next/navigation";
import { T } from "../theme/tokens";
import Divider from "../ui/Divider";
import RatingBar from "../ui/RatingBar";
import OutlineBtn from "../ui/OutlineBtn";
import Stars from "../ui/Stars";
import ReviewCard from "../components/ReviewCard";
import WriteReview from "../components/WriteReview";
import { useReviews } from "../hooks/useReviews";

type Props = {
  productId: number;
  isLoggedIn: boolean;
};

export default function ReviewsSection({ productId, isLoggedIn }: Props) {
  const router = useRouter();
  const {
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
  } = useReviews(productId);

  // ── derived display values ─────────────────────────────────────────────────
  const avg          = stats?.avg   ?? 0;
  const totalReviews = stats?.total ?? 0;
  const dist         = stats?.distribution ?? { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 };

  return (
    <div>
      <h3
        style={{
          fontSize: 18,
          fontWeight: 700,
          color: T.text,
          fontFamily: "'Sora',sans-serif",
          marginBottom: 24,
          letterSpacing: "-0.3px",
        }}
      >
        Calificaciones y reseñas
      </h3>

      {/* ── Summary ─────────────────────────────────────────────────────── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          gap: 32,
          marginBottom: 32,
          alignItems: "center",
        }}
      >
        {/* Big average number */}
        <div style={{ textAlign: "center" }}>
          <p
            style={{
              fontSize: 52,
              fontWeight: 800,
              color: T.text,
              fontFamily: "'Sora',sans-serif",
              lineHeight: 1,
              letterSpacing: "-2px",
              marginBottom: 6,
            }}
          >
            {loading ? "—" : avg.toFixed(1)}
          </p>
          <Stars r={avg} size={16} />
          <p
            style={{
              fontSize: 12,
              color: T.sub,
              marginTop: 5,
              fontFamily: "'Sora',sans-serif",
            }}
          >
            {loading ? "…" : `${totalReviews.toLocaleString()} reseñas`}
          </p>
        </div>

        {/* Distribution bars */}
        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          {([5, 4, 3, 2, 1] as const).map((s) => (
            <RatingBar
              key={s}
              stars={s}
              count={dist[String(s) as keyof typeof dist] ?? 0}
              total={totalReviews || 1}
            />
          ))}
        </div>
      </div>

      {/* ── Review list ─────────────────────────────────────────────────── */}
      {loading && (
        <p style={{ fontSize: 13, color: T.sub, fontFamily: "'Sora',sans-serif", marginBottom: 16 }}>
          Cargando reseñas…
        </p>
      )}

      {!loading && error && (
        <p style={{ fontSize: 13, color: "#B91C1C", fontFamily: "'Sora',sans-serif", marginBottom: 16 }}>
          No se pudieron cargar las reseñas.
        </p>
      )}

      {!loading && !error && reviews.length === 0 && (
        <p style={{ fontSize: 13, color: T.sub, fontFamily: "'Sora',sans-serif", marginBottom: 16 }}>
          Aún no hay reseñas. ¡Sé el primero en opinar!
        </p>
      )}

      {visibleReviews.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 20 }}>
          {visibleReviews.map((r) => (
            <ReviewCard key={r.id} r={r} />
          ))}
        </div>
      )}

      {!showAll && reviews.length > 2 && (
        <OutlineBtn onClick={() => setShowAll(true)}>
          Ver todas las reseñas ({reviews.length})
        </OutlineBtn>
      )}

      <Divider />

      {/* ── Write review ────────────────────────────────────────────────── */}
      <h4
        style={{
          fontSize: 16,
          fontWeight: 700,
          color: T.text,
          fontFamily: "'Sora',sans-serif",
          marginBottom: 16,
          letterSpacing: "-0.2px",
        }}
      >
        Deja tu opinión
      </h4>

      {!isLoggedIn ? (
        <div
          style={{
            padding: "20px",
            borderRadius: 12,
            background: T.surface,
            border: `1px dashed ${T.border}`,
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <p style={{ fontSize: 13, color: T.text, fontWeight: 600 }}>
            Inicia sesión para dejar una reseña.
          </p>
          <button
            onClick={() => router.push("/navigation/auth/login")}
            style={{
              alignSelf: "flex-start",
              border: "none",
              background: T.accent,
              color: "#fff",
              borderRadius: 8,
              padding: "8px 14px",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Iniciar sesión
          </button>
        </div>
      ) : (
        <WriteReview
          submitting={submitting}
          submitError={submitError}
          onSubmit={submitReview}
        />
      )}
    </div>
  );
}
