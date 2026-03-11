// app/src/features/product-detail/sections/ReviewsSection.tsx
"use client";

import { T } from "../theme/tokens";
import Divider from "../ui/Divider";
import RatingBar from "../ui/RatingBar";
import OutlineBtn from "../ui/OutlineBtn";
import Stars from "../ui/Stars";
import ReviewCard from "../components/ReviewCard";
import WriteReview from "../components/WriteReview";
import type { ProductDetail, Review } from "../types/product-detail.types";
import { useReviews } from "../hooks/useReviews";

export default function ReviewsSection({ p, reviews }: { p: ProductDetail; reviews: Review[] }) {
  const totalReviews = Object.values(p.ratingBreakdown).reduce((a, b) => a + b, 0);
  const { showAll, setShowAll, visibleReviews } = useReviews(reviews);

  return (
    <div>
      <h3 style={{ fontSize: 18, fontWeight: 700, color: T.text, fontFamily: "'Sora',sans-serif", marginBottom: 24, letterSpacing: "-0.3px" }}>
        Calificaciones y reseñas
      </h3>

      <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 32, marginBottom: 32, alignItems: "center" }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: 52, fontWeight: 800, color: T.text, fontFamily: "'Sora',sans-serif", lineHeight: 1, letterSpacing: "-2px", marginBottom: 6 }}>
            {p.rating}
          </p>
          <Stars r={p.rating} size={16} />
          <p style={{ fontSize: 12, color: T.sub, marginTop: 5, fontFamily: "'Sora',sans-serif" }}>{totalReviews.toLocaleString()} reseñas</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          {[5, 4, 3, 2, 1].map((s) => (
            <RatingBar key={s} stars={s} count={p.ratingBreakdown[s as 1 | 2 | 3 | 4 | 5]} total={totalReviews} />
          ))}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 20 }}>
        {visibleReviews.map((r) => (
          <ReviewCard key={r.id} r={r} />
        ))}
      </div>

      {!showAll && reviews.length > 2 && (
        <OutlineBtn onClick={() => setShowAll(true)}>
          Ver todas las reseñas ({reviews.length})
        </OutlineBtn>
      )}

      <Divider />

      <h4 style={{ fontSize: 16, fontWeight: 700, color: T.text, fontFamily: "'Sora',sans-serif", marginBottom: 16, letterSpacing: "-0.2px" }}>
        Deja tu opinión
      </h4>
      <WriteReview />
    </div>
  );
}
