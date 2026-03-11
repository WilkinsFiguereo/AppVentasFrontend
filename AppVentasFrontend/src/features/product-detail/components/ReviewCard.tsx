// app/src/features/product-detail/components/ReviewCard.tsx
"use client";

import { T } from "../theme/tokens";
import Stars from "../ui/Stars";
import { useHelpfulVote } from "../hooks/useHelpfulVote";
import type { Review } from "../types/product-detail.types";

export default function ReviewCard({ r }: { r: Review }) {
  const { helpful, voted, vote } = useHelpfulVote(r.helpful);

  const initials = r.avatar;
  const hue = (initials.charCodeAt(0) * 17 + initials.charCodeAt(1) * 31) % 360;

  return (
    <div style={{ padding: "24px", background: T.surface, border: `1px solid ${T.border}`, borderRadius: 12 }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: `hsl(${hue},55%,55%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 13,
              fontWeight: 700,
              color: "#fff",
              fontFamily: "'Sora',sans-serif",
              flexShrink: 0,
            }}
          >
            {initials}
          </div>

          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: T.text, fontFamily: "'Sora',sans-serif" }}>{r.author}</span>
              {r.verified && (
                <span style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 10, color: T.success, fontFamily: "'Sora',sans-serif", fontWeight: 600 }}>
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                    <circle cx="5.5" cy="5.5" r="5" fill={T.success} />
                    <path d="M3 5.5l2 2 3-3" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Verificado
                </span>
              )}
            </div>
            <p style={{ fontSize: 11, color: T.sub, fontFamily: "'Sora',sans-serif", marginTop: 1 }}>{r.role}</p>
          </div>
        </div>

        <span style={{ fontSize: 11, color: T.sub, fontFamily: "'Sora',sans-serif", flexShrink: 0 }}>{r.date}</span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
        <Stars r={r.rating} size={12} />
        <span style={{ fontSize: 14, fontWeight: 700, color: T.text, fontFamily: "'Sora',sans-serif" }}>{r.title}</span>
      </div>

      <p style={{ fontSize: 13, color: T.sub, lineHeight: 1.72, fontFamily: "'Sora',sans-serif", marginBottom: 16 }}>{r.body}</p>

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 12, color: T.sub, fontFamily: "'Sora',sans-serif" }}>¿Fue útil?</span>
        <button
          onClick={vote}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            padding: "5px 12px",
            borderRadius: 7,
            border: `1px solid ${voted ? T.success : T.border}`,
            background: voted ? T.successBg : "transparent",
            color: voted ? T.success : T.sub,
            fontSize: 12,
            fontWeight: 600,
            cursor: voted ? "default" : "pointer",
            fontFamily: "'Sora',sans-serif",
            transition: "all .2s",
          }}
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path
              d="M2 7h2V12H2zM4 7l3-5 .5.1c.5.2.7.7.5 1.1L7 5h3.5c.5 0 .9.4.9.9l-.7 4.5c-.1.4-.4.6-.8.6H4z"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
          </svg>
          {helpful}
        </button>
      </div>
    </div>
  );
}
