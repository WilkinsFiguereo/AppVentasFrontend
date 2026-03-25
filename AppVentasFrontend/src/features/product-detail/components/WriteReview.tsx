// app/src/features/product-detail/components/WriteReview.tsx
"use client";

import { T } from "../theme/tokens";
import Stars from "../ui/Stars";
import PrimaryBtn from "../ui/PrimaryBtn";
import { useWriteReview } from "../hooks/useWriteReview";

type Props = {
  submitting?: boolean;
  submitError?: string | null;
  onSubmit: (payload: { comment: string; rating: number }) => Promise<{ ok: boolean }>;
};

export default function WriteReview({ submitting = false, submitError, onSubmit }: Props) {
  const {
    rating, setRating,
    title,  setTitle,
    body,   setBody,
    submitted,
    canSubmit,
    submit,
  } = useWriteReview();

  if (submitted) {
    return (
      <div
        style={{
          padding: "32px",
          textAlign: "center",
          background: T.successBg,
          borderRadius: 12,
          border: `1px solid ${T.success}30`,
        }}
      >
        <div style={{ fontSize: 32, marginBottom: 12 }}>✓</div>
        <p style={{ fontSize: 15, fontWeight: 700, color: T.success, fontFamily: "'Sora',sans-serif", marginBottom: 4 }}>
          ¡Reseña publicada!
        </p>
        <p style={{ fontSize: 13, color: T.sub, fontFamily: "'Sora',sans-serif" }}>
          Gracias por compartir tu experiencia.
        </p>
      </div>
    );
  }

  const handleSubmit = () => {
    // Delegate to useWriteReview's submit, bridging into the API call
    submit(async (data) => {
      // Combine title + body into a single comment string for the Odoo API
      const comment = [data.title?.trim(), data.body?.trim()].filter(Boolean).join("\n\n");
      await onSubmit({ comment, rating: data.rating });
    });
  };

  return (
    <div
      style={{
        padding: "28px",
        background: T.surface,
        border: `1px solid ${T.border}`,
        borderRadius: 12,
      }}
    >
      <h4
        style={{
          fontSize: 15,
          fontWeight: 700,
          color: T.text,
          fontFamily: "'Sora',sans-serif",
          marginBottom: 20,
        }}
      >
        Escribe tu reseña
      </h4>

      {/* Rating */}
      <div style={{ marginBottom: 20 }}>
        <label
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: T.sub,
            display: "block",
            marginBottom: 8,
            fontFamily: "'Sora',sans-serif",
            letterSpacing: "0.4px",
          }}
        >
          TU PUNTUACIÓN
        </label>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Stars r={rating} size={28} interactive onChange={setRating} />
          {rating > 0 && (
            <span style={{ fontSize: 13, color: T.sub, fontFamily: "'Sora',sans-serif" }}>
              {["", "Muy malo", "Malo", "Regular", "Bueno", "Excelente"][rating]}
            </span>
          )}
        </div>
      </div>

      {/* Title */}
      <div style={{ marginBottom: 16 }}>
        <label
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: T.sub,
            display: "block",
            marginBottom: 8,
            fontFamily: "'Sora',sans-serif",
            letterSpacing: "0.4px",
          }}
        >
          TÍTULO
        </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Resumen de tu experiencia…"
          style={{
            width: "100%",
            padding: "10px 14px",
            border: `1px solid ${T.border}`,
            borderRadius: 9,
            fontSize: 13,
            color: T.text,
            background: T.bg,
            fontFamily: "'Sora',sans-serif",
            outline: "none",
            transition: "border-color .15s",
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = T.accentMid)}
          onBlur={(e)  => (e.currentTarget.style.borderColor = T.border)}
        />
      </div>

      {/* Body */}
      <div style={{ marginBottom: submitError ? 12 : 24 }}>
        <label
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: T.sub,
            display: "block",
            marginBottom: 8,
            fontFamily: "'Sora',sans-serif",
            letterSpacing: "0.4px",
          }}
        >
          RESEÑA
        </label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Cuéntanos tu experiencia con el producto…"
          rows={4}
          style={{
            width: "100%",
            padding: "10px 14px",
            border: `1px solid ${T.border}`,
            borderRadius: 9,
            fontSize: 13,
            color: T.text,
            background: T.bg,
            fontFamily: "'Sora',sans-serif",
            outline: "none",
            resize: "vertical",
            lineHeight: 1.65,
            transition: "border-color .15s",
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = T.accentMid)}
          onBlur={(e)  => (e.currentTarget.style.borderColor = T.border)}
        />
      </div>

      {/* API error */}
      {submitError && (
        <p
          style={{
            fontSize: 12,
            color: "#B91C1C",
            fontFamily: "'Sora',sans-serif",
            marginBottom: 16,
          }}
        >
          {submitError}
        </p>
      )}

      <PrimaryBtn disabled={!canSubmit || submitting} onClick={handleSubmit} fullWidth>
        {submitting ? "Publicando…" : "Publicar reseña"}
      </PrimaryBtn>
    </div>
  );
}